import React, { useState } from 'react';
import { Scale, Plus, Trash2, TrendingDown, Target, Info, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase, saveWeightToSupabase, deleteWeightFromSupabase, fetchDailyLogsFromSupabase } from '../lib/supabase';

const ProgressTracker = ({ data, activeProfileId, onUpdateProfile }) => {
  const { t } = useTranslation();
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
      if (supabase) {
        const res = await saveWeightToSupabase({ date: inputDate, time: inputTime, weight: parseFloat(inputWeight), profileId: activeProfileId });
        if (res && res.success) {
          const freshData = await fetchDailyLogsFromSupabase(activeProfileId);
          if (freshData) onUpdateProfile(freshData.userProfile);
          setInputWeight('');
          setFeedback(t('toast.weightSaved'));
          setTimeout(() => setFeedback(null), 3000);
          return;
        }
      }

      // Local Fallback
      const newEntry = { date: inputDate, time: inputTime, weight: parseFloat(inputWeight) };
      const updatedHistory = [...history.filter(h => !(h.date === inputDate && h.time === inputTime)), newEntry];
      updatedHistory.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

      onUpdateProfile({
        ...data.userProfile,
        weightLog: { ...weightLog, history: updatedHistory }
      });
      setInputWeight('');
      setFeedback(t('toast.weightSaved'));
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWeight = async (item, index) => {
    try {
      if (supabase) {
        const res = await deleteWeightFromSupabase({ date: item.date, time: item.time, profileId: activeProfileId });
        if (res && res.success) {
          const freshData = await fetchDailyLogsFromSupabase(activeProfileId);
          if (freshData) onUpdateProfile(freshData.userProfile);
          return;
        }
      }

      const updatedHistory = history.filter((_, i) => i !== index);
      onUpdateProfile({
        ...data.userProfile,
        weightLog: { ...weightLog, history: updatedHistory }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const remainingToGoal = Math.max(0, latestRealWeight - targetWeight);
  const totalGoalToLose = startWeight - targetWeight;
  const progressPercent = totalGoalToLose > 0 ? Math.min(100, Math.max(0, ((startWeight - latestRealWeight) / totalGoalToLose) * 100)) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Input Form Card */}
      <div className="health-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <Scale size={22} color="var(--color-indigo)" />
          <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>{t('progress.logRealWeight')}</h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          {t('progress.logSubtitle')}
        </p>

        <form onSubmit={handleAddWeight} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
              {t('progress.date')}
            </label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="edit-input"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
              {t('progress.time')}
            </label>
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="edit-input"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
              {t('progress.scaleWeight')}
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="Ej: 71.5"
              value={inputWeight}
              onChange={(e) => setInputWeight(e.target.value)}
              className="edit-input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              border: 'none',
              background: 'var(--color-indigo)',
              color: '#FFF',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              height: '44px',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)'
            }}
          >
            <Plus size={18} />
            {t('progress.saveWeight')}
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
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>{t('progress.initialWeight')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {startWeight} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
        </div>

        <div className="health-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>{t('progress.estimatedWeight')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-protein)' }}>
            {currentEstimatedWeight.toFixed(1)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-carbs)', marginTop: '0.2rem', fontWeight: 600 }}>
            -{allTimeEstimatedLostKg.toFixed(1)} kg {t('report.estimatedChange')}
          </div>
        </div>

        <div className="health-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>{t('progress.latestRealWeight')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-indigo)' }}>
            {latestRealWeight} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {latestRealEntry ? `${latestRealEntry.date} ${latestRealEntry.time || '08:00'}` : t('progress.noWeights')}
          </div>
        </div>

        <div className="health-card" style={{ textAlign: 'center', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>{t('progress.deviation')}</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: weightDiffVsEstimated <= 0 ? 'var(--color-carbs)' : '#f59e0b' }}>
            {weightDiffVsEstimated > 0 ? `+${weightDiffVsEstimated.toFixed(1)}` : weightDiffVsEstimated.toFixed(1)} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            {weightDiffVsEstimated <= 0 ? t('progress.aheadOfDeficit') : t('progress.slightDifference')}
          </div>
        </div>
      </div>

      {/* Progress to Goal Card */}
      <div className="health-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>{t('progress.goal')}: {targetWeight} kg</h3>
          </div>
          <span style={{ color: 'var(--color-protein)', fontWeight: 700, fontSize: '1.1rem' }}>
            {remainingToGoal.toFixed(1)} kg {t('progress.remaining')}
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
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{t('progress.history')}</h3>
        </div>

        {history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {t('progress.noWeights')}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{t('progress.dateTime')}</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{t('progress.realWeight')}</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{t('progress.estimatedThatDay')}</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>{t('progress.difference')}</th>
                  <th style={{ padding: '0.75rem 0.5rem', fontWeight: 600, textAlign: 'right' }}>{t('progress.action')}</th>
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
                    <tr key={`${item.date}-${item.time || originalIndex}`} style={{ borderBottom: '1px solid var(--border-light)' }}>
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
