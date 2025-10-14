-- Add XP and level system to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;

-- Create index on progress.completed_at for heatmap performance
CREATE INDEX IF NOT EXISTS idx_progress_completed_at ON public.progress(completed_at);

-- Create function to calculate XP for a level
CREATE OR REPLACE FUNCTION public.calculate_level_xp(
  p_difficulty TEXT,
  p_score INTEGER,
  p_total_problems INTEGER
)
RETURNS INTEGER AS $$
DECLARE
  base_xp INTEGER;
  bonus_xp INTEGER := 0;
BEGIN
  -- Base XP by difficulty
  CASE p_difficulty
    WHEN 'easy' THEN base_xp := 10;
    WHEN 'medium' THEN base_xp := 25;
    WHEN 'hard' THEN base_xp := 50;
    ELSE base_xp := 0;
  END CASE;
  
  -- Bonus for perfect score
  IF p_score = p_total_problems THEN
    bonus_xp := 10;
  END IF;
  
  RETURN base_xp + bonus_xp;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate required XP for next level
CREATE OR REPLACE FUNCTION public.calculate_next_level_xp(current_level INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Formula: 100 * (currentLevel ^ 1.1)
  RETURN FLOOR(100 * POWER(current_level, 1.1));
END;
$$ LANGUAGE plpgsql;

-- Create function to update user XP and level
CREATE OR REPLACE FUNCTION public.update_user_xp(
  p_user_id UUID,
  p_xp_earned INTEGER
)
RETURNS TABLE(new_xp INTEGER, new_level INTEGER, level_up BOOLEAN) AS $$
DECLARE
  current_xp INTEGER;
  current_level INTEGER;
  new_total_xp INTEGER;
  calculated_level INTEGER;
  xp_for_next_level INTEGER;
BEGIN
  -- Get current values
  SELECT xp, level INTO current_xp, current_level
  FROM public.profiles
  WHERE user_id = p_user_id;
  
  -- Calculate new total XP
  new_total_xp := current_xp + p_xp_earned;
  
  -- Calculate new level (max 50)
  calculated_level := current_level;
  WHILE calculated_level < 50 LOOP
    xp_for_next_level := calculate_next_level_xp(calculated_level);
    IF new_total_xp >= xp_for_next_level THEN
      calculated_level := calculated_level + 1;
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  -- Update profile
  UPDATE public.profiles
  SET xp = new_total_xp, level = calculated_level
  WHERE user_id = p_user_id;
  
  -- Return results
  RETURN QUERY SELECT new_total_xp, calculated_level, (calculated_level > current_level);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;