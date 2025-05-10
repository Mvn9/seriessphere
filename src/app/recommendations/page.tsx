
import { RecommendationForm } from "@/components/recommendations/recommendation-form";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Discover New Shows</h1>
      <RecommendationForm />
    </div>
  );
}
