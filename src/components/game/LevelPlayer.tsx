import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IslandCard } from "@/components/ui/island-card";
import { Check, X, ArrowRight } from "lucide-react";
import { Level, Problem } from "@/data/grade1-levels";
import { cn } from "@/lib/utils";

interface LevelPlayerProps {
  level: Level;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export function LevelPlayer({ level, onComplete, onExit }: LevelPlayerProps) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredProblems, setAnsweredProblems] = useState<number[]>([]);

  const currentProblem = level.problems[currentProblemIndex];
  const isCorrect = selectedAnswer === currentProblem.answer;
  const isLastProblem = currentProblemIndex === level.problems.length - 1;

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === currentProblem.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastProblem) {
      onComplete(score + (isCorrect ? 1 : 0));
    } else {
      setAnsweredProblems([...answeredProblems, currentProblemIndex]);
      setCurrentProblemIndex(currentProblemIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-ocean py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground mb-1">
                {level.title}
              </h1>
              <p className="text-primary-foreground/80">{level.objective}</p>
            </div>
            <Button variant="secondary" onClick={onExit}>
              Exit
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-background/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-accent h-full transition-all duration-300"
              style={{
                width: `${((currentProblemIndex + 1) / level.problems.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-primary-foreground/80 text-sm mt-2">
            Problem {currentProblemIndex + 1} of {level.problems.length} • Score: {score}
          </p>
        </div>

        {/* Problem Card */}
        <IslandCard className="animate-fade-in">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-card-foreground">
              {currentProblem.question}
            </h2>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4">
              {currentProblem.options?.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option === currentProblem.answer;
                
                return (
                  <Button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    variant="outline"
                    className={cn(
                      "h-16 text-xl font-semibold transition-all",
                      isSelected && !showResult && "ring-2 ring-primary",
                      showResult && isSelected && isCorrect && "bg-green-500/20 border-green-500",
                      showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500",
                      showResult && !isSelected && isCorrectAnswer && "bg-green-500/20 border-green-500"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {option}
                      {showResult && isSelected && isCorrect && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Feedback */}
            {showResult && (
              <div className="animate-fade-in">
                {isCorrect ? (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-700 dark:text-green-400 font-semibold flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Great job! That's correct!
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-400 font-semibold flex items-center gap-2">
                      <X className="w-5 h-5" />
                      Not quite. The correct answer is {currentProblem.answer}.
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleNext}
                  className="w-full mt-4"
                  size="lg"
                >
                  {isLastProblem ? "Finish Level" : "Next Problem"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </IslandCard>
      </div>
    </div>
  );
}
