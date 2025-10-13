import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IslandCard } from "@/components/ui/island-card";
import { Trophy, RotateCcw, Star, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { toast } from "sonner";

interface LocationState {
  score: number;
  totalProblems: number;
  levelId: string;
  grade: number;
  difficulty: "easy" | "medium" | "hard";
  levelTitle: string;
}

export default function LevelSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const state = location.state as LocationState;

  useEffect(() => {
    // Get state from URL params if not in location state
    const searchParams = new URLSearchParams(location.search);
    const urlScore = searchParams.get("score");
    const urlTotal = searchParams.get("total");
    const urlLevelId = searchParams.get("levelId");
    const urlDifficulty = searchParams.get("difficulty");

    if (!state && (!urlScore || !urlTotal || !urlLevelId)) {
      navigate("/dashboard");
      return;
    }

    if (!user) {
      navigate("/auth");
      return;
    }

    // Use state from location or URL params
    const scoreToSave = state?.score ?? parseInt(urlScore || "0");
    const levelId = state?.levelId ?? urlLevelId ?? "";
    const difficulty = state?.difficulty ?? (urlDifficulty as "easy" | "medium" | "hard");

    // Save progress to database
    const saveProgress = async () => {
      const { error } = await supabase
        .from("progress")
        .upsert({
          user_id: user.id,
          level_id: levelId,
          grade: state?.grade ?? 1,
          difficulty: difficulty,
          score: scoreToSave,
        });

      if (error) {
        console.error("Error saving progress:", error);
        toast.error("Failed to save progress");
      }
    };

    saveProgress();
  }, [state, user, navigate, location.search]);

  if (!state) {
    return null;
  }

  const percentage = Math.round((state.score / state.totalProblems) * 100);
  const passed = percentage >= 80;
  const correctCount = state.score;
  const wrongCount = state.totalProblems - state.score;

  const getNextDifficulty = () => {
    if (state.difficulty === "easy") return "Medium";
    if (state.difficulty === "medium") return "Hard";
    return null;
  };

  const nextDifficulty = getNextDifficulty();

  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center p-4">
      <IslandCard className="max-w-2xl w-full animate-scale-in">
        <div className="text-center space-y-6">
          {/* Trophy Icon */}
          <div className="flex justify-center">
            <div className={`p-6 rounded-full ${passed ? "bg-green-500/20" : "bg-orange-500/20"}`}>
              <Trophy className={`w-16 h-16 ${passed ? "text-green-600" : "text-orange-600"}`} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-card-foreground">
            {passed ? "Excellent Work!" : "Great Effort!"}
          </h1>

          {/* Score Display */}
          <div className="bg-background/50 rounded-lg p-6 space-y-4">
            <div className="text-6xl font-bold text-primary">
              {percentage}%
            </div>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-green-600" />
                <span className="text-muted-foreground">
                  Correct: <span className="font-bold text-green-600">{correctCount}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-red-600" />
                <span className="text-muted-foreground">
                  Wrong: <span className="font-bold text-red-600">{wrongCount}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Message */}
          <p className="text-lg text-muted-foreground">
            {passed
              ? `Amazing! You've mastered ${state.levelTitle}!`
              : "Keep practicing! Try again to unlock the next level."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {!passed ? (
              <>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Back to Map
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="lg"
                  className="flex-1"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              </>
            ) : nextDifficulty ? (
              <>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Back to Map
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="lg"
                  className="flex-1 bg-gradient-primary"
                >
                  On to the {nextDifficulty} Level!
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="w-full"
              >
                Back to Map
              </Button>
            )}
          </div>
        </div>
      </IslandCard>
    </div>
  );
}