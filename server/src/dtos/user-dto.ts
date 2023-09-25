import { User } from "@prisma/client";

export default class UserDto {
  name: string;
  email: string;
  id: number;
  isActivated: boolean;

  constructor (user: User) {
    this.name = user.name;
    this.email = user.email;
    this.id = user.id;
    this.isActivated = user.isActivated;
  }

}