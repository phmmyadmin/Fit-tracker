import React from 'react';
import { Clock } from 'lucide-react';

export default function DailyTimeline({ intakes }) {
  if (!intakes || intakes.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '2rem' }}>
        No hay comidas registradas para este día.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {intakes.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-indigo)', fontWeight: 600, marginBottom: '0.2rem' }}>
              <Clock size={13} />
              <span>{item.time || "12:00"}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.description}</div>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', marginTop: '0.4rem' }}>
              <span style={{ color: 'var(--color-calories)', fontWeight: 600 }}>{item.macros.calories} kcal</span>
              <span style={{ color: 'var(--color-protein)', fontWeight: 600 }}>{item.macros.protein}g P</span>
              <span style={{ color: 'var(--color-carbs)', fontWeight: 600 }}>{item.macros.carbs}g C</span>
              <span style={{ color: 'var(--color-fats)', fontWeight: 600 }}>{item.macros.fats}g G</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
