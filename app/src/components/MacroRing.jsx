import React from 'react';

export default function MacroRing({ value, target, unit, label, color, bgColor }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="macro-ring-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ position: 'relative', width: 88, height: 88 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r={radius}
            stroke={bgColor || "#F4F4F5"}
            strokeWidth="9"
            fill="transparent"
          />
          <circle
            cx="44"
            cy="44"
            r={radius}
            stroke={color}
            strokeWidth="9"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            transform="rotate(-90 44 44)"
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)'
          }}
        >
          <span>{value}</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 }}>/{target}{unit}</span>
        </div>
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{label}</span>
    </div>
  );
}
