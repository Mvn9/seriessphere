
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Star } from "lucide-react";
import type { Show } from "@/types";
import { EpisodeTracker } from "./episode-tracker";

interface ShowCardProps {
  show: Show;
  onEpisodeChange: (showId: string, newWatchedEpisodes: number) => void;
  onSpoilerToggle: (showId: string) => void;
}

export function ShowCard({ show, onEpisodeChange, onSpoilerToggle }: ShowCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={show.coverImageUrl}
          alt={show.title}
          width={300}
          height={450}
          className="w-full h-64 object-cover"
          data-ai-hint={`${show.genres[0] || ""} ${show.genres[1] || ""}`}
        />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-1 line-clamp-1">{show.title}</CardTitle>
        {show.releaseYear && <CardDescription className="text-xs text-muted-foreground mb-2">{show.releaseYear}</CardDescription>}
        <div className="flex flex-wrap gap-1 mb-2">
          {show.genres.map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
        </div>
        
        <div 
          className={`text-sm text-muted-foreground line-clamp-3 ${!show.spoilersVisible && show.status === "Watching" ? "blur-sm select-none" : ""}`}
          onClick={() => !show.spoilersVisible && show.status === "Watching" && onSpoilerToggle(show.id)}
          title={!show.spoilersVisible && show.status === "Watching" ? "Click to reveal spoilers" : ""}
          role={!show.spoilersVisible && show.status === "Watching" ? "button" : undefined}
          tabIndex={!show.spoilersVisible && show.status === "Watching" ? 0 : undefined}
          aria-pressed={!show.spoilersVisible && show.status === "Watching" ? !show.spoilersVisible : undefined}
        >
          {show.description}
        </div>

        {show.status === "Watching" && (
           <div className="flex items-center space-x-2 mt-3">
            <Switch
              id={`spoiler-switch-${show.id}`}
              checked={show.spoilersVisible}
              onCheckedChange={() => onSpoilerToggle(show.id)}
              aria-label="Toggle spoiler visibility"
            />
            <Label htmlFor={`spoiler-switch-${show.id}`} className="text-xs flex items-center gap-1">
              {show.spoilersVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              {show.spoilersVisible ? "Hide Spoilers" : "Show Spoilers"}
            </Label>
          </div>
        )}

        {(show.status === "Watching" || show.status === "Completed") && (
          <EpisodeTracker show={show} onEpisodeChange={onEpisodeChange} />
        )}
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <div className="flex justify-between items-center w-full">
            {show.rating && (
            <div className="flex items-center gap-1 text-sm text-amber-500">
                <Star className="h-4 w-4 fill-amber-500" />
                <span>{show.rating.toFixed(1)}</span>
            </div>
            )}
            {show.userScore && (
                 <Badge variant="outline">My Score: {show.userScore}/10</Badge>
            )}
            {!(show.rating || show.userScore) && <div/>}
          <Button variant="outline" size="sm">Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
