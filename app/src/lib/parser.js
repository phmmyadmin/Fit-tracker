const foodMaster = {
  "platano saba": { name: "Plátano saba", per_unit: { calories: 60, protein: 0.7, carbs: 15.0, fats: 0.2 }, per_100g: { calories: 92, protein: 1.1, carbs: 23.0, fats: 0.3 }, default_unit: "ud" },
  "saba": { name: "Plátano saba", per_unit: { calories: 60, protein: 0.7, carbs: 15.0, fats: 0.2 }, per_100g: { calories: 92, protein: 1.1, carbs: 23.0, fats: 0.3 }, default_unit: "ud" },
  "platano": { name: "Plátano", per_unit: { calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 }, per_100g: { calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3 }, default_unit: "ud" },
  "pechuga de pollo": { name: "Pechuga de pollo", per_100g: { calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6 }, default_unit: "g" },
  "pollo adobo": { name: "Pollo adobo", per_100g: { calories: 180, protein: 25.0, carbs: 5.0, fats: 7.0 }, default_unit: "g" },
  "pollo": { name: "Pollo", per_100g: { calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6 }, default_unit: "g" },
  "arroz": { name: "Arroz", per_100g: { calories: 130, protein: 2.7, carbs: 28.0, fats: 0.3 }, default_unit: "g" },
  "huevo cocido": { name: "Huevo cocido", per_unit: { calories: 78, protein: 6.5, carbs: 0.6, fats: 5.5 }, per_100g: { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0 }, default_unit: "ud" },
  "huevos cocidos": { name: "Huevo cocido", per_unit: { calories: 78, protein: 6.5, carbs: 0.6, fats: 5.5 }, per_100g: { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0 }, default_unit: "ud" },
  "huevo": { name: "Huevo cocido", per_unit: { calories: 78, protein: 6.5, carbs: 0.6, fats: 5.5 }, per_100g: { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0 }, default_unit: "ud" },
  "huevos": { name: "Huevo cocido", per_unit: { calories: 78, protein: 6.5, carbs: 0.6, fats: 5.5 }, per_100g: { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0 }, default_unit: "ud" },
  "mango": { name: "Mango", per_unit: { calories: 48, protein: 0.6, carbs: 12.0, fats: 0.3 }, per_100g: { calories: 60, protein: 0.8, carbs: 15.0, fats: 0.4 }, default_unit: "ud" },
  "pandesal": { name: "Pandesal", per_unit: { calories: 115, protein: 3.0, carbs: 18.0, fats: 3.0 }, per_100g: { calories: 287, protein: 7.5, carbs: 45.0, fats: 7.5 }, default_unit: "ud" },
  "pan": { name: "Pan", per_100g: { calories: 265, protein: 9.0, carbs: 49.0, fats: 3.2 }, default_unit: "g" },
  "atun": { name: "Atún", per_100g: { calories: 130, protein: 28.0, carbs: 0.0, fats: 1.0 }, default_unit: "g" },
  "yogur": { name: "Yogur", per_100g: { calories: 60, protein: 3.5, carbs: 4.7, fats: 3.3 }, default_unit: "g" },
  "avena": { name: "Avena", per_100g: { calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9 }, default_unit: "g" },
  "hamburguesa": { name: "Hamburguesa", per_unit: { calories: 250, protein: 18.0, carbs: 20.0, fats: 12.0 }, default_unit: "ud" },
  "cheeseburger": { name: "Cheeseburger", per_unit: { calories: 280, protein: 19.0, carbs: 22.0, fats: 14.0 }, default_unit: "ud" },
  "garbanzos": { name: "Garbanzos", per_100g: { calories: 164, protein: 8.9, carbs: 27.0, fats: 2.6 }, default_unit: "g" },
  "patata": { name: "Patata", per_100g: { calories: 77, protein: 2.0, carbs: 17.0, fats: 0.1 }, default_unit: "g" },
  "zanahoria": { name: "Zanahoria", per_100g: { calories: 41, protein: 0.9, carbs: 9.6, fats: 0.2 }, default_unit: "g" }
};

export function parseFoodTextLocal(text) {
  let cleaned = text
    .replace(/^(?:añade|agrega|registra|hoy he comido|comi|desayuné|cene)\s+/i, '')
    .replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, '')
    .trim();

  const segments = cleaned.split(/\\?\+|\s+y\s+/i).map(s => s.trim()).filter(Boolean);
  let matches = [];

  for (const seg of segments) {
    const lower = seg.toLowerCase();
    const gramsMatch = lower.match(/(\d+(?:\.\d+)?)\s*g(?:ramos)?\s+(?:de\s+)?([a-z\s]+)/i);
    const qtyMatch = lower.match(/(\d+(?:\.\d+)?)\s+([a-z\s]+)/i);

    let foundKey = null;
    for (const key of Object.keys(foodMaster)) {
      if (lower.includes(key)) {
        foundKey = key;
        break;
      }
    }

    if (foundKey) {
      const info = foodMaster[foundKey];
      let quantity = 1;
      let unit = info.default_unit || 'g';

      if (gramsMatch) {
        quantity = parseFloat(gramsMatch[1]);
        unit = 'g';
      } else if (qtyMatch) {
        quantity = parseFloat(qtyMatch[1]);
        unit = info.default_unit || 'ud';
      }

      let baseMacros;
      let factor = 1;

      if (unit === 'g') {
        baseMacros = info.per_100g || info.per_unit || { calories: 100, protein: 5, carbs: 10, fats: 2 };
        factor = quantity / 100;
      } else {
        baseMacros = info.per_unit || info.per_100g || { calories: 100, protein: 5, carbs: 10, fats: 2 };
        factor = quantity;
      }

      matches.push({
        name: info.name,
        quantity: quantity,
        unit: unit,
        calories: Math.round(baseMacros.calories * factor),
        protein: Math.round(baseMacros.protein * factor * 10) / 10,
        carbs: Math.round(baseMacros.carbs * factor * 10) / 10,
        fats: Math.round(baseMacros.fats * factor * 10) / 10
      });
    } else {
      let cleanName = seg.replace(/^(?:añade|agrega|registra|100g|2|1|3)\s+/i, '').replace(/^(?:de\s+)/i, '').trim();
      cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      
      let qty = 1;
      if (qtyMatch) qty = parseFloat(qtyMatch[1]);

      matches.push({
        name: cleanName || seg,
        quantity: qty,
        unit: 'porcion',
        calories: 150 * qty,
        protein: 10 * qty,
        carbs: 15 * qty,
        fats: 5 * qty
      });
    }
  }

  return matches;
}
