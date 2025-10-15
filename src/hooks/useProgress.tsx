import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

interface ProgressData {
  level_id: string;
  grade: number;
  difficulty: string;
  score: number;
  completed_at: string;
}

interface XPResult {
  new_xp: number;
  new_level: number;
  level_up: boolean;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching progress:", error);
    } else {
      setProgress(data || []);
    }
    setLoading(false);
  };

  const saveProgress = async (
    levelId: string,
    grade: number,
    difficulty: "easy" | "medium" | "hard",
    score: number,
    totalProblems: number
  ): Promise<{ xpEarned: number; levelUp: boolean; newLevel: number } | null> => {
    if (!user) return null;

    try {
      // Save progress first - upsert with conflict resolution
      const { error: progressError } = await supabase
        .from("progress")
        .upsert(
          {
            user_id: user.id,
            level_id: levelId,
            grade: grade,
            difficulty: difficulty,
            score: score,
          },
          {
            onConflict: 'user_id,level_id'
          }
        );

      if (progressError) {
        console.error("Error saving progress:", progressError);
        toast.error("Failed to save progress");
        return null;
      }

      // Calculate XP if passed (>= 80%)
      const percentage = (score / totalProblems) * 100;
      if (percentage >= 80) {
        const { data: xpData, error: xpError } = await supabase.rpc(
          "calculate_level_xp",
          {
            p_difficulty: difficulty,
            p_score: score,
            p_total_problems: totalProblems,
          }
        );

        if (xpError || !xpData) {
          console.error("Error calculating XP:", xpError);
          return null;
        }

        const xpEarned = xpData as number;

        // Update user XP and level
        const { data: updateData, error: updateError } = await supabase.rpc(
          "update_user_xp",
          {
            p_user_id: user.id,
            p_xp_earned: xpEarned,
          }
        );

        if (updateError || !updateData) {
          console.error("Error updating XP:", updateError);
          return null;
        }

        const result = updateData[0] as XPResult;

        // Show XP toast
        toast.success(`+${xpEarned} XP Earned!`, {
          description: result.level_up
            ? `You leveled up to Level ${result.new_level}! 🎉`
            : `Total XP: ${result.new_xp}`,
        });

        await fetchProgress();

        return {
          xpEarned,
          levelUp: result.level_up,
          newLevel: result.new_level,
        };
      }

      await fetchProgress();
      return null;
    } catch (error) {
      console.error("Error in saveProgress:", error);
      toast.error("Failed to save progress");
      return null;
    }
  };

  const getHeatmapData = async (year: number, month: number) => {
    if (!user) return [];

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const { data, error } = await supabase
      .from("progress")
      .select("completed_at")
      .eq("user_id", user.id)
      .gte("completed_at", startDate.toISOString())
      .lte("completed_at", endDate.toISOString());

    if (error) {
      console.error("Error fetching heatmap data:", error);
      return [];
    }

    // Group by date and count
    const heatmapData: { [key: string]: number } = {};
    data?.forEach((item) => {
      const date = new Date(item.completed_at).toISOString().split("T")[0];
      heatmapData[date] = (heatmapData[date] || 0) + 1;
    });

    return Object.entries(heatmapData).map(([date, count]) => ({
      date,
      count,
    }));
  };

  return {
    progress,
    loading,
    saveProgress,
    getHeatmapData,
    refetch: fetchProgress,
  };
};
