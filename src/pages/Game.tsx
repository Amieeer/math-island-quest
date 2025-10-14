import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LevelPlayer } from "@/components/game/LevelPlayer";
import { Level } from "@/data/grade1-levels";
import { grade1Levels } from "@/data/grade1-levels";
import { grade2Levels } from "@/data/grade2-levels";
import { grade3Levels } from "@/data/grade3-levels";
import { grade4Levels } from "@/data/grade4-levels";
import { grade5Levels } from "@/data/grade5-levels";
import { grade6Levels } from "@/data/grade6-levels";

interface GameState {
  levelId: string;
  grade: number;
  difficulty: "easy" | "medium" | "hard";
}

export default function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as GameState;
  const [level, setLevel] = useState<Level | null>(null);

  useEffect(() => {
    if (!state) {
      navigate("/dashboard");
      return;
    }

    // Get all levels for the grade
    const allLevels = [
      ...grade1Levels,
      ...grade2Levels,
      ...grade3Levels,
      ...grade4Levels,
      ...grade5Levels,
      ...grade6Levels,
    ];

    const foundLevel = allLevels.find((l) => l.id === state.levelId);
    if (foundLevel) {
      setLevel(foundLevel);
    } else {
      navigate("/dashboard");
    }
  }, [state, navigate]);

  const handleComplete = (score: number) => {
    if (!level) return;

    navigate("/summary", {
      state: {
        score,
        totalProblems: level.problems.length,
        levelId: level.id,
        grade: state.grade,
        difficulty: state.difficulty,
        levelTitle: level.title,
      },
    });
  };

  const handleExit = () => {
    navigate("/dashboard");
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
        <div className="text-primary-foreground text-xl">Loading level...</div>
      </div>
    );
  }

  return (
    <LevelPlayer level={level} onComplete={handleComplete} onExit={handleExit} />
  );
}
