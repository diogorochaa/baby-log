import type {
  Auditable,
  BabyScoped,
  Identifiable,
  OccurredAt,
} from '../../../shared/domain/auditable.js'

export const DiaperType = {
  PEE: 'PEE',
  POOP: 'POOP',
  BOTH: 'BOTH',
} as const

export type DiaperType = (typeof DiaperType)[keyof typeof DiaperType]

export interface DiaperRecord
  extends Identifiable, Auditable, BabyScoped, OccurredAt {
  type: DiaperType
  notes?: string | null
}
