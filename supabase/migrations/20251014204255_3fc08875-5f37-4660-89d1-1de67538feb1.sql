-- Fix search_path for security functions
DROP FUNCTION IF EXISTS public.calculate_level_xp(TEXT, INTEGER, INTEGER);
DROP FUNCTION IF EXISTS public.calculate_next_level_xp(INTEGER);

CREATE OR REPLACE FUNCTION public.calculate_level_xp(
  p_difficulty TEXT,
  p_score INTEGER,
  p_total_problems INTEGER
)
RETURNS INTEGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.calculate_next_level_xp(current_level INTEGER)
RETURNS INTEGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Formula: 100 * (currentLevel ^ 1.1)
  RETURN FLOOR(100 * POWER(current_level, 1.1));
END;
$$;