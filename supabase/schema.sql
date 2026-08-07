-- Schema SQL para Supabase (Fit Tracker V2)

CREATE TABLE IF NOT EXISTS public.foods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    calories_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    protein_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    carbs_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    fats_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.daily_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.intakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    daily_log_id UUID REFERENCES public.daily_logs(id) ON DELETE CASCADE,
    food_id UUID REFERENCES public.foods(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    grams NUMERIC(6,2) NOT NULL DEFAULT 100,
    calories NUMERIC(6,2) NOT NULL DEFAULT 0,
    protein NUMERIC(6,2) NOT NULL DEFAULT 0,
    carbs NUMERIC(6,2) NOT NULL DEFAULT 0,
    fats NUMERIC(6,2) NOT NULL DEFAULT 0,
    time TEXT NOT NULL DEFAULT '12:00',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices para alto rendimiento
CREATE INDEX IF NOT EXISTS idx_daily_logs_date ON public.daily_logs(date);
CREATE INDEX IF NOT EXISTS idx_intakes_daily_log ON public.intakes(daily_log_id);
CREATE INDEX IF NOT EXISTS idx_foods_name ON public.foods(name);
