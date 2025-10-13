import { IslandCard } from "@/components/ui/island-card";
import { BookOpen, Target, Trophy, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Aligned Curriculum",
    description: "Content perfectly matched to Massachusetts math standards for grades 1-6",
    gradient: "gradient-island",
  },
  {
    icon: Target,
    title: "Adaptive Learning",
    description: "Problems adjust to your child's skill level for optimal challenge",
    gradient: "gradient-ocean",
  },
  {
    icon: Trophy,
    title: "Earn Rewards",
    description: "Unlock achievements, collect stars, and progress through exciting islands",
    gradient: "gradient-sunset",
    glow: true,
    iconColor: "text-yellow-400",
  },
  {
    icon: Sparkles,
    title: "Interactive Tools",
    description: "Hands-on visual tools make abstract concepts come alive",
    gradient: "gradient-hero",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Why Math Island Adventure?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learning math has never been this engaging. Our platform combines education with adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IslandCard className="h-full hover:scale-105 transition-transform duration-300">
                  <div className="space-y-4">
                    <div className={`w-16 h-16 rounded-xl bg-${feature.gradient} flex items-center justify-center shadow-island ${feature.glow ? 'animate-pulse shadow-glow' : ''}`}>
                      <Icon className={`w-8 h-8 ${(feature as any).iconColor || 'text-primary-foreground'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </IslandCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
