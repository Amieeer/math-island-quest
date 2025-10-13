import { useState } from "react";
import { IslandCard } from "@/components/ui/island-card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

const sampleProblem = {
  question: "What is 7 + 5?",
  options: ["10", "11", "12", "13"],
  correctAnswer: "12",
};

export function ProblemDemo() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowResult(false);
    }, 2000);
  };

  const isCorrect = selectedAnswer === sampleProblem.correctAnswer;

  return (
    <section className="py-20 px-4 bg-gradient-ocean">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
            Interactive Problem Solving
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Try a sample problem! Click on your answer below.
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <IslandCard className="bg-card">
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-card-foreground mb-2">
                  {sampleProblem.question}
                </h3>
                <p className="text-muted-foreground">
                  Select the correct answer
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {sampleProblem.options.map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isThisCorrect = option === sampleProblem.correctAnswer;
                  
                  let buttonVariant: "default" | "secondary" = "secondary";
                  let extraClasses = "";
                  
                  if (showResult && isSelected) {
                    if (isCorrect) {
                      extraClasses = "bg-secondary border-secondary shadow-glow";
                    } else {
                      extraClasses = "bg-destructive border-destructive";
                    }
                  }

                  return (
                    <Button
                      key={option}
                      variant={buttonVariant}
                      size="lg"
                      className={`text-2xl h-20 relative ${extraClasses} transition-all duration-300`}
                      onClick={() => !showResult && handleAnswerSelect(option)}
                      disabled={showResult}
                    >
                      {option}
                      {showResult && isSelected && (
                        <span className="absolute right-4">
                          {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-secondary-foreground" />
                          ) : (
                            <XCircle className="w-6 h-6 text-destructive-foreground" />
                          )}
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>

              {showResult && (
                <div className={`text-center p-4 rounded-xl animate-fade-in-up ${
                  isCorrect ? "bg-secondary/20" : "bg-destructive/20"
                }`}>
                  <p className={`text-lg font-semibold ${
                    isCorrect ? "text-secondary" : "text-destructive"
                  }`}>
                    {isCorrect ? "🎉 Excellent work!" : "Not quite! Try again!"}
                  </p>
                </div>
              )}
            </div>
          </IslandCard>
        </div>
      </div>
    </section>
  );
}
