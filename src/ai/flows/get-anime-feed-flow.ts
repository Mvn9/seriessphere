
'use server';
/**
 * @fileOverview Provides an API-like feed for anime shows.
 *
 * - getAnimeFeed - A function to fetch anime shows based on categories.
 * - GetAnimeFeedInput - The input type for the getAnimeFeed function.
 * - GetAnimeFeedOutput - The return type for the getAnimeFeed function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { mockShows } from '@/lib/mock-data';
import type { Show } from '@/types';
import { ShowSchema } from '@/types'; // Updated import path

// Define Input Schema
const GetAnimeFeedInputSchema = z.object({
  category: z.enum(['new_releases', 'popular_this_season', 'genre_spotlight'])
    .describe("The category of anime to fetch."),
  genre: z.string().optional()
    .describe("The genre to filter by, required if category is 'genre_spotlight'."),
  limit: z.number().int().positive().optional().default(5)
    .describe("Maximum number of shows to return."),
});
export type GetAnimeFeedInput = z.infer<typeof GetAnimeFeedInputSchema>;

// Define Output Schema
const GetAnimeFeedOutputSchema = z.object({
  shows: z.array(ShowSchema).describe("A list of anime shows matching the criteria."),
});
export type GetAnimeFeedOutput = z.infer<typeof GetAnimeFeedOutputSchema>;

// Exported function to call the flow
export async function getAnimeFeed(input: GetAnimeFeedInput): Promise<GetAnimeFeedOutput> {
  return getAnimeFeedFlow(input);
}

// The Genkit Flow
const getAnimeFeedFlow = ai.defineFlow(
  {
    name: 'getAnimeFeedFlow',
    inputSchema: GetAnimeFeedInputSchema,
    outputSchema: GetAnimeFeedOutputSchema,
  },
  async (input: GetAnimeFeedInput): Promise<GetAnimeFeedOutput> => {
    let filteredShows: Show[] = [];
    const currentYear = new Date().getFullYear();

    // Filter for shows that have "Anime" in their genres.
    const animeShows = mockShows.filter(show => 
      show.genres.some(genre => genre.toLowerCase() === "anime")
    );

    if (animeShows.length === 0) {
      console.warn("No shows found with the 'Anime' genre in mock-data. The anime feed will be empty.");
      // You might consider returning an empty list or handling this as an error depending on requirements.
      // For now, it will proceed and likely return an empty list for all categories.
    }

    switch (input.category) {
      case 'new_releases':
        // Shows released in the current or previous year, sorted by release year descending.
        filteredShows = animeShows
          .filter(show => show.releaseYear && show.releaseYear >= currentYear - 1)
          .sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
        break;
      case 'popular_this_season':
        // Shows with high rating (e.g., >= 8.5) released in current/previous year, sorted by rating.
        filteredShows = animeShows
          .filter(show => show.rating && show.rating >= 8.5 && show.releaseYear && show.releaseYear >= currentYear -1)
          .sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'genre_spotlight':
        if (!input.genre) {
          // This case should ideally be caught by Zod if we made genre required based on category,
          // but for simplicity, we handle it here.
          // Or, we could let it return all anime if no genre is specified for spotlight.
          // For now, strict: throw error or return empty. Let's return empty for safety.
          console.warn("Genre is required for 'genre_spotlight' category. Returning empty list.");
          filteredShows = [];
          // throw new Error("Genre is required for 'genre_spotlight' category.");
        } else {
          const searchGenre = input.genre.toLowerCase();
          filteredShows = animeShows.filter(show =>
            show.genres.some(g => g.toLowerCase() === searchGenre)
          );
        }
        break;
      default:
        // This case should not be reached if Zod validation on enum is working.
        // Fallback to all anime shows if something unexpected occurs.
        filteredShows = animeShows;
    }

    return { shows: filteredShows.slice(0, input.limit) };
  }
);
