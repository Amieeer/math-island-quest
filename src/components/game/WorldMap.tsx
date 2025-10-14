import { useState, useEffect } from "react";
import { IslandCard } from "@/components/ui/island-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock, Star, Trophy, Sparkles } from "lucide-react";
import { LevelPlayer } from "@/components/game/LevelPlayer";
import { grade1Levels, Level } from "@/data/grade1-levels";
import { grade2Levels } from "@/data/grade2-levels";
import { grade3Levels } from "@/data/grade3-levels";
import { grade4Levels } from "@/data/grade4-levels";
import { grade5Levels } from "@/data/grade5-levels";
import { grade6Levels } from "@/data/grade6-levels";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import island1 from "@/assets/island-1.png";
import island2 from "@/assets/island-2.png";
import island3 from "@/assets/island-3.png";
import grade4Mine from "@/assets/grade4-mine.jpg";
import grade5Space from "@/assets/grade5-space.jpg";
import grade6Lab from "@/assets/grade6-lab.jpg";

interface Island {
  id: string;
  name: string;
  description: string;
  modalDescription: string;
  grade: number;
  domain: string;
  status: "unlocked" | "locked" | "completed";
  image: string;
  stars: number;
}

const baseIslands: Island[] = [
  {
    id: "grade1",
    name: "Addition Shore",
    description: "Start your math adventure with addition and subtraction",
    modalDescription: "Welcome to Addition Shore! 🏖️ Get ready for an exciting journey learning addition and subtraction within 20. Count shells, solve coconut puzzles, and explore jungle equations!",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    status: "unlocked",
    image: island1,
    stars: 0,
  },
  {
    id: "grade2",
    name: "Ocean Floor",
    description: "Dive deep into two-digit addition and time",
    modalDescription: "Welcome to Ocean Floor! 🌊 Dive deep into two-digit addition, telling time, and working with money!",
    grade: 2,
    domain: "Numbers & Operations",
    status: "unlocked",
    image: island2,
    stars: 0,
  },
  {
    id: "grade3",
    name: "Volcano Island",
    description: "Explore multiplication, fractions, and area",
    modalDescription: "Welcome to Volcano Island! 🌋 Get ready for explosive adventures in multiplication, fractions, and calculating area!",
    grade: 3,
    domain: "Multiplication & Fractions",
    status: "unlocked",
    image: island3,
    stars: 0,
  },
  {
    id: "grade4",
    name: "Lost Temples",
    description: "Master multi-digit multiplication",
    modalDescription: "Welcome to Lost Temples! 🏛️ Explore the Multiplication Mines and unlock the secrets of multi-digit multiplication!",
    grade: 4,
    domain: "Number & Operations in Base Ten",
    status: "unlocked",
    image: grade4Mine,
    stars: 0,
  },
  {
    id: "grade5",
    name: "Ancient Ruins",
    description: "Conquer fractions with unlike denominators",
    modalDescription: "Welcome to Ancient Ruins! 🏺 Navigate the Fraction Asteroid Field and master adding and subtracting fractions!",
    grade: 5,
    domain: "Number & Operations—Fractions",
    status: "unlocked",
    image: grade5Space,
    stars: 0,
  },
  {
    id: "grade6",
    name: "Space Stations",
    description: "Unlock the power of ratios and proportions",
    modalDescription: "Welcome to Space Stations! 🚀 Step into the Ratio Research Lab and discover the power of proportional reasoning!",
    grade: 6,
    domain: "Ratios and Proportional Relationships",
    status: "unlocked",
    image: grade6Lab,
    stars: 0,
  },
];

