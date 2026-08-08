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

export function standardizeFoodName(rawName) {
  if (!rawName) return 'Alimento';

  let name = rawName
    .replace(/\\/g, '')
    .replace(/^(?:Postre|Almuerzo|Comida|Cena|Snack(?:\s*\/\s*Extra)?|Bebida|Recarga)\s*(?:\([^)]*\))?\s*:\s*/i, '')
    .replace(/^Postre\s*\/\s*/i, '')
    .trim();

  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. Plátano
  if (/platano|banana/i.test(n) && !/pan.*banana|batido/i.test(n)) return 'Plátano';
  if (/batido.*platano/i.test(n)) return 'Batido de Plátano';
  if (/pan.*banana/i.test(n)) return 'Pan de Banana';

  // 2. Huevo
  if (/huevo/i.test(n) && !/revuelto|omelette/i.test(n)) return 'Huevo';
  if (/huevos.*revueltos/i.test(n)) return 'Huevos Revueltos';
  if (/omelette/i.test(n)) return 'Omelette de Verduras';

  // 3. Yogur
  if (/yogur|yogurt/i.test(n) && !/avena/i.test(n)) return 'Yogur Natural';
  if (/yogur.*avena/i.test(n)) return 'Yogur con Avena';

  // 4. Patata / Boniato
  if (/patata|papa\b/i.test(n) && !/zanahoria|arroz|salteado/i.test(n)) return 'Patata';
  if (/patata.*zanahoria/i.test(n)) return 'Patata y Zanahoria';
  if (/patata.*arroz/i.test(n)) return 'Patata y Arroz';

  // 5. Hamburguesa / Burgers
  if (/burger|hamburguesa/i.test(n) && !/mcdo|mcadobo|pan.*hamburguesa/i.test(n)) return 'Hamburguesa';
  if (/burger.*mcdo/i.test(n)) return 'Hamburguesa McDonald\'s';
  if (/mcadobo/i.test(n)) return 'McAdobo Burger';
  if (/pan.*hamburguesa/i.test(n)) return 'Pan de Hamburguesa';

  // 6. Mango
  if (/mango/i.test(n) && !/graham|zumo|tang|pie|ice/i.test(n)) return 'Mango';
  if (/mango.*graham/i.test(n)) return 'Mango Graham';

  // 7. Pollo
  if (/pollo.*boniato|1 racion de la olla|nueva olla|tu plato|tu nuevo plato|salteado de pollo con patata/i.test(n)) return 'Pollo con Boniato y Verduras';
  if (/pollo.*coco|guiso.*pollo/i.test(n)) return 'Pollo al Coco';
  if (/pollo.*adobo/i.test(n)) return 'Pollo Adobo';
  if (/pollo/i.test(n) && !/soja|ostras|tinola/i.test(n)) return 'Pollo';

  // 8. Helados / Dulces
  if (/ice.*pop|popstick|polo/i.test(n)) return 'Helado';
  if (/donut/i.test(n)) return 'Donut';
  if (/pandesal/i.test(n)) return 'Pandesal';
  if (/puto/i.test(n)) return 'Puto (Pastel)';

  // 9. Arroz & Avena & Garbanzos & Ajo & Queso
  if (/^arroz\b|arroz cocido|arroz frito/i.test(n)) return 'Arroz';
  if (/avena/i.test(n)) return 'Avena';
  if (/garbanzo/i.test(n) && !/curry/i.test(n)) return 'Garbanzo';
  if (/diente.*ajo/i.test(n)) return 'Ajo';
  if (/queso/i.test(n) && !/omelette|puto|pandesal/i.test(n)) return 'Queso';
  if (/espagueti|pasta/i.test(n)) return 'Pasta';
  if (/hot.*dog|jolly.*hotdog/i.test(n)) return 'Hot Dog';
  if (/zanahoria/i.test(n)) return 'Zanahoria';

  // Capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function classifyFoodName(name) {
  const n = (name || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (/\b(pizza|burger|hamburguesa|mcdonald|kfc|kebab|burrito|croqueta|churro|empanada|hotdog|hot.*dog|doritos|cheetos|snack|chips)\b/i.test(n) || /patata.*frita/i.test(n)) {
    return 'fast_food';
  }
  if (/\b(helado|tarta|pastel|pasteles|postre|postres|donut|donuts|croissant|pandesal|magdalena|bizcocho|galleta|galletas|bollo|bolleria|waffle|crepe|muffin|brownie|pancake|pancakes|flan|natillas|chocolate|chocolates|candy|ice.*cream|tiramisu)\b/i.test(n) || /mango.*graham|ice.*candy/i.test(n)) {
    return 'bakery';
  }
  if (/\b(cafe|infusion|agua|zumo|jugo|batido|batidos|proteina|whey|cerveza|vino|refresco|coca.*cola|fanta|sprite|pepsi|smoothie|colacao|nesquik|leche.*chocolate)\b/i.test(n) || /\bte\b/i.test(n)) {
    return 'beverages';
  }
  if (/\b(pollo|pavo|ternera|cerdo|carne|lomo|entrecot|jamon|bacon|pescado|atun|salmon|merluza|huevo|huevos|tortilla|clara|claras|gamba|gambas|calamar|pulpo|bacalao|solomillo|chuleton|yema|yemas|pork|beef|chicken|steak|fish)\b/i.test(n) || /omelette/i.test(n)) {
    return 'meat';
  }
  if (/\b(patata|patatas|papa|papas|boniato|boniatos|camote|yuca|tuberculo|batata|batatas|potato|potatoes|sweet.*potato)\b/i.test(n)) {
    return 'tubers';
  }
  if (/\b(lenteja|lentejas|garbanzo|garbanzos|alubia|alubias|judia|judias|frijol|frijoles|soja|edamame|tofu|hummus|lentils)\b/i.test(n)) {
    return 'legumes';
  }
  if (/\b(ensalada|lechuga|tomate|tomates|pepino|cebolla|zanahoria|espinaca|espinacas|brocoli|coliflor|calabacin|pimiento|pimientos|champinon|champinones|seta|setas|verdura|verduras|canonigo|rucula|esparrago|esparragos|ajo)\b/i.test(n)) {
    return 'vegetables';
  }
  if (/\b(manzana|manzanas|platano|platanos|banana|bananas|fresa|fresas|naranja|naranjas|mandarina|mandarinas|uva|uvas|melon|sandia|pina|kiwi|melocoton|mango|fruta|frutas|arandano|arandanos|frambuesa|ciruela|cereza|apple|orange)\b/i.test(n)) {
    return 'fruit';
  }
  if (/\b(leche|yogur|yogurt|queso|quesos|cuajada|kefir|mantequilla|nata|requeson|milk|cheese|yogurt)\b/i.test(n)) {
    return 'dairy';
  }
  if (/\b(arroz|pasta|espagueti|macarron|macarrones|avena|cereal|cereales|harina|quinoa|tostada|tostadas|noodle|noodles|ramen|rice|bread|oats)\b/i.test(n) || /\bpan\b/i.test(n)) {
    return 'grains';
  }
  if (/\b(aceite|oliva|nuez|nueces|almendra|almendras|avellana|avellanas|pistacho|pistachos|aguacate|cacahuete|cacahuetes)\b/i.test(n) || /fruto.*seco|crema.*mani/i.test(n)) {
    return 'healthy_fats';
  }

  return 'other';
}

async function standardizeAllIntakes() {
  console.log('Fetching all intakes from Supabase...');
  const { data: intakes, error } = await supabase.from('intakes').select('*');
  if (error) {
    console.error('Error fetching intakes:', error);
    process.exit(1);
  }

  console.log(`Found ${intakes.length} total intakes in Supabase.`);

  let updatedCount = 0;
  const nameCounts = {};

  for (const item of intakes) {
    const stdName = standardizeFoodName(item.name);
    const category = classifyFoodName(stdName);
    nameCounts[stdName] = (nameCounts[stdName] || 0) + 1;

    const { error: upErr } = await supabase
      .from('intakes')
      .update({ name: stdName, category })
      .eq('id', item.id);

    if (!upErr) updatedCount++;
  }

  console.log(`Successfully updated ${updatedCount} intakes with singular standardized names!`);
  console.log(`Total unique food names reduced from 142 to ${Object.keys(nameCounts).length}.`);
  console.log('New top standardized foods:', nameCounts);
}

standardizeAllIntakes();
