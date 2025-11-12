# SeriesSphere — AI / Recommendation Flow (Genkit / Google AI)

## Overview
This document explains how SeriesSphere’s AI recommendation system works.  
It details the input data, Genkit flow, output, and how results are re-ranked and displayed with explanations.

## Architecture
1. User opens “Discover” or “Recommendations” in the app.  
2. Frontend sends user history and show metadata to the server.  
3. Server calls the Genkit (Google AI) flow to generate recommendations.  
4. Genkit returns a ranked list of shows + reasons.  
5. Server re-ranks and sends the final list back to the client.

## Example input sent to AI
```json
{
  "user": {"history": ["Naruto", "Steins;Gate"], "preferred_genres": ["Action","Sci-Fi"]},
  "candidates": [{"title":"Erased"},{"title":"Bleach"}],
  "max_results":10
}
