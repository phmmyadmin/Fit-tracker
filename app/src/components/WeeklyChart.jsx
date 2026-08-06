import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function WeeklyChart({ logs, selectedDate, onSelectDate, targetProtein = 145 }) {
  const last7Days = logs.slice(-7);

  return (
    <div className="health-card" style={{ marginTop: '1.5rem' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <TrendingUp size={20} color="var(--color-indigo)" />
        Tendencia Semanal (Proteína vs Objetivo {targetProtein}g)
      </h2>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 210, gap: '0.75rem', paddingTop: '2rem' }}>
        {last7Days.map((d, idx) => {
          const pPct = Math.min(100, Math.round((d.dailyTotals.protein / targetProtein) * 100));
          const isSelected = d.date === selectedDate;
          const targetMet = d.dailyTotals.protein >= targetProtein * 0.8;

          return (
            <div
              key={idx}
              onClick={() => onSelectDate(d.date)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                height: '100%',
                justifyContent: 'flex-end',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: targetMet ? 'var(--color-indigo)' : 'var(--color-calories)' }}>
                {d.dailyTotals.protein}g
              </span>
              <div
                style={{
                  width: '100%',
                  maxWidth: 36,
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden',
                  border: isSelected ? '2px solid var(--color-indigo)' : '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${pPct}%`,
                    borderRadius: '6px 6px 0 0',
                    background: isSelected
                      ? 'linear-gradient(to top, #4F46E5, #818CF8)'
                      : targetMet ? '#3B82F6' : '#F87171',
                    transition: 'height 0.5s ease'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--color-indigo)' : 'var(--text-muted)' }}>
                {d.date.slice(5)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
