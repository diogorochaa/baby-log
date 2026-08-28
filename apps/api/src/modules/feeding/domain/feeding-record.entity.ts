import type {
  Auditable,
  BabyScoped,
  Identifiable,
  OccurredAt,
} from '../../../shared/domain/auditable.js'

export const FeedingType = {
  BREASTFEEDING: 'BREASTFEEDING',
  BOTTLE: 'BOTTLE',
  FORMULA: 'FORMULA',
  STORED_BREAST_MILK: 'STORED_BREAST_MILK',
  OTHER: 'OTHER',
} as const

export type FeedingType = (typeof FeedingType)[keyof typeof FeedingType]

export const BreastSide = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  BOTH: 'BOTH',
} as const

export type BreastSide = (typeof BreastSide)[keyof typeof BreastSide]

export interface FeedingRecord
  extends Identifiable, Auditable, BabyScoped, OccurredAt {
  startedAt?: Date | null
  endedAt?: Date | null
  durationMinutes?: number | null
  type: FeedingType
  breastSide?: BreastSide | null
  quantity?: string | null
  quantityUnit?: string | null
  notes?: string | null
}
