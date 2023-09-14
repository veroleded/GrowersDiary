export interface PostLogEntryPayload {
  name: string;
  text: string;
  createdAt: Date;
  photo: string;
  growLogId: number;
}

export interface updateLogEntryPayload {
  name?: string;
  text?:string;
  photo?: string;
}