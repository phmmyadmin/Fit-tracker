import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('xyzcompany'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function fetchProfiles() {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching profiles:', err);
    return [];
  }
}

export async function saveProfile(profile) {
  if (!supabase) return null;
  try {
    // Si no tiene id, lo insertamos
    if (!profile.id) {
      const { data, error } = await supabase.from('profiles').insert(profile).select().single();
      if (error) throw error;
      return data;
    }
    // Si tiene id, hacemos update
    const { data, error } = await supabase.from('profiles').update(profile).eq('id', profile.id).select().single();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error saving profile:', err);
    return null;
  }
}

export async function fetchDailyLogsFromSupabase(profileId) {
  if (!supabase || !profileId) return null;

  try {
    const { data: logs, error: logsErr } = await supabase
      .from('daily_logs')
      .select('*, intakes(*)')
      .eq('profile_id', profileId);

    if (logsErr) throw logsErr;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .maybeSingle();

    const { data: weights } = await supabase
      .from('weight_logs')
      .select('*')
      .eq('profile_id', profileId)
      .order('date', { ascending: true });

    const formattedLogs = (logs || []).map(l => {
      // Sort intakes by created_at ascending
      const rawIntakes = [...(l.intakes || [])].sort((a, b) => 
        (a.created_at || '').localeCompare(b.created_at || '')
      );

      return {
        date: l.date,
        intakes: rawIntakes.map(i => ({
          id: i.id,
          time: i.time || '12:00',
          name: i.name,
          dishName: i.dish_name,
          quantity: i.quantity,
          unit: i.unit,
          category: i.category || 'other',
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
      };
    });

    // Sort logs by date ascending
    formattedLogs.sort((a, b) => a.date.localeCompare(b.date));

    return {
      userProfile: {
        targetMacros: {
          calories: profile?.target_calories || 2000,
          protein: profile?.target_protein || 150,
          carbs: profile?.target_carbs || 200,
          fats: profile?.target_fats || 60
        },
        weightLog: {
          startWeight: profile?.weight || 70.0,
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

export async function saveIntakesToSupabase({ date, items, profileId }) {
  if (!supabase || !profileId) return null;

  try {
    let { data: dayLog } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('date', date)
      .eq('profile_id', profileId)
      .maybeSingle();

    if (!dayLog) {
      const { data: newLog, error: createErr } = await supabase
        .from('daily_logs')
        .insert({ date, profile_id: profileId, calories: 0, protein: 0, carbs: 0, fats: 0 })
        .select()
        .single();
      if (createErr) throw createErr;
      dayLog = newLog;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const intakeRows = items.map(i => ({
      daily_log_id: dayLog.id,
      profile_id: profileId,
      date: date,
      time: timeStr,
      name: i.name,
      dish_name: i.dishName || null,
      quantity: i.quantity || 1,
      unit: i.unit || 'porcion',
      category: i.category || 'other',
      calories: i.calories || i.macros?.calories || 0,
      protein: i.protein || i.macros?.protein || 0,
      carbs: i.carbs || i.macros?.carbs || 0,
      fats: i.fats || i.macros?.fats || 0
    }));

    const { error: insertErr } = await supabase.from('intakes').insert(intakeRows);
    if (insertErr) throw insertErr;

    await updateDailyLogTotals(date, profileId);

    return { success: true, addedItems: items };
  } catch (err) {
    console.error('Supabase save error:', err);
    return null;
  }
}

export async function saveWeightToSupabase({ date, time, weight, profileId }) {
  if (!supabase || !profileId) return null;

  try {
    const entryTime = time || '08:00';
    await supabase.from('weight_logs').delete().eq('date', date).eq('time', entryTime).eq('profile_id', profileId);
    
    const { error } = await supabase
      .from('weight_logs')
      .insert({ date, time: entryTime, weight: parseFloat(weight), profile_id: profileId });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase weight save error:', err);
    return null;
  }
}

export async function deleteWeightFromSupabase({ date, time, profileId }) {
  if (!supabase || !profileId) return null;

  try {
    const query = supabase.from('weight_logs').delete().eq('date', date).eq('profile_id', profileId);
    if (time) query.eq('time', time);
    const { error } = await query;
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Supabase weight delete error:', err);
    return null;
  }
}

export async function deleteIntakeFromSupabase({ date, index, item, profileId }) {
  if (!supabase || !profileId) return null;

  try {
    let targetId = item?.id;

    if (!targetId) {
      const { data: dayLog } = await supabase
        .from('daily_logs')
        .select('*, intakes(*)')
        .eq('date', date)
        .eq('profile_id', profileId)
        .maybeSingle();

      if (!dayLog || !dayLog.intakes) return null;

      const sorted = [...dayLog.intakes].sort((a, b) => 
        (a.created_at || '').localeCompare(b.created_at || '')
      );
      if (sorted[index]) {
        targetId = sorted[index].id;
      }
    }

    if (!targetId) return null;

    const { error: delErr } = await supabase
      .from('intakes')
      .delete()
      .eq('id', targetId);

    if (delErr) throw delErr;

    await updateDailyLogTotals(date, profileId);

    return { success: true };
  } catch (err) {
    console.error('Supabase delete intake error:', err);
    return null;
  }
}

export async function updateIntakeInSupabase({ date, index, item, quantity, macros, category, time, profileId }) {
  if (!supabase || !profileId) return null;

  try {
    let targetId = item?.id;

    if (!targetId) {
      const { data: dayLog } = await supabase
        .from('daily_logs')
        .select('*, intakes(*)')
        .eq('date', date)
        .eq('profile_id', profileId)
        .maybeSingle();

      if (!dayLog || !dayLog.intakes) return null;

      const sorted = [...dayLog.intakes].sort((a, b) => 
        (a.created_at || '').localeCompare(b.created_at || '')
      );
      if (sorted[index]) {
        targetId = sorted[index].id;
      }
    }

    if (!targetId) return null;

    const updatePayload = {
      quantity: quantity,
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats
    };

    if (category) updatePayload.category = category;
    if (time) updatePayload.time = time;

    const { error: updateErr } = await supabase
      .from('intakes')
      .update(updatePayload)
      .eq('id', targetId);

    if (updateErr) throw updateErr;

    await updateDailyLogTotals(date, profileId);

    return { success: true };
  } catch (err) {
    console.error('Supabase update intake error:', err);
    return null;
  }
}

async function updateDailyLogTotals(date, profileId) {
  const { data: allIntakes } = await supabase
    .from('intakes')
    .select('*')
    .eq('date', date)
    .eq('profile_id', profileId);

  const totals = (allIntakes || []).reduce((acc, curr) => ({
    calories: Math.round(acc.calories + curr.calories),
    protein: Math.round((acc.protein + curr.protein) * 10) / 10,
    carbs: Math.round((acc.carbs + curr.carbs) * 10) / 10,
    fats: Math.round((acc.fats + curr.fats) * 10) / 10
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  await supabase
    .from('daily_logs')
    .update(totals)
    .eq('date', date)
    .eq('profile_id', profileId);
}
