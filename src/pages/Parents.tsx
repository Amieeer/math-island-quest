import { Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Parents() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-ocean">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              Math Island
            </span>
          </div>
          <Button onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Parent Dashboard & Resources
          </h1>
          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-12 shadow-elegant animate-scale-in">
            <p className="text-2xl text-muted-foreground mb-4">
              Coming Soon!
            </p>
            <p className="text-lg text-muted-foreground">
              We're building helpful tools for you to track your child's progress, view detailed analytics, and customize their learning experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}