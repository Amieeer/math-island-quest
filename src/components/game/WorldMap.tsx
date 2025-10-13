import { IslandCard } from "@/components/ui/island-card";
import { Button } from "@/components/ui/button";
import { Lock, Star, Trophy } from "lucide-react";
import island1 from "@/assets/island-1.png";
import island2 from "@/assets/island-2.png";
import island3 from "@/assets/island-3.png";

interface Island {
  id: string;
  name: string;
  description: string;
  grade: number;
  domain: string;
  status: "unlocked" | "locked" | "completed";
  image: string;
  stars: number;
}

const islands: Island[] = [
  {
    id: "1",
    name: "Number Beach",
    description: "Master counting and basic operations",
    grade: 2,
    domain: "Numbers & Operations",
    status: "completed",
    image: island1,
    stars: 3,
  },
  {
    id: "2",
    name: "Fraction Falls",
    description: "Dive into fractions and decimals",
    grade: 3,
    domain: "Fractions",
    status: "unlocked",
    image: island2,
    stars: 0,
  },
  {
    id: "3",
    name: "Volcano Valley",
    description: "Challenge yourself with advanced problems",
    grade: 4,
    domain: "Algebra",
    status: "locked",
    image: island3,
    stars: 0,
  },
];

export function WorldMap() {
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
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
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
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
