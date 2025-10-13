import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IslandCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "locked" | "completed";
}

export function IslandCard({ children, className, variant = "default" }: IslandCardProps) {
  const variants = {
    default: "bg-card hover:shadow-island transition-all duration-300 hover:scale-105",
    locked: "bg-muted opacity-60 cursor-not-allowed",
    completed: "bg-gradient-island shadow-glow border-secondary",
  };

  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-6 shadow-card-soft",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
