import type {
  Auditable,
  BabyScoped,
  Identifiable,
  OccurredAt,
} from '../../../shared/domain/auditable.js'

export interface WeightRecord
  extends Identifiable, Auditable, BabyScoped, OccurredAt {
  weight: string
  unit: string
  notes?: string | null
}
