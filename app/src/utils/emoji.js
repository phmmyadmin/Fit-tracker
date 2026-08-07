export function getFoodEmoji(name = '') {
  const lower = name.toLowerCase();

  // Fast specific matches
  if (lower.includes('burger') || lower.includes('hamburguesa')) return '🍔';
  if (lower.includes('hot dog') || lower.includes('hotdog')) return '🌭';
  if (lower.includes('shawarma') || lower.includes('durum') || lower.includes('dürüm')) return '🌯';
  if (lower.includes('pasta') || lower.includes('espaguet') || lower.includes('pad thai')) return '🍝';
  if (lower.includes('pizza')) return '🍕';
  if (lower.includes('takoyaki')) return '🐙';
  if (lower.includes('siomai') || lower.includes('dumpling')) return '🥟';
  if (lower.includes('talong') || lower.includes('berenjena')) return '🍆';
  
  // Meat & Fish
  if (lower.includes('pollo') || lower.includes('pechuga') || lower.includes('tinola') || lower.includes('adobo')) return '🍗';
  if (lower.includes('ternera') || lower.includes('beef') || lower.includes('pork') || lower.includes('cerdo') || lower.includes('sizzling') || lower.includes('carne')) return '🥩';
  if (lower.includes('atun') || lower.includes('atún') || lower.includes('pescado') || lower.includes('salmon') || lower.includes('salmón')) return '🐟';

  // Eggs & Dairy
  if (lower.includes('huevo') || lower.includes('yema') || lower.includes('balut') || lower.includes('omelette')) return '🥚';
  if (lower.includes('queso') || lower.includes('cheesy') || lower.includes('cheese')) return '🧀';
  if (lower.includes('yogur') || lower.includes('leche') || lower.includes('milk')) return '🥛';

  // Grains & Carbohydrates
  if (lower.includes('arroz')) return '🍚';
  if (lower.includes('avena') || lower.includes('oats')) return '🥣';
  if (lower.includes('pan') || lower.includes('pandesal') || lower.includes('puto') || lower.includes('bread')) return '🍞';
  if (lower.includes('patata') || lower.includes('papas') || lower.includes('potato')) return '🥔';
  if (lower.includes('garbanzo')) return '🧆';

  // Fruits & Desserts
  if (lower.includes('platano') || lower.includes('plátano') || lower.includes('saba') || lower.includes('banana')) return '🍌';
  if (lower.includes('mango')) return '🥭';
  if (lower.includes('manzana') || lower.includes('apple')) return '🍎';
  if (lower.includes('aguacate') || lower.includes('avocado')) return '🥑';
  if (lower.includes('donut') || lower.includes('ube') || lower.includes('bibingka') || lower.includes('postre') || lower.includes('tarta')) return '🍩';
  if (lower.includes('ice pop') || lower.includes('popstick') || lower.includes('polo') || lower.includes('helado')) return '🍦';
  if (lower.includes('chocolate')) return '🍫';

  // Drinks
  if (lower.includes('juice') || lower.includes('zumo') || lower.includes('buko') || lower.includes('tang')) return '🧃';
  if (lower.includes('tea') || lower.includes('té')) return '🧋';
  if (lower.includes('cafe') || lower.includes('café') || lower.includes('coffee')) return '☕';

  // Vegetables & Salads
  if (lower.includes('ensalada') || lower.includes('lechuga') || lower.includes('sitaw') || lower.includes('pepino') || lower.includes('zanahoria') || lower.includes('pakbet') || lower.includes('vegetal')) return '🥗';
  if (lower.includes('guiso') || lower.includes('curry')) return '🍲';

  return '🍽️';
}
