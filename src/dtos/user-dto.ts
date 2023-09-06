export type Model  = {
  email: string;
  id: number;
  isActivated: boolean;
}

export default class UserDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor (model: Model) {
    this.email = model.email;
    this.id = model.id;
    this.isActivated = model.isActivated;
  }

}