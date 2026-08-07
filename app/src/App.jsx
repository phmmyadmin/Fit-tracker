import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import MacroRing from './components/MacroRing';
import DailyTimeline from './components/DailyTimeline';
import WeeklyChart from './components/WeeklyChart';
import MonthlyReport from './components/MonthlyReport';
import ChatInputBar from './components/ChatInputBar';
import EditDrawer from './components/EditDrawer';
import './index.css';

export default function App() {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Drawer editing state
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const loadData = () => {
    fetch('/food_log.json?t=' + Date.now())
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (json.dailyLogs && json.dailyLogs.length > 0 && !selectedDate) {
          setSelectedDate(json.dailyLogs[json.dailyLogs.length - 1].date);
        }
      })
      .catch((err) => console.error("Error al cargar food_log.json", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendFood = async (text) => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/log-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, date: selectedDate })
      });
      const result = await res.json();
      if (result.success) {
        loadData();
        const summary = result.addedItems.map(i => `${i.name} (${i.calories} kcal)`).join(', ');
        showToast(`Añadido: ${summary}`);
      }
    } catch (err) {
      console.warn("Backend local no disponible, simulando inserción local...", err);
      // Fallback simulation
      showToast(`Añadido (modo local): ${text}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      await fetch('http://localhost:3001/api/intake', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, index })
      });
      showToast("Alimento eliminado");
    } catch (err) {
      console.warn(err);
    } finally {
      setEditingItem(null);
      loadData();
    }
  };

  const handleUpdateIntake = async (index, newQuantity, newMacros) => {
    if (!data) return;
    const dayLog = data.dailyLogs.find(l => l.date === selectedDate);
    if (dayLog && dayLog.intakes[index]) {
      dayLog.intakes[index].quantity = newQuantity;
      dayLog.intakes[index].macros = newMacros;
      
      // Recalculate totals
      dayLog.dailyTotals = dayLog.intakes.reduce((acc, curr) => ({
        calories: Math.round(acc.calories + curr.macros.calories),
        protein: Math.round((acc.protein + curr.macros.protein) * 10) / 10,
        carbs: Math.round((acc.carbs + curr.macros.carbs) * 10) / 10,
        fats: Math.round((acc.fats + curr.macros.fats) * 10) / 10
      }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

      setData({ ...data });
      showToast(`Cantidad actualizada`);
    }
    setEditingItem(null);
  };

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
  
  let allDates = data.dailyLogs.map((l) => l.date);
  const todayStr = new Date().toISOString().slice(0, 10);
  if (!allDates.includes(todayStr)) {
    allDates.push(todayStr);
    allDates.sort(); // keep it sorted
  }
  
  const currentIndex = allDates.indexOf(selectedDate);

  const prevDate = () => {
    if (currentIndex > 0) setSelectedDate(allDates[currentIndex - 1]);
  };

  const nextDate = () => {
    if (currentIndex < allDates.length - 1) setSelectedDate(allDates[currentIndex + 1]);
  };

  const goToToday = () => setSelectedDate(todayStr);

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--text-main)',
            color: '#FFF',
            padding: '0.65rem 1.25rem',
            borderRadius: '24px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 300,
            animation: 'slideUp 0.25s ease'
          }}
        >
          <CheckCircle2 size={16} color="var(--color-carbs)" />
          {toastMessage}
        </div>
      )}

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
          <button 
            onClick={goToToday}
            style={{ 
              marginLeft: '0.5rem', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '12px', 
              border: '1px solid var(--border-light)', 
              background: 'var(--bg-subtle)', 
              color: 'var(--text-main)', 
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            Hoy
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
        <button
          className={`tab-item ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Reporte Mensual
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

            <DailyTimeline
              intakes={currentLog.intakes}
              onItemClick={(item, idx) => {
                setEditingItem(item);
                setEditingIndex(idx);
              }}
            />
          </div>
        </div>
      )}

      {activeTab === 'weekly' && (
        <WeeklyChart
          logs={data.dailyLogs}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          targetMacros={targetMacros}
        />
      )}

      {activeTab === 'monthly' && (
        <MonthlyReport data={data} />
      )}

      {/* iMessage Style Bottom Input Bar */}
      <ChatInputBar onSendFood={handleSendFood} isLoading={isLoading} />

      {/* Bottom Sheet Drawer for Editing */}
      <EditDrawer
        item={editingItem}
        itemIndex={editingIndex}
        onClose={() => setEditingItem(null)}
        onDelete={handleDeleteItem}
        onUpdate={handleUpdateIntake}
      />
    </div>
  );
}
