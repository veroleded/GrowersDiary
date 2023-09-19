export interface PostLogEntryPayload {
  name: string;
  text: string;
  growLogId: number;
}

export interface updateLogEntryPayload {
  name?: string;
  text?:string;
  photo?: string;
}