/**
 * Generic client-side parser fallback when Gemini LLM is unavailable.
 * Strips command prefixes ("añade", "registra", etc.) and extracts generic item names, quantities, and units.
 */
export function parseFoodTextLocal(text) {
  let cleaned = text
    .replace(/^(?:añade|agrega|registra|hoy he comido|comí|comi|desayuné|desayune|cené|cene)\s+/i, '')
    .replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, '')
    .trim();

  const segments = cleaned.split(/\\?\+|\s+y\s+/i).map(s => s.trim()).filter(Boolean);
  let matches = [];

  for (const seg of segments) {
    const lower = seg.toLowerCase();
    const gramsMatch = lower.match(/(\d+(?:\.\d+)?)\s*g(?:ramos)?\s+(?:de\s+)?([a-z\s]+)/i);
    const qtyMatch = lower.match(/(\d+(?:\.\d+)?)\s+([a-z\s]+)/i);

    let cleanName = seg
      .replace(/^(?:añade|agrega|registra|100g|\d+g|\d+)\s+/i, '')
      .replace(/^(?:de\s+)/i, '')
      .trim();

    cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

    let quantity = 1;
    let unit = 'porcion';

    if (gramsMatch) {
      quantity = parseFloat(gramsMatch[1]);
      unit = 'g';
      if (gramsMatch[2]) {
        cleanName = gramsMatch[2].trim();
        cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      }
    } else if (qtyMatch) {
      quantity = parseFloat(qtyMatch[1]);
      unit = 'ud';
      if (qtyMatch[2]) {
        cleanName = qtyMatch[2].trim();
        cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      }
    }

    // Generic estimation based on unit type and quantity
    const baseCalsPerUnit = unit === 'g' ? 1.5 : 100;
    const estimatedCals = Math.round(quantity * baseCalsPerUnit);

    matches.push({
      name: cleanName || seg,
      quantity: quantity,
      unit: unit,
      calories: estimatedCals,
      protein: Math.round((estimatedCals * 0.25 / 4) * 10) / 10,
      carbs: Math.round((estimatedCals * 0.45 / 4) * 10) / 10,
      fats: Math.round((estimatedCals * 0.30 / 9) * 10) / 10
    });
  }

  return matches;
}
