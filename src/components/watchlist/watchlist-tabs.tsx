
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShowCard } from "./show-card";
import type { Show, ShowStatus } from "@/types";
import { mockShows } from "@/lib/mock-data"; // Assuming mockShows are available
import { ALL_SHOW_STATUSES } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export function WatchlistTabs() {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setShows(mockShows);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEpisodeChange = (showId: string, newWatchedEpisodes: number) => {
    setShows((prevShows) =>
      prevShows.map((s) =>
        s.id === showId
          ? {
              ...s,
              watchedEpisodes: newWatchedEpisodes,
              status: newWatchedEpisodes === s.totalEpisodes ? "Completed" : s.status,
            }
          : s
      )
    );
  };

  const handleSpoilerToggle = (showId: string) => {
    setShows((prevShows) =>
      prevShows.map((s) =>
        s.id === showId ? { ...s, spoilersVisible: !s.spoilersVisible } : s
      )
    );
  };

  const renderShowGrid = (status: ShowStatus) => {
    const filteredShows = shows.filter((show) => show.status === status);
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      );
    }
    if (filteredShows.length === 0) {
      return <p className="text-center text-muted-foreground py-8">No shows in this list yet.</p>;
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredShows.map((show) => (
          <ShowCard
            key={show.id}
            show={show}
            onEpisodeChange={handleEpisodeChange}
            onSpoilerToggle={handleSpoilerToggle}
          />
        ))}
      </div>
    );
  };
  
  const CardSkeleton = () => (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg shadow-sm bg-card">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );


  return (
    <Tabs defaultValue={ALL_SHOW_STATUSES[0]} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6 gap-2">
        {ALL_SHOW_STATUSES.map((status) => (
          <TabsTrigger key={status} value={status} className="text-xs sm:text-sm">
            {status}
          </TabsTrigger>
        ))}
      </TabsList>
      {ALL_SHOW_STATUSES.map((status) => (
        <TabsContent key={status} value={status}>
          {renderShowGrid(status)}
        </TabsContent>
      ))}
    </Tabs>
  );
}
