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

  // Safety expansion: if any intake description contains '+' or '\+', expand it into sub-items
  const expandedIntakes = [];
  intakes.forEach((item, originalIdx) => {
    let cleanDesc = item.description.replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, '').trim();
    if (cleanDesc.includes('+') || cleanDesc.includes('\\+')) {
      const parts = cleanDesc.split(/\\?\+/).map(p => p.trim()).filter(Boolean);
      const count = parts.length;
      parts.forEach(part => {
        expandedIntakes.push({
          time: item.time || '12:00',
          description: part.replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, ''),
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
        description: cleanDesc,
        originalIndex: originalIdx
      });
    }
  });

  // Group by time
  const groupedMeals = [];
  let currentGroup = null;

  expandedIntakes.forEach((item) => {
    const timeKey = item.time || '12:00';
    if (!currentGroup || currentGroup.time !== timeKey) {
      currentGroup = {
        time: timeKey,
        items: []
      };
      groupedMeals.push(currentGroup);
    }
    currentGroup.items.push(item);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {groupedMeals.map((meal, mealIdx) => (
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
              <span>Toma de las {meal.time}</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {meal.items.length} {meal.items.length === 1 ? 'alimento' : 'alimentos juntos'}
            </span>
          </div>

          {/* Individual Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {meal.items.map((item, idx) => {
              const emoji = getFoodEmoji(item.description);
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
                        {item.description}
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
      ))}
    </div>
  );
}
