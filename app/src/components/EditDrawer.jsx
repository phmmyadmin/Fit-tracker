import React, { useState, useEffect } from 'react';
import { Trash2, X, Check } from 'lucide-react';

export default function EditDrawer({ item, itemIndex, onClose, onDelete, onUpdate }) {
  const [mode, setMode] = useState('grams'); // 'grams' | 'multiplier'
  const [grams, setGrams] = useState(100);
  const [initialGrams, setInitialGrams] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [initialMultiplier, setInitialMultiplier] = useState(1);

  useEffect(() => {
    if (item) {
      const gMatch = item.description.match(/\((\d+)g\)/);
      const mMatch = item.description.match(/\(x([\d.]+)\)/);
      if (gMatch) {
        const g = parseInt(gMatch[1], 10);
        setGrams(g);
        setInitialGrams(g);
        setMode('grams');
      } else if (mMatch) {
        const m = parseFloat(mMatch[1]);
        setMultiplier(m);
        setInitialMultiplier(m);
        setMode('multiplier');
      } else {
        setMultiplier(1);
        setInitialMultiplier(1);
        setMode('multiplier');
      }
    }
  }, [item]);

  if (!item) return null;

  const rawName = item.description.replace(/\s*\(\d+g\)/, '').replace(/\s*\(x[\d.]+\)/, '');

  const gRatio = initialGrams > 0 ? grams / initialGrams : 1;
  const mRatio = initialMultiplier > 0 ? multiplier / initialMultiplier : 1;
  const finalRatio = mode === 'grams' ? gRatio : mRatio;

  const newCals = Math.round(item.macros.calories * finalRatio);
  const newProt = Math.round(item.macros.protein * finalRatio * 10) / 10;
  const newCarbs = Math.round(item.macros.carbs * finalRatio * 10) / 10;
  const newFats = Math.round(item.macros.fats * finalRatio * 10) / 10;

  const handleSave = () => {
    let newDesc = rawName;
    if (mode === 'grams') {
      newDesc = `${rawName} (${grams}g)`;
    } else {
      if (multiplier !== 1) {
        newDesc = `${rawName} (x${multiplier})`;
      }
    }
    onUpdate(itemIndex, newDesc, { calories: newCals, protein: newProt, carbs: newCarbs, fats: newFats });
  };

  return (
    <div className="bottom-sheet-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700 }}>
              Editar Ingesta
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{rawName}</span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'var(--bg-subtle)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Slider Controls */}
        <div style={{ marginBottom: '1.5rem' }}>
          {mode === 'grams' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Cantidad en gramos:</span>
                <span style={{ color: 'var(--color-indigo)', fontSize: '1.1rem', fontWeight: 700 }}>{grams}g</span>
              </div>
              <input
                type="range"
                min="10"
                max="600"
                step="5"
                value={grams}
                onChange={(e) => setGrams(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--color-indigo)', cursor: 'pointer', height: 6 }}
              />
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Multiplicador de ración:</span>
                <span style={{ color: 'var(--color-indigo)', fontSize: '1.1rem', fontWeight: 700 }}>x{multiplier}</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="3"
                step="0.25"
                value={multiplier}
                onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-indigo)', cursor: 'pointer', height: 6 }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                <span>¼ ración</span>
                <span>1 ración</span>
                <span>3 raciones</span>
              </div>
            </>
          )}
        </div>

        {/* Preview Macros */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            background: 'var(--bg-subtle)',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>KCAL</span>
            <span style={{ fontWeight: 700, color: 'var(--color-calories)' }}>{newCals}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>PROT</span>
            <span style={{ fontWeight: 700, color: 'var(--color-protein)' }}>{newProt}g</span>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>CARB</span>
            <span style={{ fontWeight: 700, color: 'var(--color-carbs)' }}>{newCarbs}g</span>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>GRASA</span>
            <span style={{ fontWeight: 700, color: 'var(--color-fats)' }}>{newFats}g</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => onDelete(itemIndex)}
            style={{
              flex: 1,
              background: 'var(--color-calories-bg)',
              color: 'var(--color-calories)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Trash2 size={16} />
            Eliminar
          </button>

          <button
            onClick={handleSave}
            style={{
              flex: 2,
              background: 'var(--color-indigo)',
              color: '#FFF',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Check size={16} />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
