# BabyLog — Requisitos do Sistema

## 1. Visão do projeto

O **BabyLog** é uma aplicação de diário e acompanhamento da rotina do bebê, permitindo aos responsáveis registrar acontecimentos do dia a dia e consultar o histórico em uma linha do tempo.

O sistema deverá centralizar informações como:

* Alimentação/amamentação;
* Fraldas;
* Sono;
* Peso e altura;
* Desenvolvimento e observações;
* Diário textual;
* Eventos importantes;
* Histórico completo organizado cronologicamente.

A aplicação deverá possuir interface **web e mobile**, priorizando simplicidade, rapidez de registro e facilidade de consulta.

---

# 2. Requisitos Funcionais

## RF-001 — Cadastro do bebê

O sistema deve permitir cadastrar um bebê.

### Dados iniciais

* Nome;
* Data de nascimento;
* Hora de nascimento;
* Sexo;
* Peso ao nascer;
* Altura ao nascer;
* Foto;
* Observações.

### Regras

* O nome é obrigatório.
* A data de nascimento é obrigatória.
* A aplicação deve permitir editar os dados posteriormente.
* Os dados cadastrais devem possuir histórico quando aplicável.

---

## RF-002 — Perfil do bebê

O sistema deve disponibilizar uma área com os principais dados do bebê.

Deve apresentar:

* Nome;
* Idade;
* Data de nascimento;
* Peso atual;
* Altura atual;
* Última alimentação;
* Última troca de fralda;
* Último registro de sono.

O perfil deve funcionar como um resumo da situação atual.

---

# RF-003 — Diário do bebê

O sistema deve permitir registrar entradas livres no diário.

Cada entrada deve possuir:

* Data;
* Horário;
* Título;
* Descrição;
* Categoria;
* Foto opcional;
* Data de criação.

Exemplos:

```text
"Primeiro sorriso"

"Hoje ela conseguiu dormir a noite inteira."

"Primeiro banho em casa."

"Visita da família."
```

---

# RF-004 — Linha do tempo

O sistema deve possuir uma linha do tempo cronológica contendo os eventos registrados.

A timeline deve permitir visualizar:

```text
28/01/2027
│
├── 08:30 — Amamentação
├── 09:15 — Fralda
├── 10:00 — Sono
├── 12:30 — Amamentação
└── 18:45 — Diário
```

Os eventos devem ser ordenados por data e horário.

---

# RF-005 — Registro de alimentação

O sistema deve permitir registrar episódios de alimentação.

O registro deve permitir informar:

* Data;
* Horário de início;
* Horário de término;
* Duração;
* Tipo de alimentação;
* Lado utilizado, quando aplicável;
* Quantidade, quando aplicável;
* Observações.

O sistema deve permitir registrar diferentes tipos de alimentação, incluindo:

* Amamentação;
* Mamadeira;
* Fórmula;
* Leite materno armazenado;
* Outros tipos configuráveis futuramente.

---

# RF-006 — Controle de amamentação

Quando o tipo de alimentação for amamentação, o sistema deve permitir registrar:

* Mama esquerda;
* Mama direita;
* Ambas;
* Duração;
* Horário.

O sistema deve apresentar estatísticas como:

* Quantidade de mamadas no dia;
* Quantidade por mama;
* Tempo total de amamentação;
* Última mama utilizada;
* Média de duração.

---

# RF-007 — Histórico de alimentação

O sistema deve apresentar o histórico de alimentação.

Deve permitir:

* Visualizar registros por dia;
* Filtrar por período;
* Filtrar por tipo;
* Visualizar quantidade de registros;
* Visualizar duração total;
* Consultar detalhes de cada registro.

---

# RF-008 — Registro de fraldas

O sistema deve permitir registrar trocas de fralda.

Cada registro deve possuir:

* Data;
* Horário;
* Tipo;
* Observação opcional.

Tipos iniciais:

* Xixi;
* Cocô;
* Xixi + cocô.

---

# RF-009 — Histórico de fraldas

O sistema deve apresentar o histórico de trocas.

Deve permitir visualizar:

* Total de trocas no dia;
* Total de xixi;
* Total de cocô;
* Total de xixi + cocô;
* Histórico por período;
* Horários das trocas.

Exemplo:

```text
Hoje

08:10  💧 Xixi
10:45  💩 Cocô
13:20  💧💩 Xixi + cocô
16:30  💧 Xixi

Total: 4 fraldas
```

---

# RF-010 — Registro de sono

