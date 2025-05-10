
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { generateRecommendations, type GenerateRecommendationsInput, type GenerateRecommendationsOutput } from "@/ai/flows/generate-recommendations";
import { Loader2, Sparkles } from "lucide-react";

const recommendationFormSchema = z.object({
  viewingHistory: z.string().min(10, "Please enter at least a few shows you've watched."),
});

type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

export function RecommendationForm() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      viewingHistory: "",
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const input: GenerateRecommendationsInput = { viewingHistory: data.viewingHistory };
      const result: GenerateRecommendationsOutput = await generateRecommendations(input);
      
      if (result.recommendations) {
        setRecommendations(result.recommendations.split(",").map(rec => rec.trim()).filter(rec => rec.length > 0));
        toast({
          title: "Recommendations Generated!",
          description: "Here are some shows you might like.",
        });
      } else {
        toast({
          title: "No Recommendations",
          description: "The AI couldn't generate recommendations based on your input. Try adding more shows.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Show Recommendations
          </CardTitle>
          <CardDescription>
            Tell us what you&apos;ve watched, and our AI will suggest new shows for you!
            Enter a comma-separated list of shows.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="viewingHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="viewingHistory">Your Viewing History</FormLabel>
                    <FormControl>
                      <Textarea
                        id="viewingHistory"
                        placeholder="e.g., Breaking Bad, Stranger Things, The Office, Game of Thrones..."
                        className="min-h-[100px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended For You</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-foreground">{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
