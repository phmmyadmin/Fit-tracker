export const FOOD_CATEGORIES = {
  meat: { label: 'Carne y Pescado', emoji: '🥩', bg: 'rgba(239, 68, 68, 0.12)', color: '#EF4444' },
  legumes: { label: 'Legumbres', emoji: '🫘', bg: 'rgba(217, 119, 6, 0.12)', color: '#D97706' },
  vegetables: { label: 'Verduras', emoji: '🥦', bg: 'rgba(16, 185, 129, 0.12)', color: '#10B981' },
  tubers: { label: 'Patatas y Tubérculos', emoji: '🥔', bg: 'rgba(180, 83, 9, 0.12)', color: '#B45309' },
  fruit: { label: 'Fruta', emoji: '🍎', bg: 'rgba(236, 72, 153, 0.12)', color: '#EC4899' },
  bakery: { label: 'Bollería', emoji: '🍩', bg: 'rgba(219, 39, 119, 0.15)', color: '#DB2777' },
  fast_food: { label: 'Fast Food', emoji: '🍔', bg: 'rgba(245, 158, 11, 0.15)', color: '#D97706' },
  dairy: { label: 'Lácteos', emoji: '🧀', bg: 'rgba(6, 182, 212, 0.12)', color: '#06B6D4' },
  grains: { label: 'Cereales y Pan', emoji: '🌾', bg: 'rgba(234, 179, 8, 0.12)', color: '#CA8A04' },
  healthy_fats: { label: 'Grasas Saludables', emoji: '🥑', bg: 'rgba(132, 204, 22, 0.12)', color: '#65A30D' },
  beverages: { label: 'Bebidas', emoji: '🥤', bg: 'rgba(99, 102, 241, 0.12)', color: '#4F46E5' },
  other: { label: 'Otros', emoji: '🍲', bg: 'rgba(100, 116, 139, 0.12)', color: '#64748B' }
};

export function getCategoryInfo(categoryKey) {
  const normalized = (categoryKey || '').toLowerCase().trim().replace(/[\s-]+/g, '_');
  return FOOD_CATEGORIES[normalized] || FOOD_CATEGORIES.other;
}
