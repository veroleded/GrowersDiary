export interface PostGrowLogPayload {
  name: string,
  description: string | null,
  strainId: number,
  isPublic: boolean,
  ownerId: number,
}

export interface UpdateGrowLogPayload {
  name?: string,
  description?: string | null,
  strainId?: number,
  isPublic?: boolean,
  finishedAt?: Date
}