import React, { useState } from 'react';
import { TrendingUp, ChevronLeft, ChevronRight, PieChart, X } from 'lucide-react';
import { FOOD_CATEGORIES, getCategoryInfo } from '../utils/category';

export default function WeeklyChart({ logs, selectedDate, onSelectDate, targetMacros, onUpdateCategory }) {
  const [activeMacro, setActiveMacro] = useState('calories');
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedCategoryModal, setSelectedCategoryModal] = useState(null);

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
        
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-subtle)', padding: '4px', borderRadius: 'var(--radius-md)', maxWidth: '100%', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {Object.entries(macrosConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveMacro(key)}
              style={{
                background: activeMacro === key ? 'var(--bg-surface)' : 'transparent',
                color: activeMacro === key ? config.color : 'var(--text-muted)',
                border: 'none',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
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

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 210, gap: '0.35rem', paddingTop: '1rem' }}>
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

          // Format YYYY-MM-DD to DD/MM
          const parts = d.date.split('-');
          const formattedLabel = parts.length === 3 ? `${parts[2]}/${parts[1]}` : d.date.slice(5);

          return (
            <div
              key={idx}
              onClick={() => onSelectDate(d.date)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                height: '100%',
                justifyContent: 'flex-end',
                cursor: 'pointer',
                minWidth: 0
              }}
            >
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: targetMet ? currentConfig.color : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
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
              <span style={{ 
                fontSize: '0.68rem', 
                fontWeight: isSelected ? 700 : 500, 
                color: isSelected ? 'var(--text-main)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.02em'
              }}>
                {formattedLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Categorías de Alimentos Consumidos esta Semana */}
      {(() => {
        const categoryStats = {};
        visibleDays.forEach((dayLog) => {
          (dayLog.intakes || []).forEach((item) => {
            const catKey = (item.category || 'other').toLowerCase().trim();
            if (!categoryStats[catKey]) {
              categoryStats[catKey] = {
                key: catKey,
                totalCount: 0,
                totalCalories: 0,
                foodItems: {}
              };
            }
            categoryStats[catKey].totalCount += 1;
            categoryStats[catKey].totalCalories += item.macros?.calories || 0;

            const rawName = item.name || 'Alimento';
            let cleanName = rawName.replace(/^(?:Comida|Desayuno|Cena|Snack|Merienda)\s*\d*:\s*/i, '').trim();
            if (!categoryStats[catKey].foodItems[cleanName]) {
              categoryStats[catKey].foodItems[cleanName] = {
                name: cleanName,
                count: 0,
                totalCalories: 0,
                categoryKey: catKey,
                rawItems: []
              };
            }
            categoryStats[catKey].foodItems[cleanName].count += 1;
            categoryStats[catKey].foodItems[cleanName].totalCalories += (item.macros?.calories || 0);
            categoryStats[catKey].foodItems[cleanName].rawItems.push(item);
          });
        });

        const sortedCategories = Object.values(categoryStats).sort((a, b) => b.totalCount - a.totalCount);

        return (
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', color: 'var(--text-main)', margin: 0 }}>
              <PieChart size={18} color="var(--color-indigo)" />
              Frecuencia por Categorías ({dateRangeStr})
            </h3>

            {sortedCategories.length === 0 ? (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                No hay alimentos registrados en esta semana.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.65rem', marginTop: '0.85rem' }}>
                {sortedCategories.map((catStat) => {
                  const catInfo = getCategoryInfo(catStat.key);
                  return (
                    <div
                      key={catStat.key}
                      onClick={() => setSelectedCategoryModal(catStat)}
                      style={{
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.4rem'
                      }}
                      title="Haz clic para ver el desglose y editar categorías"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '1.3rem' }}>{catInfo.emoji}</span>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: catInfo.bg,
                          color: catInfo.color,
                          padding: '0.1rem 0.45rem',
                          borderRadius: '10px'
                        }}>
                          {catStat.totalCount} {catStat.totalCount === 1 ? 'vez' : 'veces'}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                          {catInfo.label}
                        </div>
                        <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                          {catStat.totalCalories} kcal
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}

      {/* Modal Desglose por Categoría */}
      {selectedCategoryModal && (() => {
        const catInfo = getCategoryInfo(selectedCategoryModal.key);
        const foodList = Object.values(selectedCategoryModal.foodItems).sort((a, b) => b.count - a.count);
        return (
          <div className="bottom-sheet-overlay" onClick={() => setSelectedCategoryModal(null)}>
            <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.6rem' }}>{catInfo.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                      {catInfo.label}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {selectedCategoryModal.totalCount} consumo(s) • {selectedCategoryModal.totalCalories} kcal totales ({dateRangeStr})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCategoryModal(null)}
                  style={{ background: 'var(--bg-subtle)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '55vh', overflowY: 'auto' }}>
                {foodList.length === 0 ? (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
                    Todos los alimentos de esta categoría han sido recategorizados.
                  </div>
                ) : (
                  foodList.map((food, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                        padding: '0.75rem 0.85rem',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)', flex: 1, minWidth: 0, paddingRight: '0.5rem' }}>
                          {food.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-calories)', fontWeight: 600 }}>
                            {food.totalCalories} kcal
                          </span>
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: 'var(--bg-surface)',
                            padding: '0.15rem 0.55rem',
                            borderRadius: '10px',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--color-indigo)'
                          }}>
                            {food.count} {food.count === 1 ? 'vez' : 'veces'}
                          </span>
                        </div>
                      </div>

                      {/* Dropdown Selector para Cambiar Categoría Directamente */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Categoría:</span>
                        <select
                          value={food.categoryKey}
                          onChange={(e) => {
                            const newCat = e.target.value;
                            if (newCat === food.categoryKey) return;
                            if (onUpdateCategory) {
                              onUpdateCategory(food.rawItems, newCat);
                            }
                            setSelectedCategoryModal(prev => {
                              if (!prev) return null;
                              const updatedFoodItems = { ...prev.foodItems };
                              delete updatedFoodItems[food.name];
                              return {
                                ...prev,
                                totalCount: Math.max(0, prev.totalCount - food.count),
                                totalCalories: Math.max(0, prev.totalCalories - food.totalCalories),
                                foodItems: updatedFoodItems
                              };
                            });
                          }}
                          style={{
                            background: 'var(--bg-surface)',
                            color: 'var(--text-main)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          {Object.entries(FOOD_CATEGORIES).map(([catKey, catMeta]) => (
                            <option key={catKey} value={catKey}>
                              {catMeta.emoji} {catMeta.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
