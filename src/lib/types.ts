export type Format = "mp4" | "m4a";

export interface InfoRequest {
  query: string;
  format: Format;
}

export interface Info {
  createdAt: string;
  etag: string;
  id: number;
  nextPageToken: string;
  previousPageToken: string;
  query: string;
  results: VideoItem[];
}
export interface VideoItem {
  createdAt: string;
  etag: string;
  id: number;
  thumbnail: string;
  title: string;
  videoId: string;
}

export interface InfoResponse extends Info {
  error?: string;
}
