
"use client";

import { useState, useEffect } from "react";
import { ClubCard } from "./club-card";
import type { Club } from "@/types";
import { mockClubs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function ClubsList() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setClubs(mockClubs);
      setIsLoading(false);
    }, 500);
  }, []);

  const ClubSkeleton = () => (
    <div className="flex flex-col space-y-3 p-4 border rounded-lg shadow-sm bg-card">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
       <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-1/2" />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <ClubSkeleton key={index} />
        ))}
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-foreground">Explore Clubs</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Club
        </Button>
      </div>
      {clubs.length === 0 && !isLoading ? (
         <p className="text-center text-muted-foreground py-8">No clubs available yet. Why not create one?</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </div>
  );
}
