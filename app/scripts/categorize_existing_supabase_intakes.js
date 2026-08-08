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

  if (/pizza|burger|mcdonald|kfc|kebab|burrito|patata.*frita|croqueta|churro|empanada|hot.*dog|donuts|doritos|snack/i.test(n)) {
    return 'fast_food';
  }
  if (/pollo|pavo|ternera|cerdo|carne|lomo|entrecot|jamon|bacon|pescado|atun|salmon|merluza|huevo|tortilla|clara|gamba|calamar|pulpo|bacalao|solomillo|chuleton/i.test(n)) {
    return 'meat';
  }
  if (/lenteja|garbanzo|alubia|judia|frijol|soja|edamame|tofu|hummus/i.test(n)) {
    return 'legumes';
  }
  if (/ensalada|lechuga|tomate|pepino|cebolla|zanahoria|espinaca|brocoli|coliflor|calabacin|pimiento|champinon|seta|verdura|canonigo|rucula|esparrago/i.test(n)) {
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
  for (const item of intakes) {
    const category = classifyFoodName(item.name);
    const { error: upErr } = await supabase.from('intakes').update({ category }).eq('id', item.id);
    if (!upErr) updatedCount++;
  }

  console.log(`Successfully categorized ${updatedCount} intakes in Supabase!`);
}

categorizeAll();
