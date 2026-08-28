import type {
  Auditable,
  BabyScoped,
  Identifiable,
  OccurredAt,
} from '../../../shared/domain/auditable.js'

export interface DiaryEntry
  extends Identifiable, Auditable, BabyScoped, OccurredAt {
  title: string
  description?: string | null
  category?: string | null
  photoUrl?: string | null
}
