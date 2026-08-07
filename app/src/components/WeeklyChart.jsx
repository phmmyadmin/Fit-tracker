import React, { useState } from 'react';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WeeklyChart({ logs, selectedDate, onSelectDate, targetMacros }) {
  const [activeMacro, setActiveMacro] = useState('calories');
  const [weekOffset, setWeekOffset] = useState(0);

  const macrosConfig = {
    calories: { label: 'Kcal', color: 'var(--color-calories)', target: targetMacros.calories },
    protein: { label: 'Proteína', color: 'var(--color-protein)', target: targetMacros.protein },
    carbs: { label: 'Carbs', color: 'var(--color-carbs)', target: targetMacros.carbs },
    fats: { label: 'Grasas', color: 'var(--color-fats)', target: targetMacros.fats }
  };

  const currentConfig = macrosConfig[activeMacro];

  const startIndex = Math.max(0, logs.length - 7 * (weekOffset + 1));
  const endIndex = logs.length - 7 * weekOffset;
  const visibleDays = logs.slice(startIndex, endIndex);
  const maxOffset = Math.ceil(logs.length / 7) - 1;

  const formatShortDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };
  
  const dateRangeStr = visibleDays.length > 0 
    ? `${formatShortDate(visibleDays[0].date)} - ${formatShortDate(visibleDays[visibleDays.length - 1].date)}`
    : '';

  return (
    <div className="health-card" style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <TrendingUp size={20} color={currentConfig.color} />
          Tendencia Semanal
        </h2>
        
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)' }}>
          {Object.entries(macrosConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveMacro(key)}
              style={{
                background: activeMacro === key ? 'var(--bg-surface)' : 'transparent',
                color: activeMacro === key ? config.color : 'var(--text-muted)',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: activeMacro === key ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button 
          onClick={() => setWeekOffset(prev => Math.min(maxOffset, prev + 1))}
          disabled={weekOffset >= maxOffset}
          style={{ background: 'none', border: 'none', cursor: weekOffset >= maxOffset ? 'not-allowed' : 'pointer', color: 'var(--text-muted)' }}
        >
          <ChevronLeft size={20} />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {dateRangeStr}
          </span>
          <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Objetivo: {currentConfig.target} {activeMacro === 'calories' ? 'kcal' : 'g'}
          </span>
        </div>
        <button 
          onClick={() => setWeekOffset(prev => Math.max(0, prev - 1))}
          disabled={weekOffset === 0}
          style={{ background: 'none', border: 'none', cursor: weekOffset === 0 ? 'not-allowed' : 'pointer', color: 'var(--text-muted)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 210, gap: '0.75rem', paddingTop: '1rem' }}>
        {visibleDays.map((d, idx) => {
          const val = d.dailyTotals[activeMacro];
          const target = currentConfig.target;
          const pPct = Math.min(100, Math.round((val / target) * 100));
          const isSelected = d.date === selectedDate;
          
          let targetMet = false;
          if (activeMacro === 'calories') {
             // For calories, being under or slightly over is good
             targetMet = val > 0 && val <= target * 1.1; 
          } else {
             // For protein/carbs/fats, being near target is good
             targetMet = val >= target * 0.8;
          }

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
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: targetMet ? currentConfig.color : 'var(--text-muted)' }}>
                {Math.round(val)}
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
                  border: isSelected ? `2px solid ${currentConfig.color}` : '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${pPct}%`,
                    borderRadius: '6px 6px 0 0',
                    background: isSelected
                      ? currentConfig.color
                      : targetMet ? currentConfig.color : '#9CA3AF',
                    opacity: isSelected ? 1 : 0.7,
                    transition: 'height 0.5s ease, background 0.3s ease'
                  }}
                />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--text-main)' : 'var(--text-muted)' }}>
                {d.date.slice(5)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
