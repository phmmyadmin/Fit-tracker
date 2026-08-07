import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('xyzcompany'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function fetchDailyLogsFromSupabase() {
  if (!supabase) return null;

  try {
    const { data: logs, error: logsErr } = await supabase
      .from('daily_logs')
      .select('*, intakes(*)');

    if (logsErr) throw logsErr;

    const { data: profile } = await supabase
      .from('user_profile')
      .select('*')
      .single();

    const { data: weights } = await supabase
      .from('weight_logs')
      .select('*')
      .order('date', { ascending: true });

    const formattedLogs = logs.map(l => ({
      date: l.date,
      intakes: (l.intakes || []).map(i => ({
        time: i.time,
        name: i.name,
        dishName: i.dish_name,
        quantity: i.quantity,
        unit: i.unit,
        macros: {
          calories: i.calories,
          protein: i.protein,
          carbs: i.carbs,
          fats: i.fats
        }
      })),
      dailyTotals: {
        calories: l.calories,
        protein: l.protein,
        carbs: l.carbs,
        fats: l.fats
      }
    }));

    return {
      userProfile: {
        targetMacros: profile?.target_macros || { calories: 1950, protein: 145, carbs: 195, fats: 65 },
        maintenanceCalories: profile?.maintenance_calories || 2450,
        weightLog: {
          startWeight: profile?.start_weight || 73.0,
          targetWeight: profile?.target_weight || 68.0,
          history: (weights || []).map(w => ({ date: w.date, time: w.time, weight: w.weight }))
        }
      },
      dailyLogs: formattedLogs
    };
  } catch (err) {
    console.error('Supabase fetch error:', err);
    return null;
  }
}
