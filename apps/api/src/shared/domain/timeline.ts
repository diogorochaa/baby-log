/** Categorias usadas na timeline e nos filtros (RF-018). */
export const TimelineCategory = {
  FEEDING: 'feeding',
  DIAPER: 'diaper',
  SLEEP: 'sleep',
  GROWTH: 'growth',
  DIARY: 'diary',
  MILESTONE: 'milestone',
} as const

export type TimelineCategory =
  (typeof TimelineCategory)[keyof typeof TimelineCategory]

export interface TimelineItem {
  id: string
  babyId: string
  category: TimelineCategory
  occurredAt: Date
  title: string
  description?: string | null
}
