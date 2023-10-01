export interface IUser {
  name: string;
  email: string;
  readonly id: number;
  isActivated: boolean;
}