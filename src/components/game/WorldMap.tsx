import { useState } from "react";
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
import { grade1Levels } from "@/data/grade1-levels";
import island1 from "@/assets/island-1.png";
import island2 from "@/assets/island-2.png";
import island3 from "@/assets/island-3.png";

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

const islands: Island[] = [
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
    id: "2",
    name: "Number Beach",
    description: "Master counting and basic operations",
    modalDescription: "Welcome to Number Beach! 🌊 Dive into the world of numbers and operations. Practice your counting skills and become a math champion!",
    grade: 2,
    domain: "Numbers & Operations",
    status: "locked",
    image: island2,
    stars: 0,
  },
  {
    id: "3",
    name: "Fraction Falls",
    description: "Dive into fractions and decimals",
    modalDescription: "Welcome to Fraction Falls! 💧 Explore the amazing world of fractions and decimals. Split things up and put them back together!",
    grade: 3,
    domain: "Fractions",
    status: "locked",
    image: island3,
    stars: 0,
  },
  {
    id: "4",
    name: "Volcano Valley",
    description: "Challenge yourself with advanced problems",
    modalDescription: "Welcome to Volcano Valley! 🌋 Get ready for explosive adventures in multiplication, division, and algebraic thinking!",
    grade: 4,
    domain: "Algebra",
    status: "locked",
    image: island1,
    stars: 0,
  },
];

export function WorldMap() {
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleIslandClick = (island: Island) => {
    if (island.status !== "locked") {
      setSelectedIsland(island);
    }
  };

  const handleStartAdventure = () => {
    setSelectedIsland(null);
    setIsPlaying(true);
  };

  const handleLevelComplete = (score: number) => {
    setIsPlaying(false);
    setSelectedLevel(null);
    // TODO: Save progress to backend
    console.log("Level completed with score:", score);
  };

  const handleLevelExit = () => {
    setIsPlaying(false);
    setSelectedLevel(null);
  };

  const currentLevel = selectedLevel
    ? grade1Levels.find((l) => l.id === selectedLevel)
    : null;

  if (isPlaying && currentLevel) {
    return (
      <LevelPlayer
        level={currentLevel}
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

            {selectedIsland?.id === "grade1" && (
              <div className="space-y-4 pt-4">
                <h4 className="font-semibold text-lg">Choose Your Challenge:</h4>
                <div className="grid gap-3">
                  {grade1Levels.map((level) => (
                    <Button
                      key={level.id}
                      onClick={() => {
                        setSelectedLevel(level.id);
                        handleStartAdventure();
                      }}
                      variant="outline"
                      className="justify-start h-auto py-4"
                    >
                      <div className="text-left">
                        <div className="font-bold text-lg capitalize">
                          {level.difficulty} - {level.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {level.objective}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {selectedIsland?.id !== "grade1" && (
              <div className="pt-4">
                <Button className="w-full" size="lg" disabled>
                  Coming Soon!
                </Button>
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
