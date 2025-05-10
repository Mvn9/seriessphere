
export type ShowStatus =
  | "Watching"
  | "Completed"
  | "On Hold"
  | "Dropped"
  | "Plan to Watch";

export interface Show {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  totalEpisodes: number;
  watchedEpisodes: number;
  status: ShowStatus;
  genres: string[];
  rating?: number;
  spoilersVisible: boolean;
  userScore?: number; // 0-10 scale
  releaseYear?: number;
}

export const ALL_SHOW_STATUSES: ShowStatus[] = [
  "Watching",
  "Completed",
  "On Hold",
  "Dropped",
  "Plan to Watch",
];


export interface Club {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImageUrl: string;
  tags: string[];
}
