import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'

const PROJECTS_DIR = join(process.cwd(), '.github/projects')
const REPO = process.env.GITHUB_REPOSITORY
const PROJECT_NUMBER = process.env.PROJECT_NUMBER
const PROJECT_OWNER = process.env.PROJECT_OWNER
const DRY_RUN = ['true', '1'].includes(process.env.DRY_RUN?.toLowerCase())
const ONLY_FILE = process.env.PROJECT_FILE?.trim()

const LABEL_COLORS = {
  feature: '1D76DB',
  backend: '5319E7',
  frontend: 'FBCA04',
  banco: '0E8A16',
  epic: '5319E7',
}

function gh(args) {
  if (DRY_RUN) {
    console.log(`[dry-run] gh ${args.join(' ')}`)
    return ''
  }

  try {
    return execFileSync('gh', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()
  } catch (error) {
    error.stderrText = error.stderr?.toString() ?? error.message
    throw error
  }
}

function ghJsonFields(args, fields) {
  if (DRY_RUN) {
    console.log(`[dry-run] gh ${[...args, '--json', fields].join(' ')}`)
    return []
  }

  const output = execFileSync('gh', [...args, '--json', fields], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim()

  return JSON.parse(output || '[]')
}

function sourceId(sourceFile) {
  return sourceFile.replace(/\.(ya?ml)$/, '')
}

function fileSyncLabel(sourceId) {
  return `sync:${sourceId}`
}

function epicSyncLabel(sourceId) {
  return `sync:${sourceId}:epic`
}

function taskSyncLabel(sourceId, key) {
  return `sync:${sourceId}:task:${key.toLowerCase()}`
}

function marker(sourceFile, kind, key = '') {
  const keyPart = key ? ` key=${key}` : ''
  return `<!-- baby-log-project-sync source=${sourceFile} kind=${kind}${keyPart} -->`
}

function taskKey(title) {
  const match = title.match(/^(TASK-\d+)/)
  return match?.[1] ?? title
}

function issueHasLabel(issue, label) {
  return issue.labels?.some((entry) => entry.name === label) ?? false
}

function ensureLabels(labels) {
  const uniqueLabels = [...new Set(labels.filter(Boolean))]
  if (uniqueLabels.length === 0) return

  const existing = new Set(
    ghJsonFields(['label', 'list'], 'name').map((label) => label.name),
  )

  for (const label of uniqueLabels) {
    if (existing.has(label)) continue

    const color = label.startsWith('sync:')
      ? 'BFD4F2'
      : LABEL_COLORS[label] ?? 'BFD4F2'

    gh([
      'label',
      'create',
      label,
      '--color',
      color,
      '--description',
      'Criada automaticamente pelo sync de projetos',
    ])
    existing.add(label)
  }
}

function collectSyncLabels(sourceId, content) {
  const labels = new Set([
    fileSyncLabel(sourceId),
    epicSyncLabel(sourceId),
  ])

  for (const task of content.tasks) {
    labels.add(taskSyncLabel(sourceId, taskKey(task.title)))
  }

  return [...labels]
}

function loadIssuesForSource(sourceId) {
  return ghJsonFields(
    [
      'issue',
      'list',
      '--state',
      'all',
      '--label',
      fileSyncLabel(sourceId),
      '--limit',
      '200',
    ],
    'number,title,url,body,labels',
  )
}

function findIssueByMarker(issues, sourceFile, kind, key = '') {
  const searchKey = `baby-log-project-sync source=${sourceFile} kind=${kind}`
  const needle = key ? `${searchKey} key=${key}` : searchKey

  return issues.find((issue) => issue.body?.includes(needle)) ?? null
}

function findIssueBySyncLabel(issues, label) {
  return issues.find((issue) => issueHasLabel(issue, label)) ?? null
}

function titlesMatchTaskKey(title, key) {
  return title === key || title.startsWith(`${key} `) || title.startsWith(`${key} -`)
}

function findExistingIssue(issues, sourceId, sourceFile, kind, key, title) {
  const byMarker = findIssueByMarker(issues, sourceFile, kind, key)
  if (byMarker) {
    return { issue: byMarker, reason: 'marker' }
  }

  if (kind === 'epic') {
    const byEpicLabel = findIssueBySyncLabel(issues, epicSyncLabel(sourceId))
    if (byEpicLabel) {
      return { issue: byEpicLabel, reason: 'label-epic' }
    }

    const byTitleInFile = issues.find(
      (issue) => issueHasLabel(issue, fileSyncLabel(sourceId)) && issue.title === title,
    )
    if (byTitleInFile) {
      return { issue: byTitleInFile, reason: 'title-no-marker' }
    }

    const globalMatches = ghJsonFields(
      [
        'issue',
        'list',
        '--search',
        `repo:${REPO} "${title.replaceAll('"', '')}" in:title`,
        '--state',
        'all',
        '--limit',
        '20',
      ],
      'number,title,url,body,labels',
    )
    const exactTitle = globalMatches.find((issue) => issue.title === title)
    if (exactTitle) {
      return { issue: exactTitle, reason: 'title-global' }
    }

    return null
  }

  const byTaskLabel = findIssueBySyncLabel(issues, taskSyncLabel(sourceId, key))
  if (byTaskLabel) {
    return { issue: byTaskLabel, reason: 'label-task' }
  }

  const byTaskKey = issues.find(
    (issue) =>
      issueHasLabel(issue, fileSyncLabel(sourceId)) &&
      titlesMatchTaskKey(issue.title, key),
  )
  if (byTaskKey) {
    return { issue: byTaskKey, reason: 'task-key' }
  }

  const byExactTitle = issues.find(
    (issue) =>
      issueHasLabel(issue, fileSyncLabel(sourceId)) && issue.title === title,
  )
  if (byExactTitle) {
    return { issue: byExactTitle, reason: 'title-task' }
  }

  return null
}

function ensureIssueHasLabels(issueNumber, labels) {
  if (labels.length === 0) return

  gh(['issue', 'edit', String(issueNumber), '--add-label', labels.join(',')])
}

function issueFromCreateOutput(output, title) {
  const url = output
    .split('\n')
    .map((line) => line.trim())
    .find((line) => /\/issues\/\d+$/.test(line))

  if (!url) {
    throw new Error(`Nao foi possivel obter URL da issue criada: ${output}`)
  }

  const number = Number(url.match(/\/issues\/(\d+)$/)?.[1])
  if (!number) {
    throw new Error(`Nao foi possivel obter numero da issue: ${url}`)
  }

  return { number, url, title }
}

function createIssue({ title, labels, body, parentNumber }) {
  const args = ['issue', 'create', '--title', title, '--body', body]

  for (const label of labels) {
    args.push('--label', label)
  }

  if (parentNumber) {
    args.push('--parent', String(parentNumber))
  }

  if (DRY_RUN) {
    gh(args)
    return {
      number: parentNumber ? 1000 : 999,
      url: `https://github.com/${REPO}/issues/${parentNumber ? 1000 : 999}`,
      title,
    }
  }

  return issueFromCreateOutput(gh(args), title)
}

function getOrCreateIssue({
  issues,
  sourceId,
  sourceFile,
  kind,
  key,
  title,
  labels,
  parentNumber,
}) {
  const syncLabels = labelsForIssue(sourceId, kind, key)
  const allLabels = [...new Set([...labels, ...syncLabels])]
  const found = findExistingIssue(issues, sourceId, sourceFile, kind, key, title)

  if (found) {
    const { issue, reason } = found
    const missingLabels = syncLabels.filter((label) => !issueHasLabel(issue, label))

    if (missingLabels.length > 0) {
      ensureIssueHasLabels(issue.number, missingLabels)
      for (const label of missingLabels) {
        issue.labels = [...(issue.labels ?? []), { name: label }]
      }
    }

    console.log(`Reutilizando #${issue.number} (${reason}): ${issue.title}`)
    return issue
  }

  const body = [
    marker(sourceFile, kind, key),
    '',
    '_Issue criada automaticamente a partir de_',
    `\`.github/projects/${sourceFile}\`.`,
  ].join('\n')

  const issue = createIssue({
    title,
    labels: allLabels,
    body,
    parentNumber,
  })

  const enrichedIssue = {
    ...issue,
    body,
    labels: allLabels.map((name) => ({ name })),
  }
  issues.push(enrichedIssue)
  console.log(`Issue criada #${issue.number}: ${issue.title}`)
  return enrichedIssue
}

function labelsForIssue(sourceId, kind, key) {
  const syncLabels = [fileSyncLabel(sourceId)]

  if (kind === 'epic') {
    syncLabels.push(epicSyncLabel(sourceId))
  } else {
    syncLabels.push(taskSyncLabel(sourceId, key))
  }

  return syncLabels
}

function addIssueToProject(issueUrl) {
  try {
    gh([
      'project',
      'item-add',
      PROJECT_NUMBER,
      '--owner',
      PROJECT_OWNER,
      '--url',
      issueUrl,
    ])
    console.log(`Adicionada ao projeto #${PROJECT_NUMBER}: ${issueUrl}`)
  } catch (error) {
    const message = error.stderrText ?? error.message
    if (/already exists|already in/i.test(message)) {
      console.log(`Ja estava no projeto: ${issueUrl}`)
      return
    }

    throw error
  }
}

function loadProjectFiles() {
  const files = readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith('.yml') || file.endsWith('.yaml'))
    .sort()

  if (ONLY_FILE) {
    return files.filter((file) => file === ONLY_FILE)
  }

  return files
}

function syncEpicFile(sourceFile) {
  const filePath = join(PROJECTS_DIR, sourceFile)
  const content = parse(readFileSync(filePath, 'utf8'))

  if (!content?.epic?.title || !Array.isArray(content.tasks)) {
    throw new Error(`Arquivo invalido: ${sourceFile}. Esperado epic.title e tasks[].`)
  }

  const id = sourceId(sourceFile)
  console.log(`\nSincronizando ${sourceFile}`)

  const userLabels = [
    ...(content.epic.labels ?? []),
    ...content.tasks.flatMap((task) => task.labels ?? []),
  ]
  ensureLabels([...userLabels, ...collectSyncLabels(id, content)])

  const issues = loadIssuesForSource(id)

  const epic = getOrCreateIssue({
    issues,
    sourceId: id,
    sourceFile,
    kind: 'epic',
    key: '',
    title: content.epic.title,
    labels: content.epic.labels ?? [],
  })

  addIssueToProject(epic.url)

  for (const task of content.tasks) {
    const key = taskKey(task.title)
    const issue = getOrCreateIssue({
      issues,
      sourceId: id,
      sourceFile,
      kind: 'task',
      key,
      title: task.title,
      labels: task.labels ?? [],
      parentNumber: epic.number,
    })

    addIssueToProject(issue.url)
  }
}

function main() {
  if (!REPO) throw new Error('GITHUB_REPOSITORY nao definido')
  if (!PROJECT_NUMBER) throw new Error('PROJECT_NUMBER nao definido')
  if (!PROJECT_OWNER) throw new Error('PROJECT_OWNER nao definido')

  const files = loadProjectFiles()
  if (files.length === 0) {
    console.log('Nenhum arquivo de projeto encontrado em .github/projects')
    return
  }

  console.log(`Repositorio: ${REPO}`)
  console.log(`Projeto: ${PROJECT_OWNER}/projects/${PROJECT_NUMBER}`)
  console.log(`Arquivos: ${files.join(', ')}`)

  for (const file of files) {
    syncEpicFile(file)
  }
}

main()
