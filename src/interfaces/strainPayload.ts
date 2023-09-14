export interface PostStrainPayload {
  name: string;
  type: boolean;
  description: string | null;
  feminization: boolean;
}

export interface UpdateStrainPayload {
  name?: string;
  type?: boolean;
  description?: string | null;
  feminization?: boolean;
}
