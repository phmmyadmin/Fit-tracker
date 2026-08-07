const foodMaster100g = {
  "platano saba": { name: "Plátano saba", calories: 92, protein: 1.1, carbs: 23.0, fats: 0.3, default_g: 65, default_unit: "ud" },
  "saba": { name: "Plátano saba", calories: 92, protein: 1.1, carbs: 23.0, fats: 0.3, default_g: 65, default_unit: "ud" },
  "platano": { name: "Plátano", calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3, default_g: 100, default_unit: "ud" },
  "pechuga de pollo": { name: "Pechuga de pollo", calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, default_g: 150, default_unit: "g" },
  "pollo adobo": { name: "Pollo adobo", calories: 180, protein: 25.0, carbs: 5.0, fats: 7.0, default_g: 150, default_unit: "g" },
  "pollo": { name: "Pollo", calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6, default_g: 150, default_unit: "g" },
  "arroz": { name: "Arroz", calories: 130, protein: 2.7, carbs: 28.0, fats: 0.3, default_g: 150, default_unit: "g" },
  "huevo cocido": { name: "Huevo cocido", calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, default_g: 60, default_unit: "ud" },
  "huevos cocidos": { name: "Huevo cocido", calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, default_g: 60, default_unit: "ud" },
  "huevo": { name: "Huevo cocido", calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, default_g: 60, default_unit: "ud" },
  "huevos": { name: "Huevo cocido", calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0, default_g: 60, default_unit: "ud" },
  "mango": { name: "Mango", calories: 60, protein: 0.8, carbs: 15.0, fats: 0.4, default_g: 80, default_unit: "ud" },
  "pandesal": { name: "Pandesal", calories: 287, protein: 7.5, carbs: 45.0, fats: 7.5, default_g: 40, default_unit: "ud" },
  "pan": { name: "Pan", calories: 265, protein: 9.0, carbs: 49.0, fats: 3.2, default_g: 50, default_unit: "g" },
  "atun": { name: "Atún", calories: 130, protein: 28.0, carbs: 0.0, fats: 1.0, default_g: 100, default_unit: "g" },
  "yogur": { name: "Yogur", calories: 60, protein: 3.5, carbs: 4.7, fats: 3.3, default_g: 125, default_unit: "g" },
  "avena": { name: "Avena", calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9, default_g: 40, default_unit: "g" },
  "hamburguesa": { name: "Hamburguesa", calories: 250, protein: 18.0, carbs: 20.0, fats: 12.0, default_g: 150, default_unit: "ud" },
  "cheeseburger": { name: "Cheeseburger", calories: 280, protein: 19.0, carbs: 22.0, fats: 14.0, default_g: 160, default_unit: "ud" },
  "garbanzos": { name: "Garbanzos", calories: 164, protein: 8.9, carbs: 27.0, fats: 2.6, default_g: 150, default_unit: "g" },
  "patata": { name: "Patata", calories: 77, protein: 2.0, carbs: 17.0, fats: 0.1, default_g: 150, default_unit: "g" },
  "zanahoria": { name: "Zanahoria", calories: 41, protein: 0.9, carbs: 9.6, fats: 0.2, default_g: 100, default_unit: "g" }
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
    for (const key of Object.keys(foodMaster100g)) {
      if (lower.includes(key)) {
        foundKey = key;
        break;
      }
    }

    if (foundKey) {
      const info = foodMaster100g[foundKey];
      let quantity = 1;
      let unit = info.default_unit || 'g';

      if (gramsMatch) {
        quantity = parseFloat(gramsMatch[1]);
        unit = 'g';
      } else if (qtyMatch) {
        quantity = parseFloat(qtyMatch[1]);
        unit = info.default_unit || 'ud';
      }

      const factor = unit === 'g' ? (quantity / 100) : quantity;

      matches.push({
        name: info.name,
        quantity: quantity,
        unit: unit,
        calories: Math.round(info.calories * factor),
        protein: Math.round(info.protein * factor * 10) / 10,
        carbs: Math.round(info.carbs * factor * 10) / 10,
        fats: Math.round(info.fats * factor * 10) / 10
      });
    } else {
      // Fallback if not found in database: clean text and estimate basic item
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
