import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Scale, TrendingDown, Target, Flame } from 'lucide-react';
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const MonthlyReport = ({ data }) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  // Group logs by month
  const monthlyStats = useMemo(() => {
    const stats = {};
    const { maintenanceCalories = 2450 } = data.userProfile;

    data.dailyLogs.forEach(log => {
      // Parse date "2026-07-13"
      const parts = log.date.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const monthName = `${MONTHS[monthNum - 1]} ${year}`;
        const monthKey = `${year}-${parts[1]}`; // e.g. "2026-07"
        
        if (!stats[monthKey]) {
          stats[monthKey] = {
            name: monthName,
            key: monthKey,
            daysLogged: 0,
            totalCaloriesConsumed: 0,
            maintenanceCaloriesPerDay: maintenanceCalories,
            intakesCount: 0
          };
        }
        
        stats[monthKey].daysLogged += 1;
        stats[monthKey].totalCaloriesConsumed += log.dailyTotals.calories;
        stats[monthKey].intakesCount += log.intakes.length;
      }
    });

    return Object.values(stats).sort((a, b) => b.key.localeCompare(a.key)); // Newest first
  }, [data]);

  if (monthlyStats.length === 0) {
    return <div className="health-card">No hay datos suficientes para un reporte mensual.</div>;
  }

  const handlePrev = () => {
    if (selectedMonthIndex < monthlyStats.length - 1) setSelectedMonthIndex(selectedMonthIndex + 1);
  };

  const handleNext = () => {
    if (selectedMonthIndex > 0) setSelectedMonthIndex(selectedMonthIndex - 1);
  };

  const currentMonthData = monthlyStats[selectedMonthIndex];
  
  // Calculations
  const totalMaintenance = currentMonthData.daysLogged * currentMonthData.maintenanceCaloriesPerDay;
  const totalDeficit = totalMaintenance - currentMonthData.totalCaloriesConsumed;
  
  // Weight Logic
  const weightLog = data.userProfile.weightLog;
  let weightCard = null;
  
  if (weightLog && weightLog.history && weightLog.history.length > 0) {
    const { startWeight, targetWeight, history } = weightLog;
    
    // Find weights for this month
    const monthWeights = history.filter(w => w.date.startsWith(currentMonthData.key));
    const latestWeight = history[history.length - 1].weight;
    
    let monthLost = 0;
    if (monthWeights.length > 1) {
      monthLost = monthWeights[0].weight - monthWeights[monthWeights.length - 1].weight;
    } else if (monthWeights.length === 1 && history.length > 1) {
      monthLost = startWeight - latestWeight; // fallback to overall if only 1 data point this month
    }

    const estimatedLostKg = totalDeficit > 0 ? (totalDeficit / 7700) : 0;
    const estimatedCurrentWeight = latestWeight - estimatedLostKg;
    const remainingToTarget = Math.max(0, estimatedCurrentWeight - targetWeight);
    const totalGoalToLose = latestWeight - targetWeight;
    const progressPercent = totalGoalToLose > 0 ? Math.min(100, Math.max(0, (estimatedLostKg / totalGoalToLose) * 100)) : 0;

    weightCard = (
      <div className="health-card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--color-protein-bg)', padding: '0.6rem', borderRadius: '12px' }}>
            <Scale color="var(--color-protein)" size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>Estimación de Peso & Progreso</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Calculado a partir de tu déficit calórico acumulado</div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Peso Inicial</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>{latestWeight} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span></div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Perdido Estimado</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-carbs)' }}>
              -{estimatedLostKg.toFixed(1)} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span>
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Peso Estimado</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-protein)' }}>
              {estimatedCurrentWeight.toFixed(1)} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span>
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Meta</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-indigo)' }}>{targetWeight} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span></div>
          </div>
        </div>

        {targetWeight && (
          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Progreso estimado al objetivo ({targetWeight} kg)</span>
              <span style={{ color: 'var(--color-protein)', fontWeight: 600 }}>{remainingToTarget.toFixed(1)} kg restantes</span>
            </div>
            <div style={{ height: '10px', background: 'var(--border-light)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-protein), #a855f7)', borderRadius: '5px', transition: 'width 1s ease' }} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      {/* Month Navigator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px' }}>
        <button className="nav-btn" onClick={handlePrev} disabled={selectedMonthIndex === monthlyStats.length - 1}>
          <ChevronLeft size={20} />
        </button>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{currentMonthData.name}</h2>
        <button className="nav-btn" onClick={handleNext} disabled={selectedMonthIndex === 0}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Deficit Card */}
        <div className="health-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(255, 107, 107, 0.15)', padding: '0.6rem', borderRadius: '12px' }}>
              <Flame color="#ff6b6b" size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>Déficit Calórico Total</h2>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Balance acumulado en {currentMonthData.daysLogged} días
            </div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: totalDeficit > 0 ? 'var(--color-carbs)' : '#ff6b6b', lineHeight: 1 }}>
              {totalDeficit > 0 ? '-' : '+'}{Math.abs(Math.round(totalDeficit)).toLocaleString()}
            </div>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginTop: '0.5rem', fontWeight: 600 }}>
              kcal
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', padding: '1rem', background: 'var(--bg-body)', borderRadius: '12px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mantenimiento Estimado</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>{Math.round(totalMaintenance).toLocaleString()} kcal</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calorías Consumidas</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-calories)' }}>{Math.round(currentMonthData.totalCaloriesConsumed).toLocaleString()} kcal</div>
            </div>
          </div>
          
          {totalDeficit > 0 && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <TrendingDown color="var(--color-carbs)" size={20} />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                Un déficit de <strong>{Math.round(totalDeficit).toLocaleString()} kcal</strong> equivale teóricamente a una pérdida de grasa de unos <strong>{(totalDeficit / 7700).toFixed(1)} kg</strong>.
              </span>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="health-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '0.6rem', borderRadius: '12px' }}>
              <Target color="var(--color-indigo)" size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>Resumen del Mes</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-body)', borderRadius: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Días registrados</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{currentMonthData.daysLogged} días</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-body)', borderRadius: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total de comidas</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{currentMonthData.intakesCount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-body)', borderRadius: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Media calórica diaria</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-calories)' }}>
                {Math.round(currentMonthData.totalCaloriesConsumed / currentMonthData.daysLogged).toLocaleString()} kcal/día
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-body)', borderRadius: '12px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Déficit medio diario</span>
              <span style={{ fontWeight: 600, fontSize: '1.1rem', color: totalDeficit > 0 ? 'var(--color-carbs)' : '#ff6b6b' }}>
                {totalDeficit > 0 ? '-' : '+'}{Math.round(Math.abs(totalDeficit) / currentMonthData.daysLogged).toLocaleString()} kcal/día
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {weightCard}

    </div>
  );
};

export default MonthlyReport;
