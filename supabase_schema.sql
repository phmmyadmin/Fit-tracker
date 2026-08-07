-- ==========================================
-- SUPABASE SCHEMA FOR FIT TRACKER APP
-- ==========================================

-- 1. Tabla de Perfil de Usuario
CREATE TABLE IF NOT EXISTS public.user_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_macros JSONB DEFAULT '{"calories": 1950, "protein": 145, "carbs": 195, "fats": 65}'::jsonb,
  maintenance_calories INT DEFAULT 2450,
  start_weight NUMERIC DEFAULT 73.0,
  target_weight NUMERIC DEFAULT 68.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar perfil inicial por defecto si no existe
INSERT INTO public.user_profile (maintenance_calories, start_weight, target_weight)
SELECT 2450, 73.0, 68.0
WHERE NOT EXISTS (SELECT 1 FROM public.user_profile);

-- 2. Tabla de Registros Diarios (Daily Logs)
CREATE TABLE IF NOT EXISTS public.daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  calories NUMERIC DEFAULT 0,
  protein NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fats NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabla de Ingestas / Alimentos (Intakes)
CREATE TABLE IF NOT EXISTS public.intakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_log_id UUID REFERENCES public.daily_logs(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TEXT DEFAULT '12:00',
  name TEXT NOT NULL,
  dish_name TEXT,
  quantity NUMERIC DEFAULT 1,
  unit TEXT DEFAULT 'porcion',
  calories NUMERIC DEFAULT 0,
  protein NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fats NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla de Pesajes (Weight Logs)
CREATE TABLE IF NOT EXISTS public.weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time TEXT DEFAULT '08:00',
  weight NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date, time)
);

-- Habilitar Row Level Security (RLS) con acceso de lectura y escritura público para prototipo
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read/Write Profile" ON public.user_profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Logs" ON public.daily_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Intakes" ON public.intakes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Weights" ON public.weight_logs FOR ALL USING (true) WITH CHECK (true);
