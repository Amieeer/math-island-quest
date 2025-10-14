import { useAuth } from "@/hooks/useAuth";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const XPProgressBar = () => {
  const { profile } = useAuth();
  const [nextLevelXP, setNextLevelXP] = useState<number>(100);

  useEffect(() => {
    const fetchNextLevelXP = async () => {
      if (!profile) return;

      const { data, error } = await supabase.rpc("calculate_next_level_xp", {
        current_level: profile.level || 1,
      });

      if (!error && data) {
        setNextLevelXP(data as number);
      }
    };

    fetchNextLevelXP();
  }, [profile?.level]);

  if (!profile) return null;

  const currentXP = profile.xp || 0;
  const currentLevel = profile.level || 1;
  const progress = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-foreground">
            Level {currentLevel}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentXP} / {nextLevelXP} XP
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