O sistema deve permitir registrar períodos de sono.

Cada registro deve possuir:

* Data;
* Horário de início;
* Horário de término;
* Duração;
* Local;
* Observações.

O sistema deve calcular automaticamente a duração quando início e término forem informados.

---

# RF-011 — Histórico de sono

O sistema deve apresentar informações consolidadas sobre o sono.

Deve permitir visualizar:

* Tempo total dormido;
* Quantidade de períodos de sono;
* Média de duração;
* Maior período;
* Histórico diário;
* Histórico semanal.

---

# RF-012 — Registro de peso

O sistema deve permitir registrar medições de peso.

Cada medição deve possuir:

* Data;
* Horário opcional;
* Peso;
* Unidade;
* Observação.

O sistema deve manter todas as medições anteriores.

---

# RF-013 — Registro de altura

O sistema deve permitir registrar medições de altura.

Cada medição deve possuir:

* Data;
* Altura;
* Unidade;
* Observação.

O sistema deve manter o histórico de medições.

---

# RF-014 — Histórico de crescimento

O sistema deve apresentar o histórico de:

* Peso;
* Altura.

Deve permitir visualizar a evolução através de gráficos.

Exemplo:

```text
Peso

4.2 kg ───────●
              │
4.0 kg ──●────┘
          │
3.8 kg ───┘
```

O sistema deverá permitir selecionar diferentes períodos.

---

# RF-015 — Eventos personalizados

O sistema deve permitir criar eventos personalizados.

Exemplos:

* Primeiro sorriso;
* Primeiro banho;
* Primeiro passeio;
* Primeira consulta;
* Primeiro dente;
* Primeiro corte de cabelo;
* Primeiros passos.

O usuário deverá poder definir:

* Título;
* Data;
* Horário;
* Descrição;
* Foto;
* Categoria.

---

# RF-016 — Fotos

O sistema deve permitir associar fotos aos registros do diário e eventos importantes.

Deve ser possível:

* Adicionar foto;
* Visualizar foto;
* Remover foto;
* Associar foto a um registro.

O armazenamento definitivo das imagens poderá utilizar serviço externo de armazenamento posteriormente.

---

# RF-017 — Busca

O sistema deve permitir pesquisar registros do diário.

A busca deverá considerar, inicialmente:

* Título;
* Descrição;
* Categoria.

---

# RF-018 — Filtros da timeline

A timeline deve permitir filtrar eventos por categoria.

Filtros iniciais:

```text
Todos
Alimentação
Fraldas
Sono
Crescimento
Diário
Eventos
```

Também deve permitir filtrar por período.

---

# RF-019 — Resumo diário

O sistema deve disponibilizar um resumo das atividades do dia.

Exemplo:

```text
Hoje

🍼 8 mamadas
🧷 6 fraldas
😴 5h42 de sono
⚖️ 4,8 kg
📖 2 registros no diário
```

---

# RF-020 — Resumo histórico

O sistema deve permitir consultar informações consolidadas por período.

Períodos iniciais:

* Hoje;
* Ontem;
* Últimos 7 dias;
* Últimos 30 dias;
* Personalizado.

---

# RF-021 — Edição de registros

O usuário deve poder editar registros existentes.

O sistema deve atualizar:

* Data;
* Horário;
* Dados específicos do registro;
* Observações;
* Fotos.

---

# RF-022 — Exclusão de registros

O usuário deve poder excluir registros.

A aplicação deverá solicitar confirmação antes da exclusão.

Quando necessário, o sistema deverá apresentar uma mensagem informando que a operação não poderá ser desfeita.

---

# RF-023 — Identificação da origem do registro

Cada registro deverá armazenar:

* Data de criação;
* Data da última alteração.

Isso permitirá futuramente auditoria e sincronização entre dispositivos.

---

# RF-024 — Conta do responsável

O sistema deverá permitir autenticação do responsável pelo bebê.

Funcionalidades previstas:

* Cadastro;
* Login;
* Logout;
* Recuperação de acesso;
* Alteração de senha.

A implementação detalhada da autenticação será definida em uma task específica.

---

# RF-025 — Múltiplos responsáveis

O sistema deverá ser preparado para permitir que mais de um responsável tenha acesso aos dados do bebê.

Exemplo:

```text
Bebê
 │
 ├── Responsável 1
 └── Responsável 2
```

Os usuários autorizados deverão visualizar e registrar informações do mesmo bebê.

---

# RF-026 — Dashboard

