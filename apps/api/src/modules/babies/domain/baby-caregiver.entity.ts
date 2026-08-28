import type { Identifiable } from '../../../shared/domain/auditable.js'

export const CaregiverRole = {
  OWNER: 'OWNER',
  CAREGIVER: 'CAREGIVER',
} as const

export type CaregiverRole = (typeof CaregiverRole)[keyof typeof CaregiverRole]

export interface BabyCaregiver extends Identifiable {
  babyId: string
  userId: string
  role: CaregiverRole
  createdAt: Date
}
