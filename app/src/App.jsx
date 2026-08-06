import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import MacroRing from './components/MacroRing';
import DailyTimeline from './components/DailyTimeline';
import WeeklyChart from './components/WeeklyChart';
import './index.css';

export default function App() {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetch('/food_log.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.dailyLogs && json.dailyLogs.length > 0) {
          setSelectedDate(json.dailyLogs[json.dailyLogs.length - 1].date);
        }
      })
      .catch((err) => console.error("Error al cargar food_log.json", err));
  }, []);

  if (!data) {
    return (
      <div className="app-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)' }}>
          Cargando diario nutricional...
        </h2>
      </div>
    );
  }

  const { targetMacros } = data.userProfile;
  const currentLog = data.dailyLogs.find((l) => l.date === selectedDate) || {
    intakes: [],
    dailyTotals: { calories: 0, protein: 0, carbs: 0, fats: 0 }
  };

  const totals = currentLog.dailyTotals;
  const allDates = data.dailyLogs.map((l) => l.date);
  const currentIndex = allDates.indexOf(selectedDate);

  const prevDate = () => {
    if (currentIndex > 0) setSelectedDate(allDates[currentIndex - 1]);
  };

  const nextDate = () => {
    if (currentIndex < allDates.length - 1) setSelectedDate(allDates[currentIndex + 1]);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div>
          <h1 className="app-title">Fit Tracker</h1>
          <p className="app-subtitle">Control Nutricional & Déficit Calórico</p>
        </div>

        <div className="date-selector">
          <button className="nav-btn" onClick={prevDate} disabled={currentIndex === 0}>
            <ChevronLeft size={16} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} color="var(--color-indigo)" />
            <span>{selectedDate}</span>
          </div>
          <button className="nav-btn" onClick={nextDate} disabled={currentIndex === allDates.length - 1}>
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="tab-group">
        <button
          className={`tab-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard Diario
        </button>
        <button
          className={`tab-item ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          Tendencias Semanales
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Left: Macro Rings Card */}
          <div className="health-card">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: 600 }}>
              Resumen de Macronutrientes
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', justifyItems: 'center' }}>
              <MacroRing
                value={totals.calories}
                target={targetMacros.calories}
                unit="kcal"
                label="Calorías"
                color="var(--color-calories)"
                bgColor="var(--color-calories-bg)"
              />
              <MacroRing
                value={totals.protein}
                target={targetMacros.protein}
                unit="g"
                label="Proteína"
                color="var(--color-protein)"
                bgColor="var(--color-protein-bg)"
              />
              <MacroRing
                value={totals.carbs}
                target={targetMacros.carbs}
                unit="g"
                label="Carbohidratos"
                color="var(--color-carbs)"
                bgColor="var(--color-carbs-bg)"
              />
              <MacroRing
                value={totals.fats}
                target={targetMacros.fats}
                unit="g"
                label="Grasas"
                color="var(--color-fats)"
                bgColor="var(--color-fats-bg)"
              />
            </div>
          </div>

          {/* Right: Daily Intakes Card */}
          <div className="health-card">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: 600 }}>
              Ingestas del Día ({currentLog.intakes.length})
            </h2>

            <DailyTimeline intakes={currentLog.intakes} />
          </div>
        </div>
      )}

      {activeTab === 'weekly' && (
        <WeeklyChart
          logs={data.dailyLogs}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          targetProtein={targetMacros.protein}
        />
      )}
    </div>
  );
}
