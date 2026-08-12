import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually
const envPath = path.resolve(__dirname, '../app/.env');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [k, v] = line.split('=');
  if (k && v) envVars[k.trim()] = v.trim();
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;
const geminiApiKey = envVars.VITE_GEMINI_API_KEY;

if (!supabaseUrl || !supabaseAnonKey || !geminiApiKey) {
  console.error('Missing required environment variables in app/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const genAI = new GoogleGenerativeAI(geminiApiKey);

async function categorizeAll() {
  console.log('Fetching all intakes from Supabase...');
  const { data: intakes, error } = await supabase.from('intakes').select('*');
  if (error) {
    console.error('Error fetching intakes:', error);
    process.exit(1);
  }

  console.log(`Found ${intakes.length} total intakes.`);

  const uncategorized = intakes.filter(i => !i.category || i.category === 'varios' || i.category === 'other');
  console.log(`${uncategorized.length} intakes need categorization.`);

  if (uncategorized.length === 0) {
    console.log('All intakes are already categorized!');
    return;
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    generationConfig: { responseMimeType: 'application/json' }
  });

  // Process in batches of 25
  const batchSize = 25;
  for (let i = 0; i < uncategorized.length; i += batchSize) {
    const batch = uncategorized.slice(i, i + batchSize);
    const itemList = batch.map((item, idx) => `${idx + 1}. [ID: ${item.id}] ${item.name}`).join('\n');

    const prompt = `
Eres un nutricionista experto. Clasifica cada uno de los siguientes alimentos en una de las siguientes categorías exactas en formato English snake_case:
- "meat" (Carnes, pollo, pavo, ternera, cerdos, pescados, mariscos, huevos)
- "legumes" (Lentejas, garbanzos, alubias, judías, soja, tofu)
- "vegetables" (Verduras, hortalizas, ensaladas, champiñones)
- "fruit" (Frutas frescas y secas, plátanos, manzanas, bayas)
- "fast_food" (Comida rápida, ultraprocesados, fritos, pizzas, hamburguesas, patatas fritas, kebabs)
- "dairy" (Leche, yogures, quesos, mantequilla)
- "grains" (Pan, arroz, pasta, avena, cereales, harina)
- "healthy_fats" (Aceites, frutos secos, nueces, almendras, aguacate)
- "beverages" (Bebidas, zumos, refrescos, café, batidos de proteína)
- "other" (Platos combinados mixtos, salsas, condimentos, golosinas, varios)

Lista de alimentos:
${itemList}

Devuelve ÚNICAMENTE un objeto JSON mapeando el ID a la categoría correspondiente:
{
  "ID1": "category_name",
  "ID2": "category_name"
}
`;

    try {
      const result = await model.generateContent(prompt);
      const resText = result.response.text();
      const mappings = JSON.parse(resText);

      for (const item of batch) {
        const cat = mappings[item.id] || mappings[String(item.id)] || 'other';
        console.log(`Updating ${item.name} (${item.id}) -> ${cat}`);
        await supabase.from('intakes').update({ category: cat }).eq('id', item.id);
      }
    } catch (err) {
      console.error(`Error processing batch ${i}:`, err);
    }
  }

  console.log('Categorization backfill complete!');
}

categorizeAll();
