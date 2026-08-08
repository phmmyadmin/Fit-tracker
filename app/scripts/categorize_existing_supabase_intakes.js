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

  // 1. Fast Food
  if (/\b(pizza|burger|hamburguesa|mcdonald|kfc|kebab|burrito|croqueta|churro|empanada|hotdog|hot.*dog|doritos|cheetos|snack|chips)\b/i.test(n) || /patata.*frita/i.test(n)) {
    return 'fast_food';
  }
  // 2. Bakery & Desserts (takes precedence over fruits if it's ice cream, cake, sweets, etc.)
  if (/\b(helado|tarta|pastel|pasteles|postre|postres|donut|donuts|croissant|pandesal|magdalena|bizcocho|galleta|galletas|bollo|bolleria|waffle|crepe|muffin|brownie|pancake|pancakes|flan|natillas|chocolate|chocolates|candy|ice.*cream|tiramisu)\b/i.test(n) || /mango.*graham|ice.*candy/i.test(n)) {
    return 'bakery';
  }
  // 3. Beverages (takes precedence over fruits if it's juice, smoothie, shake)
  if (/\b(cafe|infusion|agua|zumo|jugo|batido|batidos|proteina|whey|cerveza|vino|refresco|coca.*cola|fanta|sprite|pepsi|smoothie|colacao|nesquik|leche.*chocolate)\b/i.test(n) || /\bte\b/i.test(n)) {
    return 'beverages';
  }
  // 4. Meat & Fish
  if (/\b(pollo|pavo|ternera|cerdo|carne|lomo|entrecot|jamon|bacon|pescado|atun|salmon|merluza|huevo|huevos|tortilla|clara|claras|gamba|gambas|calamar|pulpo|bacalao|solomillo|chuleton|yema|yemas|pork|beef|chicken|steak|fish)\b/i.test(n) || /omelette/i.test(n)) {
    return 'meat';
  }
  // 5. Tubers & Potatoes
  if (/\b(patata|patatas|papa|papas|boniato|boniatos|camote|yuca|tuberculo|batata|batatas|potato|potatoes|sweet.*potato)\b/i.test(n)) {
    return 'tubers';
  }
  // 6. Legumes
  if (/\b(lenteja|lentejas|garbanzo|garbanzos|alubia|alubias|judia|judias|frijol|frijoles|soja|edamame|tofu|hummus|lentils)\b/i.test(n)) {
    return 'legumes';
  }
  // 7. Vegetables
  if (/\b(ensalada|lechuga|tomate|tomates|pepino|cebolla|zanahoria|espinaca|espinacas|brocoli|coliflor|calabacin|pimiento|pimientos|champinon|champinones|seta|setas|verdura|verduras|canonigo|rucula|esparrago|esparragos|ajo)\b/i.test(n)) {
    return 'vegetables';
  }
  // 8. Raw Fruits
  if (/\b(manzana|manzanas|platano|platanos|banana|bananas|fresa|fresas|naranja|naranjas|mandarina|mandarinas|uva|uvas|melon|sandia|pina|kiwi|melocoton|mango|fruta|frutas|arandano|arandanos|frambuesa|ciruela|cereza|apple|orange)\b/i.test(n)) {
    return 'fruit';
  }
  // 9. Dairy
  if (/\b(leche|yogur|yogurt|queso|quesos|cuajada|kefir|mantequilla|nata|requeson|milk|cheese|yogurt)\b/i.test(n)) {
    return 'dairy';
  }
  // 10. Grains
  if (/\b(arroz|pasta|espagueti|macarron|macarrones|avena|cereal|cereales|harina|quinoa|tostada|tostadas|noodle|noodles|ramen|rice|bread|oats)\b/i.test(n) || /\bpan\b/i.test(n)) {
    return 'grains';
  }
  // 11. Healthy Fats
  if (/\b(aceite|oliva|nuez|nueces|almendra|almendras|avellana|avellanas|pistacho|pistachos|aguacate|cacahuete|cacahuetes)\b/i.test(n) || /fruto.*seco|crema.*mani/i.test(n)) {
    return 'healthy_fats';
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
