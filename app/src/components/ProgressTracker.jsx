import React, { useState } from 'react';
import { Scale, Plus, Trash2, TrendingDown, Target, Info, Check } from 'lucide-react';

const ProgressTracker = ({ data, onUpdateProfile }) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  const currentTimeStr = new Date().toTimeString().slice(0, 5);
  const [inputDate, setInputDate] = useState(todayStr);
  const [inputTime, setInputTime] = useState(currentTimeStr);
  const [inputWeight, setInputWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const { maintenanceCalories = 2450, weightLog } = data.userProfile;
  const startWeight = weightLog?.startWeight || 73.0;
  const targetWeight = weightLog?.targetWeight || 68.0;
  const history = weightLog?.history || [];

  // Calculate cumulative deficit up to a given date (or all-time if no date specified)
  const getCumulativeDeficitUpToDate = (targetDate = null) => {
    let totalDeficit = 0;
    data.dailyLogs.forEach(log => {
      if (!targetDate || log.date <= targetDate) {
        const dayCalories = log.dailyTotals.calories || 0;
        const dayDeficit = maintenanceCalories - dayCalories;
        totalDeficit += dayDeficit;
      }
    });
    return totalDeficit;
  };

  const allTimeDeficit = getCumulativeDeficitUpToDate();
  const allTimeEstimatedLostKg = allTimeDeficit > 0 ? (allTimeDeficit / 7700) : 0;
  const currentEstimatedWeight = startWeight - allTimeEstimatedLostKg;

  const latestRealEntry = history.length > 0 ? history[history.length - 1] : null;
  const latestRealWeight = latestRealEntry ? latestRealEntry.weight : startWeight;

  const weightDiffVsEstimated = latestRealWeight - currentEstimatedWeight;

  const handleAddWeight = async (e) => {
    e.preventDefault();
    if (!inputWeight || isNaN(inputWeight) || parseFloat(inputWeight) <= 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3001/api/weight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: inputDate, time: inputTime, weight: parseFloat(inputWeight) })
      });
      const result = await res.json();
      if (result.success) {
        onUpdateProfile(result.userProfile);
        setInputWeight('');
        setFeedback('Peso registrado con éxito');
        setTimeout(() => setFeedback(null), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWeight = async (item, originalIndex) => {
    try {
      const res = await fetch('http://localhost:3001/api/weight', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: item.date, time: item.time, index: originalIndex })
      });
      const result = await res.json();
      if (result.success) {
        onUpdateProfile(result.userProfile);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const remainingToGoal = Math.max(0, currentEstimatedWeight - targetWeight);
  const totalToLoseGoal = startWeight - targetWeight;
  const progressPercent = totalToLoseGoal > 0 ? Math.min(100, Math.max(0, (allTimeEstimatedLostKg / totalToLoseGoal) * 100)) : 0;

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner: Add Weight Form */}
      <div className="health-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--color-indigo-bg)', padding: '0.5rem', borderRadius: '12px' }}>
            <Scale color="var(--color-indigo)" size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 600 }}>Registrar Pesaje Real</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Añade tu peso báscula para comparar con la estimación teórica</div>
          </div>
        </div>

        <form onSubmit={handleAddWeight} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 130px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Fecha</label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-body)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 100px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Hora</label>
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-body)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 130px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Peso Báscula (kg)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Ej: 72.5"
              value={inputWeight}
              onChange={(e) => setInputWeight(e.target.value)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-body)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !inputWeight}
            style={{
              marginTop: 'auto',
              padding: '0.65rem 1.25rem',
              borderRadius: '12px',
              border: 'none',
              background: 'var(--color-indigo)',
              color: '#FFF',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              opacity: isSubmitting || !inputWeight ? 0.6 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={18} />
            Guardar Peso
          </button>
        </form>

        {feedback && (
          <div style={{ marginTop: '0.75rem', color: 'var(--color-carbs)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Check size={16} /> {feedback}
          </div>
        )}
      </div>

      {/* Main KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="health-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Peso Inicial</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {startWeight} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
        </div>

        <div className="health-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Peso Estimado (Déficit)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-protein)' }}>
            {currentEstimatedWeight.toFixed(1)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-carbs)', marginTop: '0.2rem', fontWeight: 600 }}>
            -{allTimeEstimatedLostKg.toFixed(1)} kg perdidos teóricos
          </div>
        </div>

        <div className="health-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Último Peso Real</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-indigo)' }}>
            {latestRealWeight} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {latestRealEntry ? `${latestRealEntry.date} ${latestRealEntry.time || '08:00'}` : 'Sin pesajes registrados'}
          </div>
        </div>

        <div className="health-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>Desviación (Real vs Est.)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: weightDiffVsEstimated <= 0 ? 'var(--color-carbs)' : '#f59e0b' }}>
            {weightDiffVsEstimated > 0 ? `+${weightDiffVsEstimated.toFixed(1)}` : weightDiffVsEstimated.toFixed(1)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {weightDiffVsEstimated <= 0 ? '¡Vas por delante del déficit!' : 'Ligera retención o diferencia'}
          </div>
        </div>
      </div>

      {/* Progress to Goal Card */}
      <div className="health-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>Meta: {targetWeight} kg</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Basado en tu déficit calórico acumulado ({allTimeDeficit.toLocaleString()} kcal)</span>
          </div>
          <span style={{ color: 'var(--color-protein)', fontWeight: 700, fontSize: '1.1rem' }}>
            {remainingToGoal.toFixed(1)} kg restantes
          </span>
        </div>
        <div style={{ height: '12px', background: 'var(--border-light)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-protein), #a855f7)', borderRadius: '6px', transition: 'width 1s ease' }} />
        </div>
      </div>

      {/* History Table */}
      <div className="health-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <TrendingDown size={20} color="var(--color-indigo)" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Historial de Pesajes & Comparativa</h3>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Aún no has añadido ningún pesaje real. ¡Registra tu primer peso arriba para empezar a comparar!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Fecha y Hora</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Peso Real</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Estimado ese día</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>Diferencia</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => ({ item, originalIndex: idx }))
                  .reverse()
                  .map(({ item, originalIndex }) => {
                  const dayDeficit = getCumulativeDeficitUpToDate(item.date);
                  const dayEstimatedWeight = startWeight - (dayDeficit > 0 ? (dayDeficit / 7700) : 0);
                  const diff = item.weight - dayEstimatedWeight;

                  return (
                    <tr key={`${item.date}-${item.time || idx}`} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>
                        {item.date} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({item.time || '08:00'})</span>
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--color-indigo)' }}>{item.weight} kg</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--color-protein)' }}>{dayEstimatedWeight.toFixed(1)} kg</td>
                      <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: diff <= 0 ? 'var(--color-carbs)' : '#f59e0b' }}>
                        {diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)} kg
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteWeight(item, originalIndex)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '0.3rem',
                            borderRadius: '6px'
                          }}
                          title="Eliminar pesaje"
                        >
                          <Trash2 size={16} color="#ff6b6b" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
