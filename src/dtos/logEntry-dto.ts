import { LogEntry } from "@prisma/client";

export default class logEntryDto {
  id;
  createdAt;
  text;
  photo;
  growLogId;

  constructor(payload: LogEntry) {
    this.id = payload.id;
    this.createdAt = payload.createdAt;
    this.text = payload.text;
    this.photo = payload.photo;
    this.growLogId = payload.growLogId;
  }
}