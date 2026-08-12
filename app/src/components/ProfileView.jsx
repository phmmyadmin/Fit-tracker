import React, { useState, useEffect } from 'react';
import { Save, User, Activity, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveProfile } from '../lib/supabase';
import { calculateProfileTargets } from '../utils/profile';

const defaultForm = {
  name: '',
  gender: 'male',
  age: 30,
  height: 170,
  weight: 70,
  activity_level: 'moderate',
  goal: 'maintain',
  target_calories: 2000,
  target_protein: 150,
  target_carbs: 200,
  target_fats: 60
};

export default function ProfileView({ profile, onProfileSaved }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(profile || defaultForm);

  const [isSaving, setIsSaving] = useState(false);
  const [autoCalculate, setAutoCalculate] = useState(true);

  // Update local state when active profile changes (or reset to empty form if profile is null)
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else {
      setFormData(defaultForm);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numbers
    const numFields = ['age', 'height', 'weight', 'target_calories', 'target_protein', 'target_carbs', 'target_fats'];
    let finalValue = numFields.includes(name) ? Number(value) : value;

    const newForm = { ...formData, [name]: finalValue };

    // If a base physical stat changes and auto calculate is ON, recalculate targets
    if (autoCalculate && ['age', 'height', 'weight', 'gender', 'activity_level', 'goal'].includes(name)) {
      const targets = calculateProfileTargets(newForm);
      newForm.target_calories = targets.calories;
      newForm.target_protein = targets.protein;
      newForm.target_carbs = targets.carbs;
      newForm.target_fats = targets.fats;
    }

    setFormData(newForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const saved = await saveProfile(formData);
    setIsSaving(false);
    if (saved && onProfileSaved) {
      onProfileSaved(saved);
    }
  };

  return (
    <div className="health-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
        <User size={24} color="var(--color-indigo)" />
        {t('profile.settings')}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Basic Info */}
        <div className="form-grid-2">
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('profile.name')}</label>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="edit-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('profile.gender')}</label>
            <select name="gender" value={formData.gender || 'male'} onChange={handleChange} className="edit-select">
              <option value="male">{t('profile.male')}</option>
              <option value="female">{t('profile.female')}</option>
            </select>
          </div>
        </div>

        <div className="form-grid-3">
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('profile.age')}</label>
            <input type="number" name="age" value={formData.age || ''} onChange={handleChange} required className="edit-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('profile.height')}</label>
            <input type="number" name="height" value={formData.height || ''} onChange={handleChange} required className="edit-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('profile.weight')}</label>
            <input type="number" name="weight" step="0.1" value={formData.weight || ''} onChange={handleChange} required className="edit-input" />
          </div>
        </div>

        {/* Activity & Goals */}
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
          <Activity size={20} color="var(--color-calories)" />
          {t('profile.activityAndGoal')}
        </h3>

        <div className="form-grid-2">
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('profile.activityLevel')}</label>
            <select name="activity_level" value={formData.activity_level || 'moderate'} onChange={handleChange} className="edit-select">
              <option value="sedentary">{t('profile.sedentary')}</option>
              <option value="light">{t('profile.light')}</option>
              <option value="moderate">{t('profile.moderate')}</option>
              <option value="active">{t('profile.active')}</option>
              <option value="very_active">{t('profile.veryActive')}</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('profile.goal')}</label>
            <select name="goal" value={formData.goal || 'maintain'} onChange={handleChange} className="edit-select">
              <option value="lose">{t('profile.loseWeight')}</option>
              <option value="maintain">{t('profile.maintainWeight')}</option>
              <option value="gain">{t('profile.gainWeight')}</option>
            </select>
          </div>
        </div>

        {/* Macros */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
            <Target size={20} color="var(--color-protein)" />
            {t('profile.dailyTargets')}
          </h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={autoCalculate} 
              onChange={(e) => setAutoCalculate(e.target.checked)} 
            />
            {t('profile.autoCalculate')}
          </label>
        </div>

        <div className="form-grid-4" style={{ background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Kcal</label>
            <input type="number" name="target_calories" value={formData.target_calories} onChange={handleChange} disabled={autoCalculate} className="edit-input" style={{ opacity: autoCalculate ? 0.7 : 1 }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('diary.protein')} (g)</label>
            <input type="number" name="target_protein" value={formData.target_protein} onChange={handleChange} disabled={autoCalculate} className="edit-input" style={{ opacity: autoCalculate ? 0.7 : 1 }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('diary.carbs')} (g)</label>
            <input type="number" name="target_carbs" value={formData.target_carbs} onChange={handleChange} disabled={autoCalculate} className="edit-input" style={{ opacity: autoCalculate ? 0.7 : 1 }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('diary.fats')} (g)</label>
            <input type="number" name="target_fats" value={formData.target_fats} onChange={handleChange} disabled={autoCalculate} className="edit-input" style={{ opacity: autoCalculate ? 0.7 : 1 }} />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving}
          style={{ 
            marginTop: '1rem',
            background: 'var(--color-indigo)', 
            color: 'white', 
            padding: '0.85rem', 
            borderRadius: '12px', 
            border: 'none', 
            fontWeight: 600,
            cursor: isSaving ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: isSaving ? 0.7 : 1
          }}
        >
          <Save size={18} />
          {isSaving ? t('profile.saving') : t('profile.saveProfile')}
        </button>

      </form>
    </div>
  );
}
