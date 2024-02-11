export type Format = "mp4" | "m4a";

export interface InfoRequest {
  query: string;
  format: Format;
}

export interface InfoResponse {
  createdAt: Date;
  etag: string;
  id: number;
  nextPageToken: string;
  previousPageToken: string;
  query: string;
}

export interface Info extends Response {}
