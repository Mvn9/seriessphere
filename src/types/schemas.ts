
import { z } from 'zod';
import { ALL_SHOW_STATUSES } from './index';
import type { ShowStatus as ShowStatusType } from './index'; // Import the type for Zod enum values

// Create a Zod-compatible array from ALL_SHOW_STATUSES
const showStatusValues = ALL_SHOW_STATUSES as [ShowStatusType, ...ShowStatusType[]];

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
