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

    const intakeRows = items.map(i => {
      const isGramCategory = ['meat','grains','tubers','legumes','vegetables','healthy_fats'].includes(i.category);
      const resolvedUnit = (i.unit && i.unit !== 'porcion') 
        ? i.unit 
        : ((i.quantity && i.quantity > 5) || isGramCategory ? 'g' : 'ud');

      return {
        daily_log_id: dayLog.id,
        profile_id: profileId,
        date: date,
        time: timeStr,
        name: i.name,
        dish_name: i.dishName || null,
        quantity: i.quantity || (resolvedUnit === 'g' ? 100 : 1),
        unit: resolvedUnit,
        category: i.category || 'other',
        calories: i.calories || i.macros?.calories || 0,
        protein: i.protein || i.macros?.protein || 0,
        carbs: i.carbs || i.macros?.carbs || 0,
        fats: i.fats || i.macros?.fats || 0
      };
    });

    const { error: insertErr } = await supabase.from('intakes').insert(intakeRows);
    if (insertErr) throw insertErr;

    await updateDailyLogTotals(date, profileId);
    await saveToCatalog(items);

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

export async function deleteIntakesGroupFromSupabase({ date, items, profileId }) {
  if (!supabase || !profileId || !items || items.length === 0) return null;

  try {
    const idsToDelete = items.map(i => i.id).filter(Boolean);

    if (idsToDelete.length > 0) {
      const { error } = await supabase.from('intakes').delete().in('id', idsToDelete);
      if (error) throw error;
    } else {
      const timeVal = items[0].time;
      const dishVal = items[0].dishName;
      let query = supabase.from('intakes').delete().eq('date', date).eq('profile_id', profileId);
      if (timeVal) query = query.eq('time', timeVal);
      if (dishVal) query = query.eq('dish_name', dishVal);
      const { error } = await query;
      if (error) throw error;
    }

    await updateDailyLogTotals(date, profileId);
    return { success: true };
  } catch (err) {
    console.error('Error deleting intake group from Supabase:', err);
    return null;
  }
}

export async function fetchCatalog() {
  if (!supabase) return { ingredients: [], dishes: [] };
  try {
    let ingredientsData = null;
    let dishesData = null;

    try {
      const resIng = await supabase.from('ingredients').select('*').order('name');
      ingredientsData = resIng.data;
    } catch (e) {}

    try {
      const resDish = await supabase.from('dishes').select('*, dish_ingredients(*, ingredients(*))').order('name');
      dishesData = resDish.data;
    } catch (e) {}

    let ingredients = ingredientsData || [];
    let dishes = (dishesData || []).map(d => ({
      ...d,
      components: (d.dish_ingredients || []).map(di => ({
        name: di.ingredients?.name || 'Ingrediente',
        category: di.ingredients?.category || 'other',
        unit: di.unit || di.ingredients?.unit || 'g',
        quantity: di.quantity || 100,
        calories: Math.round((di.ingredients?.calories || 0) * (di.quantity || 100) / 100),
        protein: Math.round(((di.ingredients?.protein || 0) * (di.quantity || 100) / 100) * 10) / 10,
        carbs: Math.round(((di.ingredients?.carbs || 0) * (di.quantity || 100) / 100) * 10) / 10,
        fats: Math.round(((di.ingredients?.fats || 0) * (di.quantity || 100) / 100) * 10) / 10
      }))
    }));

    // Always fetch intakes to enrich catalog with any recent dishes/ingredients logged in intakes
    try {
      const { data: intakesData } = await supabase.from('intakes').select('name, category, unit, calories, protein, carbs, fats, dish_name');
      if (intakesData && intakesData.length > 0) {
        const uniqueIngMap = new Map();
        const uniqueDishMap = new Map();

        // Prepopulate with existing
        ingredients.forEach(ing => ing.name && uniqueIngMap.set(ing.name.trim().toLowerCase(), ing));
        dishes.forEach(d => d.name && uniqueDishMap.set(d.name.trim().toLowerCase(), d));

        intakesData.forEach(item => {
          if (item.name && !uniqueIngMap.has(item.name.trim().toLowerCase())) {
            uniqueIngMap.set(item.name.trim().toLowerCase(), {
              name: item.name.trim(),
              category: item.category || 'other',
              unit: item.unit || 'g',
              calories: item.calories || 0,
              protein: item.protein || 0,
              carbs: item.carbs || 0,
              fats: item.fats || 0
            });
          }
          if (item.dish_name && item.dish_name.trim()) {
            const dishKey = item.dish_name.trim().toLowerCase();
            if (!uniqueDishMap.has(dishKey)) {
              uniqueDishMap.set(dishKey, { name: item.dish_name.trim(), components: [] });
            }
            const existingComponents = uniqueDishMap.get(dishKey).components || [];
            if (!existingComponents.some(c => c.name === item.name)) {
              existingComponents.push({
                name: item.name,
                category: item.category || 'other',
                unit: item.unit || 'g',
                quantity: 1,
                calories: item.calories || 0,
                protein: item.protein || 0,
                carbs: item.carbs || 0,
                fats: item.fats || 0
              });
              uniqueDishMap.get(dishKey).components = existingComponents;
            }
          }
        });

        ingredients = Array.from(uniqueIngMap.values());
        dishes = Array.from(uniqueDishMap.values());
      }
    } catch (e) {}

    return { ingredients, dishes };
  } catch (err) {
    console.error('Error fetching catalog:', err);
    return { ingredients: [], dishes: [] };
  }
}

