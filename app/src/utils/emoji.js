export function getFoodEmoji(name = '') {
  const lower = name.toLowerCase();
  if (lower.includes('pollo') || lower.includes('pechuga')) return '🍗';
  if (lower.includes('platano') || lower.includes('saba') || lower.includes('banana')) return '🍌';
  if (lower.includes('huevo')) return '🥚';
  if (lower.includes('mango')) return '🥭';
  if (lower.includes('arroz')) return '🍚';
  if (lower.includes('pan') || lower.includes('pandesal')) return '🍞';
  if (lower.includes('atun') || lower.includes('pescado') || lower.includes('salmon')) return '🐟';
  if (lower.includes('carne') || lower.includes('ternera') || lower.includes('hamburguesa')) return '🥩';
  if (lower.includes('queso') || lower.includes('cheese')) return '🧀';
  if (lower.includes('leche') || lower.includes('yogur') || lower.includes('milk')) return '🥛';
  if (lower.includes('cafe') || lower.includes('coffee')) return '☕';
  if (lower.includes('manzana') || lower.includes('apple')) return '🍎';
  if (lower.includes('ensalada') || lower.includes('lechuga') || lower.includes('verdura')) return '🥗';
  if (lower.includes('aguacate') || lower.includes('avocado')) return '🥑';
  if (lower.includes('chocolate')) return '🍫';
  if (lower.includes('avena') || lower.includes('oats')) return '🥣';
  if (lower.includes('patata') || lower.includes('papas')) return '🥔';
  return '🍽️';
}