A aplicação deverá possuir uma tela inicial com visão geral.

Deverá apresentar:

* Informações do bebê;
* Resumo do dia;
* Últimos eventos;
* Próximas informações relevantes;
* Acesso rápido para registrar atividades.

O registro de uma atividade comum deverá exigir o mínimo possível de interações.

---

# RF-027 — Registro rápido

A aplicação deverá disponibilizar ações rápidas para os eventos mais frequentes.

Exemplo:

```text
+ Registrar

🍼 Mamou
🧷 Fralda
😴 Sono
⚖️ Peso
📏 Altura
📖 Diário
```

A funcionalidade deverá ser especialmente otimizada para utilização pelo celular.

---

# RF-028 — Datas e horários

Todos os registros deverão armazenar data e horário.

A aplicação deverá considerar o fuso horário configurado para o usuário.

O sistema deverá evitar inconsistências de data causadas por conversões incorretas entre frontend, backend e banco de dados.

---

# RF-029 — Histórico completo

O sistema deverá permitir consultar todos os registros associados ao bebê em ordem cronológica.

O histórico deverá funcionar como um verdadeiro diário digital, permitindo reconstruir a rotina e os principais acontecimentos desde o nascimento.

---

# RF-030 — Exportação de dados

Como funcionalidade futura, o sistema deverá permitir exportar os dados do bebê.

Possíveis formatos:

* PDF;
* CSV;
* JSON.

A exportação deverá preservar as datas e informações dos registros.

---

# 3. Requisitos Não Funcionais

## RNF-001 — Responsividade

A aplicação deverá funcionar adequadamente em:

* Desktop;
* Tablet;
* Smartphone.

A experiência mobile deverá ser tratada como prioridade devido à natureza de uso da aplicação.

---

# RNF-002 — Usabilidade

O sistema deverá priorizar:

* Poucos cliques;
* Informações claras;
* Ações rápidas;
* Interface simples;
* Boa legibilidade;
* Feedback visual das operações.

O registro de eventos frequentes deve ser rápido o suficiente para ser realizado enquanto o responsável está cuidando do bebê.

---

# RNF-003 — Performance

A aplicação deverá apresentar boa performance mesmo com milhares de registros históricos.

Listagens extensas deverão utilizar mecanismos como:

* Paginação;
* Cursor pagination;
* Virtualização quando necessário;
* Queries otimizadas.

---

# RNF-004 — Disponibilidade

A API deverá ser preparada para execução contínua em ambiente de produção.

O sistema deverá possuir mecanismos de:

* Health check;
* Logging;
* Tratamento de erros;
* Monitoramento futuro.

---

# RNF-005 — Segurança

A aplicação deverá:

* Utilizar HTTPS em produção;
* Armazenar senhas de forma segura;
* Nunca armazenar senhas em texto puro;
* Validar entradas no backend;
* Implementar autenticação e autorização;
* Proteger endpoints privados;
* Evitar exposição de informações sensíveis nos logs;
* Utilizar variáveis de ambiente para credenciais.

---

# RNF-006 — Privacidade

Os dados registrados pelo usuário deverão ser tratados como dados privados.

O sistema deverá garantir que um usuário não consiga acessar dados de outro usuário sem autorização explícita.

O backend deverá validar a propriedade/acesso ao bebê em operações de leitura e escrita.

---

# RNF-007 — Integridade dos dados

O sistema deverá garantir consistência dos registros.

Exemplos:

* Não permitir peso negativo;
* Não permitir altura negativa;
* Não permitir duração negativa;
* Não permitir datas inválidas;
* Não permitir registros associados a bebês inexistentes;
* Validar relacionamentos no banco.

---

# RNF-008 — Banco de dados

O sistema deverá utilizar **PostgreSQL** como banco de dados principal.

O banco deverá possuir:

* Integridade referencial;
* Constraints;
* Índices adequados;
* Migrations;
* Backup posteriormente;
* Estratégia de recuperação posteriormente.

---

# RNF-009 — Arquitetura

O backend deverá utilizar arquitetura modular baseada em domínio.

Exemplo:

```text
modules/
├── auth/
├── babies/
├── feeding/
├── diapers/
├── sleep/
├── growth/
├── diary/
└── events/
```

Cada módulo deverá manter suas responsabilidades isoladas.

---

# RNF-010 — Manutenibilidade

O código deverá:

