import type {
  Auditable,
  BabyScoped,
  Identifiable,
  OccurredAt,
} from '../../../shared/domain/auditable.js'

export interface SleepRecord
  extends Identifiable, Auditable, BabyScoped, OccurredAt {
  startedAt: Date
  endedAt?: Date | null
  durationMinutes?: number | null
  location?: string | null
  notes?: string | null
}
