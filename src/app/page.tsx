
import { WatchlistTabs } from "@/components/watchlist/watchlist-tabs";

export default function WatchlistsPage() {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-bold mb-6 text-foreground">My Watchlists</h1>
      <WatchlistTabs />
    </div>
  );
}