* Utilizar TypeScript;
* Seguir padrões consistentes;
* Possuir lint;
* Possuir formatação automatizada;
* Possuir testes automatizados;
* Evitar duplicação desnecessária;
* Manter responsabilidades bem definidas.

---

# RNF-011 — Testabilidade

A aplicação deverá possuir testes automatizados em diferentes níveis.

Inicialmente:

```text
Unit Tests
Integration Tests
```

Posteriormente:

```text
E2E Tests
```

As funcionalidades críticas deverão possuir cobertura de testes adequada.

---

# RNF-012 — Observabilidade

A API deverá possuir logging estruturado.

Posteriormente deverá ser possível integrar:

* Métricas;
* Tracing;
* Monitoramento;
* Alertas.

---

# RNF-013 — Compatibilidade

A aplicação web deverá suportar as versões modernas dos principais navegadores:

* Chrome;
* Edge;
* Firefox;
* Safari.

---

# RNF-014 — Escalabilidade

A API deverá ser stateless sempre que possível, permitindo futuramente executar múltiplas instâncias.

```text
             Load Balancer
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
     API 1      API 2      API 3
       │          │          │
       └──────────┼──────────┘
                  ▼
             PostgreSQL
```

---

# RNF-015 — Deploy

O projeto deverá ser preparado para execução através de containers Docker.

O ambiente deverá possuir separação entre:

```text
development
test
production
```

---

# RNF-016 — Configuração

Configurações específicas do ambiente não deverão estar hardcoded no código.

Deverão ser utilizadas variáveis de ambiente para:

* Banco;
* Portas;
* Secrets;
* URLs externas;
* Configurações de infraestrutura.

---

# RNF-017 — Versionamento

O código deverá ser versionado utilizando Git.

O projeto deverá possuir:

* Commits organizados;
* Branches conforme estratégia definida;
* Pull Requests;
* Code Review quando houver outros colaboradores;
* CI posteriormente.

---

# RNF-018 — CI/CD

Como evolução do projeto, deverá existir pipeline automatizado para:

```text
Push
 ↓
Lint
 ↓
Typecheck
 ↓
Tests
 ↓
Build
 ↓
Deploy
```

---

# RNF-019 — Backup

O ambiente de produção deverá possuir estratégia de backup do PostgreSQL.

A estratégia deverá considerar:

* Periodicidade;
* Retenção;
* Armazenamento externo;
* Restauração;
* Teste periódico de recuperação.

---

# RNF-020 — PWA / experiência mobile

Como evolução, a aplicação web poderá ser preparada como **Progressive Web App**, permitindo:

* Instalação no celular;
* Ícone na tela inicial;
* Experiência semelhante a aplicativo;
* Cache de recursos estáticos.

---

# 4. Requisitos de arquitetura

A solução deverá seguir inicialmente:

```text
                 BabyLog
                    │
          ┌─────────┴─────────┐
          │                   │
        Web                  API
      React/Vite          Node/Fastify
          │                   │
          │                   │
          └─────────┬─────────┘
                    │
                 Prisma
                    │
                    ▼
               PostgreSQL
```

Monorepo:

```text
babylog/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── shared/
│   └── config/
│
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

# 5. Prioridade sugerida

## MVP — Primeira versão

### P0 — Essencial

* Cadastro do bebê;
* Perfil do bebê;
* Diário;
* Timeline;
* Alimentação;
* Amamentação;
* Fraldas;
* Sono;
* Peso;
* Altura;
* Histórico;
* Registro rápido;
* Edição/exclusão;
* Responsável único;
* Autenticação básica.

### P1 — Importante

* Fotos;
* Gráficos de crescimento;
* Dashboard;
* Filtros;
* Busca;
* Resumo diário;
* Múltiplos responsáveis.

### P2 — Evolução

* Exportação PDF;
* Exportação CSV;
* PWA;
* Notificações;
* Lembretes;
* Compartilhamento;
* Métricas avançadas;
* Backup automatizado;
* Recursos offline.

---

# 6. Princípio central do produto

O BabyLog deve ser pensado menos como um "sistema de cadastro" e mais como um **diário digital do bebê**.

O fluxo principal deve ser:

```text
Aconteceu algo
      ↓
Registro rápido
      ↓
Evento armazenado
      ↓
Timeline
      ↓
Histórico
      ↓
Resumo / gráficos
```

A experiência deve permitir que, meses depois, os responsáveis consigam abrir o BabyLog e entender **como foram os primeiros meses do bebê**, tanto através dos dados objetivos quanto das memórias registradas no diário.
