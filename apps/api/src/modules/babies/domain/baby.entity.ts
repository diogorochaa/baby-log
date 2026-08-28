import type { Auditable, Identifiable } from '../../../shared/domain/auditable.js'

export const Sex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
  UNKNOWN: 'UNKNOWN',
} as const

export type Sex = (typeof Sex)[keyof typeof Sex]

export interface Baby extends Identifiable, Auditable {
  name: string
  birthDate: Date
  birthTime?: string | null
  sex: Sex
  birthWeight?: string | null
  birthWeightUnit: string
  birthHeight?: string | null
  birthHeightUnit: string
  photoUrl?: string | null
  notes?: string | null
}
