
"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Minus, Plus } from "lucide-react";
import type { Show } from "@/types";

interface EpisodeTrackerProps {
  show: Show;
  onEpisodeChange: (showId: string, newWatchedEpisodes: number) => void;
}

export function EpisodeTracker({ show, onEpisodeChange }: EpisodeTrackerProps) {
  const progress = show.totalEpisodes > 0 ? (show.watchedEpisodes / show.totalEpisodes) * 100 : 0;

  const incrementEpisodes = () => {
    if (show.watchedEpisodes < show.totalEpisodes) {
      onEpisodeChange(show.id, show.watchedEpisodes + 1);
    }
  };

  const decrementEpisodes = () => {
    if (show.watchedEpisodes > 0) {
      onEpisodeChange(show.id, show.watchedEpisodes - 1);
    }
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Progress: {show.watchedEpisodes} / {show.totalEpisodes}
        </span>
        {show.totalEpisodes - show.watchedEpisodes > 0 && (
          <span>{show.totalEpisodes - show.watchedEpisodes} remaining</span>
        )}
      </div>
      <Progress value={progress} aria-label={`${show.title} progress`} className="h-2" />
      {show.status === "Watching" && (
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementEpisodes}
            disabled={show.watchedEpisodes === 0}
            aria-label="Decrement watched episode count"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={incrementEpisodes}
            disabled={show.watchedEpisodes === show.totalEpisodes}
            aria-label="Increment watched episode count"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