export async function saveToCatalog(items) {
  if (!supabase || !items || items.length === 0) return;
  try {
    for (const item of items) {
      let savedIng = null;
      if (item.name) {
        const ingRow = {
          name: item.name.trim(),
          category: item.category || 'other',
          unit: item.unit || 'g',
          calories: item.macros?.calories || item.calories || 0,
          protein: item.macros?.protein || item.protein || 0,
          carbs: item.macros?.carbs || item.carbs || 0,
          fats: item.macros?.fats || item.fats || 0
        };
        try {
          const { data } = await supabase.from('ingredients').upsert(ingRow, { onConflict: 'name' }).select().maybeSingle();
          savedIng = data;
        } catch (e) {}
      }

      if (item.dishName && item.dishName.trim()) {
        try {
          const { data: savedDish } = await supabase.from('dishes').upsert({ name: item.dishName.trim() }, { onConflict: 'name' }).select().maybeSingle();
          
          if (savedDish && savedIng) {
            await supabase.from('dish_ingredients').upsert({
              dish_id: savedDish.id,
              ingredient_id: savedIng.id,
              quantity: item.quantity || 100,
              unit: item.unit || 'g'
            });
          }
        } catch (e) {}
      }
    }
  } catch (err) {
    console.error('Error saving to catalog:', err);
  }
}

const normalizeStr = (str) =>
  str ? str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";

export async function applyCatalogMacros(items) {
  if (!items || items.length === 0) return items;
  try {
    const { ingredients = [], dishes = [] } = await fetchCatalog();
    const resultItems = [];

    for (const item of items) {
      const cleanItemName = normalizeStr(item.name);
      const cleanDishName = normalizeStr(item.dishName);

      // 1. Check if matches a Dish in DB catalog
      const matchedDish = dishes.find(d => 
        (cleanDishName && normalizeStr(d.name) === cleanDishName) || 
        (cleanItemName && normalizeStr(d.name) === cleanItemName)
      );

      if (matchedDish && matchedDish.components && matchedDish.components.length > 0) {
        const qtyMultiplier = item.quantity || 1;
        matchedDish.components.forEach(comp => {
          resultItems.push({
            dishName: matchedDish.name,
            name: comp.name,
            category: comp.category || 'other',
            unit: comp.unit || 'g',
            quantity: comp.quantity * qtyMultiplier,
            calories: Math.round(comp.calories * qtyMultiplier),
            protein: Math.round(comp.protein * qtyMultiplier * 10) / 10,
            carbs: Math.round(comp.carbs * qtyMultiplier * 10) / 10,
            fats: Math.round(comp.fats * qtyMultiplier * 10) / 10,
            isFromDb: true
          });
        });
        continue;
      }

      // 2. Check if matches an Ingredient in DB catalog
      const matchedIng = ingredients.find(ing => normalizeStr(ing.name) === cleanItemName);

      if (matchedIng) {
        const qty = item.quantity || 100;
        const unit = item.unit || matchedIng.unit || 'g';

        let factor = 1;
        if (unit === 'g' || unit === 'ml') {
          factor = qty / 100;
        } else {
          factor = qty;
        }

        resultItems.push({
          ...item,
          name: matchedIng.name,
          category: matchedIng.category || item.category || 'other',
          unit: unit,
          quantity: qty,
          calories: Math.round((matchedIng.calories || 0) * factor),
          protein: Math.round(((matchedIng.protein || 0) * factor) * 10) / 10,
          carbs: Math.round(((matchedIng.carbs || 0) * factor) * 10) / 10,
          fats: Math.round(((matchedIng.fats || 0) * factor) * 10) / 10,
          isFromDb: true
        });
        continue;
      }

      // 3. Fallback: Not in DB catalog, keep AI generated macros
      resultItems.push(item);
    }

    return resultItems;
  } catch (err) {
    console.error('Error applying catalog macros:', err);
    return items;
  }
}

