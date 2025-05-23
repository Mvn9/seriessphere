
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare } from "lucide-react";
import type { Club } from "@/types";
import { ClubChatPreview } from "./club-chat-preview";

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={club.coverImageUrl}
          alt={club.name}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
          data-ai-hint={`${club.tags[0] || ""} ${club.tags[1] || ""}`}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-1 line-clamp-1">{club.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Users className="h-4 w-4 mr-1" />
          <span>{club.memberCount} members</span>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {club.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1">
          {club.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              View Chat Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] p-0 max-h-[80vh] flex flex-col">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle>{club.name} - Chat Preview</DialogTitle>
              <DialogDescription>
                This is a preview of the club chat. Full functionality coming soon!
              </DialogDescription>
            </DialogHeader>
            <ClubChatPreview clubName={club.name} />
          </DialogContent>
        </Dialog>
        <Button className="flex-1 bg-primary hover:bg-primary/90">Join Club</Button>
      </CardFooter>
    </Card>
  );
}
