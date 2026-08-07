import React from 'react';
import { Clock, Edit2 } from 'lucide-react';
import { getFoodEmoji } from '../utils/emoji';

export default function DailyTimeline({ intakes, onItemClick }) {
  if (!intakes || intakes.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>
        No hay comidas registradas para este día. Escribe abajo para añadir.
      </div>
    );
  }

  // Safety expansion: if any intake name contains '+' or '\+', expand it into sub-items
  const expandedIntakes = [];
  intakes.forEach((item, originalIdx) => {
    // For backwards compatibility, use item.name or fallback to item.description
    const rawName = item.name || item.description || '';
    let cleanName = rawName.replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, '').trim();
    
    if (cleanName.includes('+') || cleanName.includes('\\+')) {
      const parts = cleanName.split(/\\?\+/).map(p => p.trim()).filter(Boolean);
      const count = parts.length;
      parts.forEach(part => {
        expandedIntakes.push({
          time: item.time || '12:00',
          dishName: item.dishName,
          name: part.replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, ''),
          quantity: 1,
          unit: 'porcion',
          macros: {
            calories: Math.round(item.macros.calories / count),
            protein: Math.round((item.macros.protein / count) * 10) / 10,
            carbs: Math.round((item.macros.carbs / count) * 10) / 10,
            fats: Math.round((item.macros.fats / count) * 10) / 10
          },
          originalIndex: originalIdx
        });
      });
    } else {
      expandedIntakes.push({
        ...item,
        name: cleanName,
        originalIndex: originalIdx
      });
    }
  });

  // Group by time and dishName
  const groupedMeals = [];
  let currentGroup = null;

  expandedIntakes.forEach((item) => {
    const timeKey = item.time || '12:00';
    const groupKey = item.dishName ? `${timeKey}-${item.dishName}` : timeKey;
    
    if (!currentGroup || currentGroup.key !== groupKey) {
      currentGroup = {
        key: groupKey,
        time: timeKey,
        dishName: item.dishName,
        items: []
      };
      groupedMeals.push(currentGroup);
    }
    currentGroup.items.push(item);
  });

  const getFormatDisplay = (item) => {
    if (item.unit === 'g') return `${item.name} (${item.quantity}g)`;
    if (item.unit === 'ud') return `${item.name} (${item.quantity} ud)`;
    if (item.unit === 'porcion' && item.quantity !== 1) return `${item.name} (x${item.quantity})`;
    return item.name;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {groupedMeals.map((meal, mealIdx) => {
        const groupTotalCalories = meal.items.reduce((sum, item) => sum + (item.macros?.calories || 0), 0);
        return (
          <div
            key={mealIdx}
            style={{
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              borderLeft: '4px solid var(--color-indigo)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            {/* Group Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
                paddingBottom: '0.4rem',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-indigo)', fontWeight: 700 }}>
                <Clock size={14} />
                <span>
                  {meal.dishName ? `${meal.time} - ${meal.dishName}` : `Toma de las ${meal.time}`}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{
                  fontSize: '0.78rem',
                  background: 'rgba(239, 68, 68, 0.12)',
                  color: 'var(--color-calories)',
                  fontWeight: 700,
                  padding: '0.15rem 0.55rem',
                  borderRadius: '12px'
                }}>
                  {groupTotalCalories} kcal
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  ({meal.items.length} {meal.items.length === 1 ? 'alimento' : 'alimentos'})
                </span>
              </div>
            </div>

          {/* Individual Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {meal.items.map((item, idx) => {
              const displayTitle = getFormatDisplay(item);
              const emoji = getFoodEmoji(item.name);
              return (
                <div
                  key={idx}
                  onClick={() => onItemClick && onItemClick(item, item.originalIndex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.75rem',
                    background: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        {displayTitle}
                      </div>
                      <div style={{ display: 'flex', gap: '0.6rem', fontSize: '0.75rem', marginTop: '0.15rem' }}>
                        <span style={{ color: 'var(--color-calories)', fontWeight: 600 }}>{item.macros.calories} kcal</span>
                        <span style={{ color: 'var(--color-protein)', fontWeight: 600 }}>{item.macros.protein}g P</span>
                        <span style={{ color: 'var(--color-carbs)', fontWeight: 600 }}>{item.macros.carbs}g C</span>
                        <span style={{ color: 'var(--color-fats)', fontWeight: 600 }}>{item.macros.fats}g G</span>
                      </div>
                    </div>
                  </div>

                  <Edit2 size={15} color="var(--text-subtle)" />
                </div>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
  );
}
