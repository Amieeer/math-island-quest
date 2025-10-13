import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/game/Hero";
import { Features } from "@/components/game/Features";
import { ProblemDemo } from "@/components/game/ProblemDemo";
import { WorldMap } from "@/components/game/WorldMap";
import { Button } from "@/components/ui/button";
import { Anchor } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              Math Island
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">Made by: Amier Ibrahim</span>
            <Button variant="ghost" onClick={() => navigate("/parents")}>
              For Parents
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Interactive Demo */}
      <ProblemDemo />

      {/* World Map Preview */}
      <section id="world-map" className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Explore Amazing Islands
          </h2>
          <p className="text-xl text-muted-foreground">
            Each island offers unique challenges aligned with your grade level
          </p>
        </div>
      </section>
      
      <WorldMap />

      {/* Footer */}
      <footer className="bg-gradient-ocean py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Anchor className="w-8 h-8 text-primary-foreground" />
            <span className="text-2xl font-bold text-primary-foreground">
              Math Island Adventure
            </span>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            Making math learning an adventure, one island at a time
          </p>
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Math Island Adventure. Aligned with Massachusetts Curriculum Frameworks.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
