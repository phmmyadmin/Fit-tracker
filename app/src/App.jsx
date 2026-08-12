import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, LayoutDashboard, TrendingUp, CalendarRange, LineChart, User, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MacroRing from './components/MacroRing';
import DailyTimeline from './components/DailyTimeline';
import WeeklyChart from './components/WeeklyChart';
import MonthlyReport from './components/MonthlyReport';
import ProgressTracker from './components/ProgressTracker';
import ChatInputBar from './components/ChatInputBar';
import EditDrawer from './components/EditDrawer';
import ProfileView from './components/ProfileView';
import NewProfileModal from './components/NewProfileModal';
import { parseFoodWithGemini } from './lib/gemini';
import { parseFoodTextLocal } from './lib/parser';
import { supabase, fetchDailyLogsFromSupabase, saveIntakesToSupabase, deleteIntakeFromSupabase, deleteIntakesGroupFromSupabase, updateIntakeInSupabase, fetchProfiles } from './lib/supabase';
import './index.css';

const getLocalDateStr = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (dateStr, days) => {
  if (!dateStr) return getLocalDateStr();
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const dateInputRef = useRef(null);
  
  // Drawer editing state
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const [profiles, setProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(() => localStorage.getItem('fit_active_profile_id') || null);
  const [isNewProfileModalOpen, setIsNewProfileModalOpen] = useState(false);

  const loadData = async (forceProfileId = null) => {
    let currentProfileId = forceProfileId || activeProfileId;
    
    if (supabase) {
      let currentProfiles = profiles;
      if (currentProfiles.length === 0) {
        currentProfiles = await fetchProfiles();
        setProfiles(currentProfiles);
      }
      
      const savedId = localStorage.getItem('fit_active_profile_id');
      if (savedId && currentProfiles.some(p => p.id === savedId)) {
        currentProfileId = savedId;
      } else if (!currentProfileId && currentProfiles.length > 0) {
        currentProfileId = currentProfiles[0].id;
      }

      if (currentProfileId) {
        setActiveProfileId(currentProfileId);
        localStorage.setItem('fit_active_profile_id', currentProfileId);
      }

      const activeProf = currentProfiles.find(p => p.id === currentProfileId);
      if (activeProf && activeProf.language) {
        i18n.changeLanguage(activeProf.language);
      }

      if (currentProfileId) {
        const supabaseData = await fetchDailyLogsFromSupabase(currentProfileId);
        if (supabaseData) {
          setData(supabaseData);
          if (!selectedDate) {
            setSelectedDate(getLocalDateStr());
          }
          return;
        }
      }
    }

    // Fallback local
    fetch('/food_log.json?t=' + Date.now())
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        if (!selectedDate) {
          setSelectedDate(getLocalDateStr());
        }
      })
      .catch((err) => console.error("Error al cargar food_log.json", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reload data when active profile changes manually
  const handleProfileChange = (newProfileId) => {
    setActiveProfileId(newProfileId);
    if (newProfileId) {
      localStorage.setItem('fit_active_profile_id', newProfileId);
    }
    const targetProfile = profiles.find(p => p.id === newProfileId);
    if (targetProfile && targetProfile.language) {
      i18n.changeLanguage(targetProfile.language);
    }
    setData(null); // Show loading state
    loadData(newProfileId);
  };

  const handleToggleLanguage = async () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    const activeProf = profiles.find(p => p.id === activeProfileId);
    if (activeProf && supabase) {
      const updated = { ...activeProf, language: newLang };
      await saveProfile(updated);
      setProfiles(prev => prev.map(p => p.id === activeProf.id ? updated : p));
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendFood = async (text) => {
    setIsLoading(true);
    try {
      const parsedItems = await parseFoodWithGemini(text);
      const itemsToSave = (parsedItems && parsedItems.length > 0)
        ? parsedItems
        : parseFoodTextLocal(text);

      if (supabase) {
        const res = await saveIntakesToSupabase({ date: selectedDate, items: itemsToSave, profileId: activeProfileId });
        if (res && res.success) {
          await loadData();
          const summary = itemsToSave.map(i => `${i.name} (${i.calories} kcal)`).join(', ');
          showToast(`Añadido (${parsedItems ? 'Gemini 1.5 Flash' : 'Local'}): ${summary}`);
          return;
        }
      }

      const res = await fetch('/api/log-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, parsedItems: itemsToSave, date: selectedDate })
      });
      const result = await res.json();
      if (result.success) {
        loadData();
        const summary = result.addedItems.map(i => `${i.name} (${i.calories} kcal)`).join(', ');
        showToast(`Añadido (${parsedItems ? 'Gemini 1.5 Flash' : 'Local'}): ${summary}`);
      }
    } catch (err) {
      console.warn("Backend no disponible...", err);
      showToast(`Añadido (modo local): ${text}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (index) => {
    try {
      const targetItem = editingItem;
      setEditingItem(null);

      if (supabase) {
        const res = await deleteIntakeFromSupabase({ date: selectedDate, index, item: targetItem, profileId: activeProfileId });
        if (res && res.success) {
          await loadData();
          showToast("Alimento eliminado");
          return;
        }
      }

      await fetch('/api/intake', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, index })
      });
      await loadData();
      showToast("Alimento eliminado");
    } catch (err) {
      console.error(err);
      showToast("Error al actualizar ingesta");
    }
  };

  const handleDeleteGroup = async (itemsToDelete) => {
    if (!itemsToDelete || itemsToDelete.length === 0) return;
    try {
      if (supabase) {
        const res = await deleteIntakesGroupFromSupabase({ date: selectedDate, items: itemsToDelete, profileId: activeProfileId });
        if (res && res.success) {
          await loadData();
          showToast(t('toast.foodDeleted') || "Comida eliminada");
          return;
        }
      }
      await loadData();
      showToast("Comida eliminada");
    } catch (err) {
      console.error(err);
      showToast("Error al eliminar la comida");
    }
  };

  const handleUpdateCategoryFromWeekly = async (rawItems, newCategory) => {
    if (!rawItems || rawItems.length === 0) return;

    try {
      const itemIds = rawItems.map(r => r.id).filter(Boolean);

      setData(prev => {
        if (!prev || !prev.dailyLogs) return prev;
        const updatedLogs = prev.dailyLogs.map(log => {
          const newIntakes = log.intakes?.map(item => {
            if (rawItems.some(r => r === item || (r.id && r.id === item.id))) {
              return { ...item, category: newCategory };
            }
            return item;
          });
          return { ...log, intakes: newIntakes };
        });
        return { ...prev, dailyLogs: updatedLogs };
      });

      if (supabase && itemIds.length > 0) {
        await supabase
          .from('intakes')
          .update({ category: newCategory })
          .in('id', itemIds);
      }

      showToast('Categoría actualizada');
    } catch (err) {
      console.error('Error updating categories from weekly:', err);
    }
  };

  const handleUpdateIntake = async (index, newQuantity, newMacros, newTime, newCategory) => {
    try {
      const targetItem = editingItem;
      setEditingItem(null);

      if (supabase) {
        const res = await updateIntakeInSupabase({
          date: selectedDate,
          index,
          item: targetItem,
          quantity: newQuantity,
          macros: newMacros,
          category: newCategory,
          time: newTime,
          profileId: activeProfileId
        });
        if (res && res.success) {
          await loadData();
          showToast("Ingesta actualizada");
          return;
        }
      }

      if (data) {
        const dayLog = data.dailyLogs.find(l => l.date === selectedDate);
        if (dayLog && dayLog.intakes[index]) {
          dayLog.intakes[index].quantity = newQuantity;
          dayLog.intakes[index].macros = newMacros;
          if (newTime) dayLog.intakes[index].time = newTime;
          if (newCategory) dayLog.intakes[index].category = newCategory;
          dayLog.dailyTotals = dayLog.intakes.reduce((acc, curr) => ({
            calories: Math.round(acc.calories + curr.macros.calories),
            protein: Math.round((acc.protein + curr.macros.protein) * 10) / 10,
            carbs: Math.round((acc.carbs + curr.macros.carbs) * 10) / 10,
            fats: Math.round((acc.fats + curr.macros.fats) * 10) / 10
          }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

          setData({ ...data });
          showToast("Ingesta actualizada");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = (updatedProfile) => {
    setData((prev) => ({ ...prev, userProfile: updatedProfile }));
    showToast('Historial de peso actualizado');
  };

  if (!data) {
    return (
      <div className="app-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-muted)' }}>
          {t('diary.loading')}
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
  
  const prevDate = () => {
    setSelectedDate((prev) => addDays(prev || getLocalDateStr(), -1));
  };

  const nextDate = () => {
    setSelectedDate((prev) => addDays(prev || getLocalDateStr(), 1));
  };

  const goToToday = () => setSelectedDate(getLocalDateStr());

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
      <header className="app-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <h1 className="app-title">Fit Tracker</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
            <User size={14} color="var(--text-muted)" />
            <select 
              value={activeProfileId || ''} 
              onChange={(e) => {
                if (e.target.value === 'new') {
                  setIsNewProfileModalOpen(true);
                } else {
                  handleProfileChange(e.target.value);
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
              <option value="new">{t('header.newProfile')}</option>
            </select>
          </div>
        </div>

        <div className="date-selector">
          <button className="nav-btn" onClick={prevDate} title="Día anterior">
            <ChevronLeft size={16} />
          </button>
          <div 
            onClick={() => {
              if (dateInputRef.current) {
                if (dateInputRef.current.showPicker) {
                  dateInputRef.current.showPicker();
                } else {
                  dateInputRef.current.click();
                }
              }
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              cursor: 'pointer', 
              position: 'relative',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              transition: 'all 0.15s ease'
            }}
            title="Haz clic para abrir el calendario y seleccionar cualquier día"
          >
            <Calendar size={16} color="var(--color-indigo)" />
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedDate}</span>
            <input 
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={(e) => {
                if (e.target.value) {
                  setSelectedDate(e.target.value);
                }
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
          </div>
          <button className="nav-btn" onClick={nextDate} title="Día siguiente">
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
            {t('header.today')}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="tab-group">
        <button
          className={`tab-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={16} />
          <span>{t('nav.diary')}</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'report' ? 'active' : ''}`}
          onClick={() => setActiveTab('report')}
        >
          <CalendarRange size={16} />
          <span>{t('nav.report')}</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <LineChart size={16} />
          <span>{t('nav.progress')}</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={16} />
          <span>{t('nav.profile')}</span>
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Left: Macro Rings Card */}
          <div className="health-card">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: 600 }}>
              {t('diary.macroSummary')}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', justifyItems: 'center' }}>
              <MacroRing
                value={totals.calories}
                target={targetMacros.calories}
                unit="kcal"
                label={t('diary.calories')}
                color="var(--color-calories)"
                bgColor="var(--color-calories-bg)"
              />
              <MacroRing
                value={totals.protein}
                target={targetMacros.protein}
                unit="g"
                label={t('diary.protein')}
                color="var(--color-protein)"
                bgColor="var(--color-protein-bg)"
              />
              <MacroRing
                value={totals.carbs}
                target={targetMacros.carbs}
                unit="g"
                label={t('diary.carbs')}
                color="var(--color-carbs)"
                bgColor="var(--color-carbs-bg)"
              />
              <MacroRing
                value={totals.fats}
                target={targetMacros.fats}
                unit="g"
                label={t('diary.fats')}
                color="var(--color-fats)"
                bgColor="var(--color-fats-bg)"
              />
            </div>
          </div>

          {/* Right: Daily Intakes Card */}
          <div className="health-card">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '1.25rem', fontWeight: 600 }}>
              {t('diary.dailyIntakes')} ({currentLog.intakes.length})
            </h2>

            <DailyTimeline
              intakes={currentLog.intakes}
              onItemClick={(item, idx) => {
                setEditingItem(item);
                setEditingIndex(idx);
              }}
              onDeleteGroup={handleDeleteGroup}
            />
          </div>
        </div>
      )}

      {activeTab === 'report' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <WeeklyChart
            logs={data.dailyLogs}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            targetMacros={targetMacros}
            onUpdateCategory={handleUpdateCategoryFromWeekly}
          />
          <MonthlyReport data={data} />
        </div>
      )}

      {activeTab === 'progress' && (
        <ProgressTracker data={data} activeProfileId={activeProfileId} onUpdateProfile={handleUpdateProfile} />
      )}

      {activeTab === 'profile' && (
        <ProfileView 
          profile={profiles.find(p => p.id === activeProfileId) || null} 
          onProfileSaved={async (savedProfile) => {
            const updatedProfiles = await fetchProfiles();
            setProfiles(updatedProfiles);
            handleProfileChange(savedProfile.id);
            setActiveTab('dashboard');
            showToast('Perfil guardado con éxito');
          }}
        />
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

      {/* New Profile Questionnaire Modal */}
      <NewProfileModal
        isOpen={isNewProfileModalOpen}
        onClose={() => setIsNewProfileModalOpen(false)}
        onProfileCreated={async (newProf) => {
          const updatedProfiles = await fetchProfiles();
          setProfiles(updatedProfiles);
          handleProfileChange(newProf.id);
          showToast('Perfil creado con éxito');
        }}
      />
    </div>
  );
}