export function WorldMap() {
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [islands, setIslands] = useState<Island[]>(baseIslands);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Fetch user progress
      const fetchProgress = async () => {
        const { data } = await supabase
          .from("progress")
          .select("*")
          .eq("user_id", user.id);

        if (data) {
          const progressMap: Record<string, number> = {};
          data.forEach((p) => {
            progressMap[p.level_id] = p.score;
          });
          setProgress(progressMap);
        }
      };
      fetchProgress();
    }
  }, [user]);

  const handleIslandClick = (island: Island) => {
    if (island.status !== "locked") {
      setSelectedIsland(island);
    }
  };

  const handleStartAdventure = (level: Level) => {
    setSelectedLevel(level);
    setSelectedIsland(null);
    setIsPlaying(true);
  };

  const handleLevelComplete = (score: number) => {
    setIsPlaying(false);
    if (selectedLevel && profile) {
      // Navigate to summary page using React Router
      navigate('/summary', {
        state: {
          score,
          totalProblems: 10,
          levelId: selectedLevel.id,
          grade: profile.grade,
          difficulty: selectedLevel.difficulty,
          levelTitle: selectedLevel.title,
        }
      });
    }
    setSelectedLevel(null);
  };

  const handleLevelExit = () => {
    setIsPlaying(false);
    setSelectedLevel(null);
  };

  const getLevelsForIsland = (islandId: string): Level[] => {
    switch (islandId) {
      case "grade1":
        return grade1Levels;
      case "grade2":
        return grade2Levels;
      case "grade3":
        return grade3Levels;
      case "grade4":
        return grade4Levels;
      case "grade5":
        return grade5Levels;
      case "grade6":
        return grade6Levels;
      default:
        return [];
    }
  };

  const isLevelUnlocked = (islandId: string, difficulty: string): boolean => {
    if (difficulty === "easy") return true;
    
    const levels = getLevelsForIsland(islandId);
    const prevDifficulty = difficulty === "medium" ? "easy" : "medium";
    const prevLevel = levels.find((l) => l.difficulty === prevDifficulty);
    
    if (!prevLevel) return false;
    const prevScore = progress[prevLevel.id];
    return prevScore !== undefined && prevScore >= 8; // 80% or higher
  };

  if (isPlaying && selectedLevel) {
    return (
      <LevelPlayer
        level={selectedLevel}
        onComplete={handleLevelComplete}
        onExit={handleLevelExit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-ocean py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-primary-foreground mb-4">
            Math Island Adventure
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Choose your next adventure and master new math skills!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {islands.map((island, index) => (
            <div
              key={island.id}
              className="animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleIslandClick(island)}
            >
              <IslandCard
                variant={
                  island.status === "locked"
                    ? "locked"
                    : island.status === "completed"
                    ? "completed"
                    : "default"
                }
              >
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img
                      src={island.image}
                      alt={island.name}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-300",
                        island.status === "unlocked" && "hover:scale-110"
                      )}
                    />
                    {island.status === "locked" && (
                      <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                        <Lock className="w-16 h-16 text-background" />
                      </div>
                    )}
                    {island.status === "completed" && (
                      <div className="absolute top-2 right-2 bg-secondary rounded-full p-2">
                        <Trophy className="w-6 h-6 text-secondary-foreground" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-1">
                      {island.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Grade {island.grade} • {island.domain}
                    </p>
                    <p className="text-card-foreground/80">{island.description}</p>
                  </div>

                  {island.status === "completed" && (
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-6 h-6",
                            i < island.stars
                              ? "fill-accent text-accent"
                              : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    variant={island.status === "unlocked" ? "default" : "secondary"}
                    disabled={island.status === "locked"}
                  >
                    {island.status === "locked"
                      ? "Locked"
                      : island.status === "completed"
                      ? "Play Again"
                      : "Start Adventure"}
                  </Button>
                </div>
              </IslandCard>
            </div>
          ))}
        </div>

        {/* Island Details Modal */}
        <Dialog open={!!selectedIsland} onOpenChange={() => setSelectedIsland(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-3xl">
                <Sparkles className="w-8 h-8 text-accent" />
                {selectedIsland?.name}
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                {selectedIsland?.modalDescription}
              </DialogDescription>
            </DialogHeader>

            {selectedIsland && (
              <div className="space-y-4 pt-4">
                <h4 className="font-semibold text-lg">Choose Your Challenge:</h4>
                <div className="grid gap-3">
                  {getLevelsForIsland(selectedIsland.id).map((level) => {
                    const isUnlocked = isLevelUnlocked(selectedIsland.id, level.difficulty);
                    const score = progress[level.id];
                    const hasPassed = score !== undefined && score >= 8;

                    return (
                      <Button
                        key={level.id}
                        onClick={() => handleStartAdventure(level)}
                        variant="outline"
                        className="justify-start h-auto py-4"
                        disabled={!isUnlocked}
                      >
                        <div className="text-left flex-1">
                          <div className="font-bold text-lg capitalize flex items-center gap-2">
                            {level.difficulty} - {level.title}
                            {!isUnlocked && <Lock className="w-4 h-4" />}
                            {hasPassed && <Trophy className="w-4 h-4 text-accent" />}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {level.objective}
                            {score !== undefined && (
                              <span className="ml-2">• Best: {score}/10</span>
                            )}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
