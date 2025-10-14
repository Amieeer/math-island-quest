import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IslandCard } from "@/components/ui/island-card";
import { Trophy, RotateCcw, Star, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { LevelUpModal } from "@/components/ui/level-up-modal";
import { Progress } from "@/components/ui/progress";

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
  const { saveProgress } = useProgress();
  const state = location.state as LocationState;
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpData, setLevelUpData] = useState({ oldLevel: 1, newLevel: 1 });
  const [progressSaved, setProgressSaved] = useState(false);

  useEffect(() => {
    if (!state || progressSaved) return;
    if (!user) {
      navigate("/auth");
      return;
    }

    const handleSaveProgress = async () => {
      const result = await saveProgress(
        state.levelId,
        state.grade,
        state.difficulty,
        state.score,
        state.totalProblems
      );

      if (result?.levelUp) {
        setLevelUpData({
          oldLevel: result.newLevel - 1,
          newLevel: result.newLevel,
        });
        setShowLevelUpModal(true);
      }
      setProgressSaved(true);
    };

    handleSaveProgress();
  }, [state, user, navigate, saveProgress, progressSaved]);

  if (!state) {
    return null;
  }

  const percentage = Math.round((state.score / state.totalProblems) * 100);
  const passed = percentage >= 80;
  const correctCount = state.score;
  const wrongCount = state.totalProblems - state.score;

  const getNextDifficulty = (): {
    label: string;
    difficulty: "medium" | "hard";
  } | null => {
    if (state.difficulty === "easy")
      return { label: "Medium", difficulty: "medium" };
    if (state.difficulty === "medium")
      return { label: "Hard", difficulty: "hard" };
    return null;
  };

  const nextDifficulty = getNextDifficulty();

  const handleNextLevel = () => {
    if (!nextDifficulty) return;
    // Navigate directly to the next level's game screen
    const nextLevelId = state.levelId.replace(state.difficulty, nextDifficulty.difficulty);
    navigate("/game", {
      state: {
        levelId: nextLevelId,
        grade: state.grade,
        difficulty: nextDifficulty.difficulty,
      },
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-ocean flex items-center justify-center p-4">
        <IslandCard className="max-w-2xl w-full animate-scale-in">
          <div className="text-center space-y-6">
            {/* Trophy Icon */}
            <div className="flex justify-center">
              <div
                className={`p-6 rounded-full ${passed ? "bg-green-500/20" : "bg-orange-500/20"}`}
              >
                <Trophy
                  className={`w-16 h-16 ${passed ? "text-green-600" : "text-orange-600"}`}
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-card-foreground">
              {passed ? "Excellent Work!" : "Great Effort!"}
            </h1>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={percentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Mastery Progress: {percentage}% (Need 80% to pass)
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-background/50 rounded-lg p-6 space-y-4">
              <div className="text-6xl font-bold text-primary">{percentage}%</div>
              <div className="flex items-center justify-center gap-8 text-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-green-600 fill-green-600" />
                  <span className="text-muted-foreground">
                    Correct:{" "}
                    <span className="font-bold text-green-600">{correctCount}</span>
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
                    onClick={handleNextLevel}
                    size="lg"
                    className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground"
                  >
                    On to the {nextDifficulty.label} Level!
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

      <LevelUpModal
        open={showLevelUpModal}
        onClose={() => setShowLevelUpModal(false)}
        oldLevel={levelUpData.oldLevel}
        newLevel={levelUpData.newLevel}
      />
    </>
  );
}