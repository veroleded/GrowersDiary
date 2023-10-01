export interface IStrain {
  readonly id?: number;
  name: string;
  description: string | null;
  type: boolean;
  feminization: boolean;
}