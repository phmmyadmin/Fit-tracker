/**
 * Calcula el TDEE (Gasto Energético Diario Total) y Macros objetivo basado en el perfil
 * Fórmulas basadas en Mifflin-St Jeor
 */
export function calculateProfileTargets(profile) {
  const { weight, height, age, gender, activity_level, goal, pace = 'moderate' } = profile;

  // Si faltan datos básicos, devolver algo por defecto
  if (!weight || !height || !age || !gender) {
    return { calories: 2000, protein: 150, carbs: 200, fats: 60 };
  }

  // 1. TMB (Tasa Metabólica Basal) - Mifflin-St Jeor
  let tmb = (10 * weight) + (6.25 * height) - (5 * age);
  tmb = gender === 'male' ? tmb + 5 : tmb - 161;

  // 2. Factor de Actividad (NEAT / Ejercicio)
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  const multiplier = activityMultipliers[activity_level] || 1.375;
  const maintenanceCalories = Math.round(tmb * multiplier);

  // 3. Ajuste por Objetivo y Ritmo (Agresividad)
  let offset = 0;
  if (goal === 'lose') {
    if (pace === 'relaxed') offset = -300;       // Suave (~0.3 kg/sem)
    else if (pace === 'aggressive') offset = -750; // Agresivo (~0.75 kg/sem)
    else offset = -500;                          // Moderado (~0.5 kg/sem)
  } else if (goal === 'gain') {
    if (pace === 'relaxed') offset = 200;       // Suave
    else if (pace === 'aggressive') offset = 500; // Agresivo
    else offset = 350;                          // Moderado
  }

  let targetCalories = maintenanceCalories + offset;

  // Límite de seguridad
  if (gender === 'male' && targetCalories < 1500) targetCalories = 1500;
  if (gender === 'female' && targetCalories < 1200) targetCalories = 1200;

  // 4. Distribución de Macros
  // Proteína: 2.2g por kg de peso
  const protein = Math.round(weight * 2.2);
  const proteinCalories = protein * 4;

  // Grasas: 25% de las calorías totales
  const fatsCalories = targetCalories * 0.25;
  const fats = Math.round(fatsCalories / 9);

  // Carbohidratos: el resto
  const carbsCalories = targetCalories - proteinCalories - fatsCalories;
  const carbs = Math.round(Math.max(0, carbsCalories / 4));

  return {
    calories: Math.round(targetCalories),
    protein,
    carbs,
    fats
  };
}
