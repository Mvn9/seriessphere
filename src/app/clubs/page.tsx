
import { ClubsList } from "@/components/clubs/clubs-list";

export default function ClubsPage() {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Community Clubs</h1>
      <ClubsList />
    </div>
  );
}
