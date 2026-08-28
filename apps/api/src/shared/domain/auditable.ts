export interface Auditable {
  createdAt: Date
  updatedAt: Date
}

export interface Identifiable {
  id: string
}

export interface BabyScoped {
  babyId: string
}

export interface OccurredAt {
  /** Data/hora do evento para ordenacao na timeline (RF-004, RF-028). */
  occurredAt: Date
}
