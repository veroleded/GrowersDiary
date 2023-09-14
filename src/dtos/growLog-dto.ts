import { GrowLog } from "@prisma/client";

export default class GrowLogDto {
  id;
  name;
  description;
  createdAt;
  finishedAt;
  strainId;
  isPublic;
  ownerId;

  constructor(payload: GrowLog) {
    this.id = payload.id;
    this.name = payload.name;
    this.description = payload.description;
    this.ownerId = payload.ownerId;
    this.createdAt = payload.createdAt;
    this.finishedAt = payload.finshedAt;
    this.strainId = payload.strainId;
    this.isPublic = payload.isPublic;
  }
}