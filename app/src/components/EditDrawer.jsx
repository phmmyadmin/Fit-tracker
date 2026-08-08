import React, { useState, useEffect } from 'react';
import { Trash2, X, Check, Clock, Tag } from 'lucide-react';
import { FOOD_CATEGORIES } from '../utils/category';

export default function EditDrawer({ item, itemIndex, onClose, onDelete, onUpdate }) {
  const [quantity, setQuantity] = useState(1);
  const [initialQuantity, setInitialQuantity] = useState(1);
  const [time, setTime] = useState('12:00');
  const [category, setCategory] = useState('other');

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity || 1);
      setInitialQuantity(item.quantity || 1);
      setTime(item.time || '12:00');
      setCategory(item.category || 'other');
    }
  }, [item]);

  if (!item) return null;

  const rawName = item.name || item.description || '';
  const unit = item.unit || 'porcion';
  
  const ratio = initialQuantity > 0 ? quantity / initialQuantity : 1;

  const newCals = Math.round(item.macros.calories * ratio);
  const newProt = Math.round(item.macros.protein * ratio * 10) / 10;
  const newCarbs = Math.round(item.macros.carbs * ratio * 10) / 10;
  const newFats = Math.round(item.macros.fats * ratio * 10) / 10;

  const handleSave = () => {
    onUpdate(itemIndex, quantity, { calories: newCals, protein: newProt, carbs: newCarbs, fats: newFats }, time, category);
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

        {/* Hora y Categoría */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-subtle)', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-main)' }}>
              <Clock size={15} color="var(--color-indigo)" />
              <span>Hora:</span>
            </div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                padding: '0.25rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'var(--color-indigo)',
                background: 'var(--bg-surface)'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-subtle)', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-main)' }}>
              <Tag size={15} color="var(--color-indigo)" />
              <span>Cat:</span>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '0.25rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'inherit',
                fontWeight: 600,
                fontSize: '0.82rem',
                color: 'var(--text-main)',
                background: 'var(--bg-surface)'
              }}
            >
              {Object.entries(FOOD_CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.emoji} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Slider Controls */}
        <div style={{ marginBottom: '1.5rem' }}>
          {unit === 'g' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Cantidad:</span>
                <span style={{ color: 'var(--color-indigo)', fontSize: '1.1rem', fontWeight: 700 }}>{quantity}g</span>
              </div>
              <input
                type="range"
                min="10"
                max="600"
                step="5"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                style={{ width: '100%', accentColor: 'var(--color-indigo)', cursor: 'pointer', height: 6 }}
              />
            </>
          ) : unit === 'ud' ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Unidades:</span>
                <span style={{ color: 'var(--color-indigo)', fontSize: '1.1rem', fontWeight: 700 }}>{quantity} ud</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-indigo)', cursor: 'pointer', height: 6 }}
              />
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
                <span>Multiplicador de ración:</span>
                <span style={{ color: 'var(--color-indigo)', fontSize: '1.1rem', fontWeight: 700 }}>x{quantity}</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="3"
                step="0.25"
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
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
