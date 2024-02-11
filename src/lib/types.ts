export type Format = "m4a" | "mp4";

export interface InfoRequest {
  query: string;
  format: Format;
}
