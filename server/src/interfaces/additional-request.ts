import { Request } from "express";
import UserDto from "../dtos/user-dto";

export interface RequestUser extends Request {
  user?: UserDto
}
