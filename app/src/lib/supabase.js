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
      .limit(1)
      .maybeSingle();

    const { data: weights } = await supabase
      .from('weight_logs')
      .select('*')
      .order('date', { ascending: true });

    const formattedLogs = (logs || []).map(l => ({
      date: l.date,
      intakes: (l.intakes || []).map(i => ({
        time: i.time || '12:00',
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

    // Sort logs by date ascending
    formattedLogs.sort((a, b) => a.date.localeCompare(b.date));

    return {
      userProfile: {
        targetMacros: profile?.target_macros || { calories: 1950, protein: 145, carbs: 195, fats: 65 },
        maintenanceCalories: profile?.maintenance_calories || 2450,
        weightLog: {
          startWeight: profile?.start_weight || 73.0,
          targetWeight: profile?.target_weight || 68.0,
          history: (weights || []).map(w => ({ date: w.date, time: w.time || '08:00', weight: w.weight }))
        }
      },
      dailyLogs: formattedLogs
    };
  } catch (err) {
    console.error('Supabase fetch error:', err);
    return null;
  }
}

export async function saveIntakesToSupabase({ date, items }) {
  if (!supabase) return null;

  try {
    // 1. Ensure daily_log exists
    let { data: dayLog } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('date', date)
      .maybeSingle();

    if (!dayLog) {
      const { data: newLog, error: createErr } = await supabase
        .from('daily_logs')
        .insert({ date, calories: 0, protein: 0, carbs: 0, fats: 0 })
        .select()
        .single();
      if (createErr) throw createErr;
      dayLog = newLog;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // 2. Insert intakes
    const intakeRows = items.map(i => ({
      daily_log_id: dayLog.id,
      date: date,
      time: timeStr,
      name: i.name,
      dish_name: i.dishName || null,
      quantity: i.quantity || 1,
      unit: i.unit || 'porcion',
      calories: i.calories || i.macros?.calories || 0,
      protein: i.protein || i.macros?.protein || 0,
      carbs: i.carbs || i.macros?.carbs || 0,
      fats: i.fats || i.macros?.fats || 0
    }));

    const { error: insertErr } = await supabase.from('intakes').insert(intakeRows);
    if (insertErr) throw insertErr;

    // 3. Recalculate daily totals
    const { data: allIntakes } = await supabase
      .from('intakes')
      .select('*')
      .eq('date', date);

    const totals = (allIntakes || []).reduce((acc, curr) => ({
      calories: Math.round(acc.calories + curr.calories),
      protein: Math.round((acc.protein + curr.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + curr.carbs) * 10) / 10,
      fats: Math.round((acc.fats + curr.fats) * 10) / 10
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    await supabase
      .from('daily_logs')
      .update(totals)
      .eq('date', date);

    return { success: true, addedItems: items };
  } catch (err) {
    console.error('Supabase save error:', err);
    return null;
  }
}

export async function saveWeightToSupabase({ date, time, weight }) {
  if (!supabase) return null;

  try {
    const entryTime = time || '08:00';
    const { error } = await supabase
      .from('weight_logs')
      .upsert({ date, time: entryTime, weight: parseFloat(weight) }, { onConflict: 'date,time' });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase weight save error:', err);
    return null;
  }
}

export async function deleteWeightFromSupabase({ date, time }) {
  if (!supabase) return null;

  try {
    const query = supabase.from('weight_logs').delete().eq('date', date);
    if (time) query.eq('time', time);
    const { error } = await query;
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase weight delete error:', err);
    return null;
  }
}

export async function deleteIntakeFromSupabase({ date, index }) {
  if (!supabase) return null;

  try {
    const { data: dayLog } = await supabase
      .from('daily_logs')
      .select('*, intakes(*)')
      .eq('date', date)
      .maybeSingle();

    if (!dayLog || !dayLog.intakes || !dayLog.intakes[index]) return null;

    const intakeToDelete = dayLog.intakes[index];
    const { error: delErr } = await supabase
      .from('intakes')
      .delete()
      .eq('id', intakeToDelete.id);

    if (delErr) throw delErr;

    // Recalculate daily totals
    const { data: remainingIntakes } = await supabase
      .from('intakes')
      .select('*')
      .eq('date', date);

    const totals = (remainingIntakes || []).reduce((acc, curr) => ({
      calories: Math.round(acc.calories + curr.calories),
      protein: Math.round((acc.protein + curr.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + curr.carbs) * 10) / 10,
      fats: Math.round((acc.fats + curr.fats) * 10) / 10
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    await supabase
      .from('daily_logs')
      .update(totals)
      .eq('date', date);

    return { success: true };
  } catch (err) {
    console.error('Supabase delete intake error:', err);
    return null;
  }
}
