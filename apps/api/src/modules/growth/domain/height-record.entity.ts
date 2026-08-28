import type {
  Auditable,
  BabyScoped,
  Identifiable,
  OccurredAt,
} from '../../../shared/domain/auditable.js'

export interface HeightRecord
  extends Identifiable, Auditable, BabyScoped, OccurredAt {
  height: string
  unit: string
  notes?: string | null
}
