import React, { useState } from 'react';
import { Trash2, X, Check } from 'lucide-react';

export default function EditDrawer({ item, itemIndex, onClose, onDelete, onUpdateGrams }) {
  if (!item) return null;

  // Extract initial grams if format is "Name (Xg)"
  const gramsMatch = item.description.match(/\((\d+)g\)/);
  const initialGrams = gramsMatch ? parseInt(gramsMatch[1], 10) : 100;
  const [grams, setGrams] = useState(initialGrams);

  const rawName = item.description.replace(/\s*\(\d+g\)/, '');

  const ratio = grams / (initialGrams || 100);
  const newCals = Math.round(item.macros.calories * ratio);
  const newProt = Math.round(item.macros.protein * ratio * 10) / 10;
  const newCarbs = Math.round(item.macros.carbs * ratio * 10) / 10;
  const newFats = Math.round(item.macros.fats * ratio * 10) / 10;

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

        {/* Grams Slider */}
        <div style={{ marginBottom: '1.5rem' }}>
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
            onClick={() => onUpdateGrams(itemIndex, grams, rawName, { calories: newCals, protein: newProt, carbs: newCarbs, fats: newFats })}
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
