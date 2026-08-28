import type { Auditable, Identifiable } from '../../../shared/domain/auditable.js'

export interface User extends Identifiable, Auditable {
  email: string
  name?: string | null
}

/** Dados persistidos — senha nunca exposta fora da camada de auth. */
export interface UserWithCredentials extends User {
  password: string
}
