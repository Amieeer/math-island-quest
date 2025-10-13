import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroIsland from "@/assets/hero-island.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroIsland})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border-2 border-secondary/30">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-foreground">
              Educational Adventure for Grades 1-6
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground drop-shadow-lg">
            Math Island
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-hero">
              Adventure
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow">
            Embark on an exciting journey through tropical islands! 
            Master math skills while exploring vibrant worlds filled with challenges and rewards.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-island"
            >
              Start Your Adventure
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 shadow-card-soft"
            >
              Explore Islands
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-accent/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
        
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-20 h-20 bg-secondary/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
            <span className="text-3xl">⭐</span>
          </div>
        </div>
      </div>
    </section>
  );
}
