
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface ClubChatPreviewProps {
  clubName: string; // clubName is passed for context, though DialogTitle handles it in ClubCard
}

export function ClubChatPreview({ clubName }: ClubChatPreviewProps) {
  const mockMessages = [
    { id: "1", sender: "Alice", avatarSeed: "alice", text: "Hey everyone! Excited for the new episode discussion of 'Cosmic Wonders'.", timestamp: "10:00 AM" },
    { id: "2", sender: "Bob", avatarSeed: "bob", text: "Me too! That cliffhanger from last week was intense.", timestamp: "10:02 AM" },
    { id: "3", sender: "You", avatarSeed: "you", text: "Just finished watching. Mind blown! What did you all think of the big reveal?", timestamp: "10:05 AM", self: true },
    { id: "4", sender: "Charlie", avatarSeed: "charlie", text: "I have a theory about the artifact...", timestamp: "10:07 AM" },
    { id: "5", sender: "Diana", avatarSeed: "diana", text: "Welcome to the club, new members! Feel free to share your thoughts.", timestamp: "10:08 AM"},
    { id: "6", sender: "You", avatarSeed: "you", text: "Great to be here! This is my first time joining a discussion for this show.", timestamp: "10:10 AM", self: true },
    { id: "7", sender: "Alice", avatarSeed: "alice", text: "No spoilers for the latest episode yet, please! Some of us haven't seen it.", timestamp: "10:12 AM"},

  ];

  return (
    <div className="flex flex-col flex-grow overflow-hidden bg-card">
      <ScrollArea className="flex-grow p-4 space-y-4">
        {mockMessages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2.5 ${msg.self ? "justify-end" : ""}`}>
            {!msg.self && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://picsum.photos/seed/${msg.avatarSeed}/40/40`} alt={msg.sender} data-ai-hint="person avatar"/>
                <AvatarFallback>{msg.sender.substring(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[70%] p-3 rounded-lg shadow-sm ${msg.self ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none"}`}>
              {!msg.self && <p className="text-xs font-semibold mb-0.5 text-foreground/80">{msg.sender}</p>}
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.self ? "text-primary-foreground/70" : "text-muted-foreground/80"} ${msg.self ? "text-right" : "text-left"}`}>{msg.timestamp}</p>
            </div>
            {msg.self && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://picsum.photos/seed/${msg.avatarSeed}/40/40`} alt={msg.sender} data-ai-hint="person avatar"/>
                <AvatarFallback>{msg.sender.substring(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
          <Input type="text" placeholder="Type a message..." className="flex-grow" aria-label="Chat message input"/>
          <Button type="submit" size="icon" aria-label="Send message">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
