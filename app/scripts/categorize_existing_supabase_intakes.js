import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually
const envPath = path.resolve(__dirname, '../.env');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [k, v] = line.split('=');
  if (k && v) envVars[k.trim()] = v.trim();
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables in app/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function classifyFoodName(name) {
  const n = (name || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (/donut|croissant|pandesal|magdalena|bizcocho|galleta|tarta|pastel|bollo|bolleria|waffle|crepe|muffin|brownie|pancakes|pancake/i.test(n)) {
    return 'bakery';
  }
  if (/patata|papa|boniato|camote|yuca|tuberculo|sweet.*potato|potato/i.test(n)) {
    return 'tubers';
  }
  if (/pizza|burger|mcdonald|kfc|kebab|burrito|croqueta|churro|empanada|hot.*dog|doritos|snack/i.test(n)) {
    return 'fast_food';
  }
  if (/pollo|pavo|ternera|cerdo|carne|lomo|entrecot|jamon|bacon|pescado|atun|salmon|merluza|huevo|tortilla|clara|gamba|calamar|pulpo|bacalao|solomillo|chuleton|yema/i.test(n)) {
    return 'meat';
  }
  if (/lenteja|garbanzo|alubia|judia|frijol|soja|edamame|tofu|hummus/i.test(n)) {
    return 'legumes';
  }
  if (/ensalada|lechuga|tomate|pepino|cebolla|zanahoria|espinaca|brocoli|coliflor|calabacin|pimiento|champinon|seta|verdura|canonigo|rucula|esparrago|ajo/i.test(n)) {
    return 'vegetables';
  }
  if (/manzana|platano|banana|fresa|naranja|mandarina|uva|melon|sandia|pina|kiwi|melocoton|mango|fruta|arandano|frambuesa/i.test(n)) {
    return 'fruit';
  }
  if (/leche|yogur|yogurt|queso|cuajada|kefir|mantequilla|nata|requeson/i.test(n)) {
    return 'dairy';
  }
  if (/arroz|pan|pasta|espagueti|macarron|avena|cereal|harina|quinoa|tostada|noodle|ramen/i.test(n)) {
    return 'grains';
  }
  if (/aceite|oliva|fruto.*seco|nuez|almendra|avellana|pistacho|aguacate|cacahuete|crema.*mani/i.test(n)) {
    return 'healthy_fats';
  }
  if (/cafe|te|infusion|agua|zumo|jugo|batido|proteina|whey|cerveza|vino|refresco|coca.*cola/i.test(n)) {
    return 'beverages';
  }

  return 'other';
}

async function categorizeAll() {
  console.log('Fetching all intakes from Supabase...');
  const { data: intakes, error } = await supabase.from('intakes').select('*');
  if (error) {
    console.error('Error fetching intakes:', error);
    process.exit(1);
  }

  console.log(`Found ${intakes.length} total intakes.`);

  let updatedCount = 0;
  const counts = {};
  for (const item of intakes) {
    const category = classifyFoodName(item.name);
    counts[category] = (counts[category] || 0) + 1;
    const { error: upErr } = await supabase.from('intakes').update({ category }).eq('id', item.id);
    if (!upErr) updatedCount++;
  }

  console.log(`Successfully categorized ${updatedCount} intakes in Supabase!`);
  console.log('New category breakdown:', counts);
}

categorizeAll();
