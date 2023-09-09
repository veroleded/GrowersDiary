import { User } from "@prisma/client";

export default class UserDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor (user: User) {
    this.email = user.email;
    this.id = user.id;
    this.isActivated = user.isActivated;
  }

}