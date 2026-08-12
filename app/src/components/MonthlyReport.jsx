import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Scale, TrendingDown, Target, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MonthlyReport = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  // Group logs by month
  const monthlyStats = useMemo(() => {
    const stats = {};
    const { maintenanceCalories = 2450 } = data.userProfile;
    const locale = i18n.language.startsWith('es') ? 'es-ES' : 'en-US';

    data.dailyLogs.forEach(log => {
      const parts = log.date.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const dateObj = new Date(year, monthNum - 1, 1);
        const monthNameStr = dateObj.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
        const monthName = monthNameStr.charAt(0).toUpperCase() + monthNameStr.slice(1);
        const monthKey = `${year}-${parts[1]}`;
        
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

    return Object.values(stats).sort((a, b) => b.key.localeCompare(a.key));
  }, [data, i18n.language]);

  if (monthlyStats.length === 0) {
    return <div className="health-card">{t('report.noData')}</div>;
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
  const avgDailyCalories = Math.round(currentMonthData.totalCaloriesConsumed / currentMonthData.daysLogged);
  const estimatedLostKg = totalDeficit > 0 ? (totalDeficit / 7700) : 0;

  // Global Weight & Cumulative Deficit Calculation
  let weightCard = null;
  const weightLog = data.userProfile.weightLog;

  if (weightLog) {
    const startWeight = weightLog.startWeight || 73.0;
    const targetWeight = weightLog.targetWeight || 68.0;

    const totalCumulativeDeficit = monthlyStats.reduce((acc, m) => {
      const monthDeficit = (m.daysLogged * m.maintenanceCaloriesPerDay) - m.totalCaloriesConsumed;
      return acc + monthDeficit;
    }, 0);

    const cumulativeEstimatedLostKg = totalCumulativeDeficit > 0 ? (totalCumulativeDeficit / 7700) : 0;
    const estimatedCurrentWeight = startWeight - cumulativeEstimatedLostKg;
    const remainingToTarget = Math.max(0, estimatedCurrentWeight - targetWeight);
    const totalGoalToLose = startWeight - targetWeight;
    const progressPercent = totalGoalToLose > 0 ? Math.min(100, Math.max(0, (cumulativeEstimatedLostKg / totalGoalToLose) * 100)) : 0;

    weightCard = (
      <div className="health-card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--color-protein-bg)', padding: '0.6rem', borderRadius: '12px' }}>
            <Scale color="var(--color-protein)" size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600 }}>{t('report.estimatedChange')} & {t('nav.progress')}</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('report.monthlySummary')}</div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('progress.initialWeight')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)' }}>{startWeight} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span></div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('progress.estimatedWeight')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-carbs)' }}>
              -{cumulativeEstimatedLostKg.toFixed(1)} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span>
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('progress.estimatedWeight')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-protein)' }}>
              {estimatedCurrentWeight.toFixed(1)} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span>
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t('progress.goal')}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-indigo)' }}>{targetWeight} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>kg</span></div>
          </div>
        </div>

        {targetWeight && (
          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{t('progress.goal')} ({targetWeight} kg)</span>
              <span style={{ color: 'var(--color-protein)', fontWeight: 600 }}>{remainingToTarget.toFixed(1)} kg {t('progress.remaining')}</span>
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
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>{t('report.totalDeficit')}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('report.loggedDays')}: {currentMonthData.daysLogged}</div>
            </div>
          </div>

          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: totalDeficit >= 0 ? 'var(--color-carbs)' : 'var(--color-calories)', marginBottom: '0.5rem' }}>
            {totalDeficit > 0 ? `-${totalDeficit.toLocaleString()}` : `+${Math.abs(totalDeficit).toLocaleString()}`} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>kcal</span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>{t('report.avgCalories')}: </span>
              <strong style={{ color: 'var(--text-main)' }}>{avgDailyCalories} kcal/día</strong>
            </div>
          </div>
        </div>

        {/* Weight Estimator Card */}
        <div className="health-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--color-indigo-subtle)', padding: '0.6rem', borderRadius: '12px' }}>
              <TrendingDown color="var(--color-indigo)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 600 }}>{t('report.estimatedChange')}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Equivalencia ~7,700 kcal / kg de grasa</div>
            </div>
          </div>

          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: totalDeficit >= 0 ? 'var(--color-carbs)' : 'var(--color-calories)', marginBottom: '0.5rem' }}>
            {totalDeficit >= 0 ? `-${estimatedLostKg.toFixed(2)}` : `+${Math.abs(estimatedLostKg).toFixed(2)}`} <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>kg grasa</span>
          </div>
        </div>

      </div>

      {weightCard}
    </div>
  );
};

export default MonthlyReport;
