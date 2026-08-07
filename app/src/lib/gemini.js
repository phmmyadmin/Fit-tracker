import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function parseFoodWithGemini(userText) {
  if (!genAI || !apiKey) {
    console.warn('VITE_GEMINI_API_KEY not configured. Falling back to rule-based parser.');
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

Reglas estrictas de parseo:
1. "name": Nombre estándar del alimento (singulares preferidos, sin prefijos de cantidad como "100g de", "2 raciones de").
2. "quantity": Número (ej: 2, 100, 1.5).
3. "unit": 'g' (gramos), 'ud' (unidades) o 'porcion'. Si es líquido, usa 'ml' o 'porcion'.
4. "calories", "protein", "carbs", "fats": Cálculo preciso de macros para la cantidad especificada en el texto.
5. Para platos cerrados (ej: "Jollibee Combo", "Chickenjoy"), no los deshagas a menos que el usuario especifique ingredientes sueltos.
6. Para platos caseros con varios ingredientes especificados (ej: "2 huevos cocidos y 50g de avena"), genera un objeto independiente por cada ingrediente.

Texto del usuario: "${userText}"

Devuelve ÚNICAMENTE la estructura JSON en este formato:
[
  {
    "name": "Nombre Alimento",
    "quantity": 1,
    "unit": "ud|g|porcion",
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

  console.info('Gemini API unreachable. Usando parser nutricional local.');
  return null;
}
