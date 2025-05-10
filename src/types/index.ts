
import { z } from 'zod';

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

// Content from former src/types/schemas.ts
const showStatusValues = ALL_SHOW_STATUSES as [ShowStatus, ...ShowStatus[]];

export const ShowStatusSchema = z.enum(showStatusValues);

export const ShowSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  coverImageUrl: z.string().url().describe("URL of the show's cover image."),
  totalEpisodes: z.number().int().positive().describe("Total number of episodes in the show."),
  watchedEpisodes: z.number().int().min(0).describe("Number of episodes watched by the user."),
  status: ShowStatusSchema,
  genres: z.array(z.string()).describe("List of genres for the show."),
  rating: z.number().min(0).max(10).optional().describe("Overall rating of the show (e.g., 0-10)."),
  spoilersVisible: z.boolean().describe("Whether spoilers are visible for this show."),
  userScore: z.number().min(0).max(10).optional().describe("User's personal score for the show (0-10)."),
  releaseYear: z.number().int().optional().describe("The year the show was released."),
});
