const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env
const envPath = path.join(__dirname, '../app/.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) env[parts[0].trim()] = parts.slice(1).join('=').trim();
});

const url = env['VITE_SUPABASE_URL'];
const key = env['VITE_SUPABASE_ANON_KEY'];

if (!url || !key) {
  console.error('Supabase URL or Key missing in app/.env');
  process.exit(1);
}

const supabase = createClient(url, key);
const foodLogPath = path.join(__dirname, '../data/food_log.json');
const foodLog = JSON.parse(fs.readFileSync(foodLogPath, 'utf8'));

async function seed() {
  console.log('Seeding Supabase with historical data...');

  // 1. Seed user_profile
  const { userProfile, dailyLogs } = foodLog;
  const { data: existingProfile } = await supabase.from('user_profile').select('*').limit(1);

  if (!existingProfile || existingProfile.length === 0) {
    await supabase.from('user_profile').insert({
      target_macros: userProfile.targetMacros,
      maintenance_calories: userProfile.maintenanceCalories || 2450,
      start_weight: userProfile.weightLog?.startWeight || 73.0,
      target_weight: userProfile.weightLog?.targetWeight || 68.0
    });
  }

  // 2. Seed weight_logs
  if (userProfile.weightLog && userProfile.weightLog.history) {
    for (const w of userProfile.weightLog.history) {
      await supabase.from('weight_logs').upsert({
        date: w.date,
        time: w.time || '08:00',
        weight: w.weight
      }, { onConflict: 'date,time' });
    }
  }

  // 3. Seed daily_logs & intakes
  for (const log of dailyLogs) {
    const { data: insertedLog, error: logErr } = await supabase
      .from('daily_logs')
      .upsert({
        date: log.date,
        calories: log.dailyTotals.calories,
        protein: log.dailyTotals.protein,
        carbs: log.dailyTotals.carbs,
        fats: log.dailyTotals.fats
      }, { onConflict: 'date' })
      .select()
      .single();

    if (logErr) {
      console.error(`Error inserting daily_log for ${log.date}:`, logErr.message);
      continue;
    }

    const logId = insertedLog.id;

    // Delete existing intakes for that date to avoid duplicates, then insert
    await supabase.from('intakes').delete().eq('date', log.date);

    const intakeRows = log.intakes.map(i => ({
      daily_log_id: logId,
      date: log.date,
      time: i.time || '12:00',
      name: i.name,
      dish_name: i.dishName || null,
      quantity: i.quantity || 1,
      unit: i.unit || 'porcion',
      calories: i.macros.calories,
      protein: i.macros.protein,
      carbs: i.macros.carbs,
      fats: i.macros.fats
    }));

    if (intakeRows.length > 0) {
      const { error: intakeErr } = await supabase.from('intakes').insert(intakeRows);
      if (intakeErr) console.error(`Error inserting intakes for ${log.date}:`, intakeErr.message);
    }
  }

  console.log('✅ Supabase seeding completed successfully!');
}

seed();
