import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function parseFoodWithGemini(userText) {
  if (!genAI || !apiKey) {
    console.warn('VITE_GEMINI_API_KEY not configured. Falling back to generic parser.');
    return null;
  }

  const modelsToTry = [
    'gemini-flash-latest',
    'gemini-3.6-flash',
    'gemini-flash-lite-latest',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash'
  ];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: 'application/json' }
      });

      const prompt = `
Eres un nutricionista experto en conteo de calorías y macronutrientes.
Analiza el siguiente texto de comida del usuario y devuelve un array JSON estricto con los alimentos parseados.

Reglas estrictas de parseo para CUALQUIER alimento del mundo:
1. "name": Nombre estándar y limpio del alimento (en singular, sin verbos como "añade" o "comí", y sin prefijos de cantidad como "100g de" o "2 ").
2. "quantity": Número exacto de unidades o gramos especificados (ej: para "2 huevos", quantity = 2; para "150g arroz", quantity = 150).
3. "unit": 'ud' (para piezas/unidades), 'g' (para gramos), 'ml' (para mililitros) o 'porcion'.
4. "category": OBLIGATORIO. Categoriza el alimento en una de las siguientes opciones exactas en formato English snake_case:
   - "meat" (Carnes, aves, pescados, mariscos, huevos)
   - "legumes" (Lentejas, garbanzos, alubias, soja, tofu)
   - "vegetables" (Verduras, hortalizas, ensaladas)
   - "fruit" (Frutas frescas y secas)
   - "fast_food" (Comida rápida, ultraprocesados, fritos, pizzas, hamburguesas)
   - "dairy" (Leche, yogures, quesos)
   - "grains" (Pan, arroz, pasta, avena, cereales)
   - "healthy_fats" (Aceites, frutos secos, aguacate)
   - "beverages" (Bebidas, zumos, batidos, café)
   - "other" (Otros / Salsas / Platos variados)
5. "calories", "protein", "carbs", "fats": IMPORTANTE: Debes calcular el TOTAL de macronutrientes para TODA la cantidad especificada en el texto del usuario (NO por 1 unidad ni por 100g).
   - Ejemplo 1: "2 huevos cocidos" -> quantity: 2, unit: "ud", category: "meat", calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0.
   - Ejemplo 2: "150g pechuga de pollo" -> quantity: 150, unit: "g", category: "meat", calories: 247, protein: 46.5, carbs: 0, fats: 5.4.
   - Ejemplo 3: "1 manzana" -> quantity: 1, unit: "ud", category: "fruit", calories: 80, protein: 0.4, carbs: 21, fats: 0.2.
6. Para textos con múltiples ingredientes (ej: "2 huevos cocidos y 50g de avena"), genera un objeto independiente por cada alimento.

Texto del usuario: "${userText}"

Devuelve ÚNICAMENTE la estructura JSON en este formato:
[
  {
    "name": "Nombre Alimento",
    "quantity": 1,
    "unit": "ud|g|porcion|ml",
    "category": "meat|legumes|vegetables|fruit|fast_food|dairy|grains|healthy_fats|beverages|other",
    "calories": 100,
    "protein": 10,
    "carbs": 15,
    "fats": 2
  }
]
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const parsed = JSON.parse(responseText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (err) {
      // Silently try next model fallback if 404 or unsupported
    }
  }

  console.info('Gemini API unreachable. Usando parser nutricional genérico.');
  return null;
}
