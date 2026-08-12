import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, User, Activity, Target, Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveProfile } from '../lib/supabase';
import { calculateProfileTargets } from '../utils/profile';

export default function NewProfileModal({ isOpen, onClose, onProfileCreated }) {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    age: 30,
    height: 170,
    weight: 70,
    target_weight: 65,
    activity_level: 'moderate',
    goal: 'lose',
    pace: 'moderate',
    language: i18n.language || 'en'
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    if (field === 'language') {
      i18n.changeLanguage(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.name.trim()) return;
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const targets = calculateProfileTargets(formData);
      const fullProfileData = {
        ...formData,
        target_calories: targets.calories,
        target_protein: targets.protein,
        target_carbs: targets.carbs,
        target_fats: targets.fats
      };

      const saved = await saveProfile(fullProfileData);
      setIsSubmitting(false);
      if (saved) {
        onProfileCreated(saved);
        onClose();
        // Reset modal
        setStep(1);
        setFormData({
          name: '',
          gender: 'male',
          age: 30,
          height: 170,
          weight: 70,
          target_weight: 65,
          activity_level: 'moderate',
          goal: 'lose',
          pace: 'moderate',
          language: i18n.language || 'en'
        });
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bottom-sheet-overlay" style={{ alignItems: 'center' }}>
      <div 
        className="health-card" 
        style={{ 
          maxWidth: '520px', 
          width: '90%', 
          borderRadius: '24px', 
          position: 'relative',
          padding: '2rem 1.75rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          animation: 'slideUp 0.3s ease'
        }}
      >
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute', 
            top: '1.25rem', 
            right: '1.25rem', 
            background: 'var(--bg-subtle)', 
            border: 'none', 
            borderRadius: '50%', 
            width: '32px', 
            height: '32px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          <X size={18} />
        </button>

        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {[1, 2, 3, 4].map(s => (
            <div 
              key={s} 
              style={{ 
                flex: 1, 
                height: '4px', 
                borderRadius: '2px', 
                background: s <= step ? 'var(--color-indigo)' : 'var(--border-light)',
                transition: 'all 0.3s ease'
              }} 
            />
          ))}
        </div>

        {/* Step 1: Name & Gender & Language */}
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-indigo)', marginBottom: '0.5rem' }}>
              <User size={20} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t('modal.stepOf', { current: 1, total: 4 })}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              {t('modal.step1Title')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {t('modal.step1Desc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {t('modal.yourName')}
                </label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={t('modal.namePlaceholder')} 
                  autoFocus
                  className="edit-input" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {t('profile.gender')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'male')}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: formData.gender === 'male' ? '2px solid var(--color-indigo)' : '1px solid var(--border-light)',
                      background: formData.gender === 'male' ? 'var(--color-indigo-subtle)' : 'var(--bg-app)',
                      fontWeight: 600,
                      color: formData.gender === 'male' ? 'var(--color-indigo)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {t('profile.male')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('gender', 'female')}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: formData.gender === 'female' ? '2px solid var(--color-indigo)' : '1px solid var(--border-light)',
                      background: formData.gender === 'female' ? 'var(--color-indigo-subtle)' : 'var(--bg-app)',
                      fontWeight: 600,
                      color: formData.gender === 'female' ? 'var(--color-indigo)' : 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    {t('profile.female')}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  {t('profile.language')}
                </label>
                <select 
                  value={formData.language} 
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="edit-select"
                >
                  <option value="en">English (Default)</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Body Stats */}
        {step === 2 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-indigo)', marginBottom: '0.5rem' }}>
              <User size={20} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t('modal.stepOf', { current: 2, total: 4 })}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              {t('modal.step2Title')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {t('modal.step2Desc')}
            </p>

            <div className="form-grid-4">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>{t('profile.age')}</label>
                <input 
                  type="number" 
                  value={formData.age} 
                  onChange={(e) => handleChange('age', Number(e.target.value))}
                  className="edit-input" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>{t('profile.height')}</label>
                <input 
                  type="number" 
                  value={formData.height} 
                  onChange={(e) => handleChange('height', Number(e.target.value))}
                  className="edit-input" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>{t('modal.currentWeight')}</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.weight} 
                  onChange={(e) => handleChange('weight', Number(e.target.value))}
                  className="edit-input" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>{t('modal.targetWeight')}</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.target_weight} 
                  onChange={(e) => handleChange('target_weight', Number(e.target.value))}
                  className="edit-input" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Activity Level */}
        {step === 3 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-indigo)', marginBottom: '0.5rem' }}>
              <Activity size={20} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t('modal.stepOf', { current: 3, total: 4 })}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              {t('modal.step3Title')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {t('modal.step3Desc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { id: 'sedentary', title: t('profile.sedentary') },
                { id: 'light', title: t('profile.light') },
                { id: 'moderate', title: t('profile.moderate') },
                { id: 'active', title: t('profile.active') },
                { id: 'very_active', title: t('profile.veryActive') }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => handleChange('activity_level', opt.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: formData.activity_level === opt.id ? '2px solid var(--color-indigo)' : '1px solid var(--border-light)',
                    background: formData.activity_level === opt.id ? 'var(--color-indigo-subtle)' : 'var(--bg-app)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: formData.activity_level === opt.id ? 'var(--color-indigo)' : 'var(--text-main)' }}>
                    {opt.title}
                  </div>
                  {formData.activity_level === opt.id && <Check size={18} color="var(--color-indigo)" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Goal & Pace */}
        {step === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-indigo)', marginBottom: '0.5rem' }}>
              <Target size={20} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t('modal.finalStep')}
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
              {t('modal.step4Title')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {t('modal.step4Desc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'lose', title: t('profile.loseWeight') },
                { id: 'maintain', title: t('profile.maintainWeight') },
                { id: 'gain', title: t('profile.gainWeight') }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => handleChange('goal', opt.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: formData.goal === opt.id ? '2px solid var(--color-indigo)' : '1px solid var(--border-light)',
                    background: formData.goal === opt.id ? 'var(--color-indigo-subtle)' : 'var(--bg-app)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: formData.goal === opt.id ? 'var(--color-indigo)' : 'var(--text-main)' }}>
                    {opt.title}
                  </div>
                  {formData.goal === opt.id && <Check size={18} color="var(--color-indigo)" />}
                </div>
              ))}
            </div>

            {formData.goal !== 'maintain' && (
              <div style={{ marginTop: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {t('profile.pace')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { id: 'relaxed', label: t('profile.paceRelaxed'), desc: formData.goal === 'lose' ? '-300 kcal' : '+200 kcal' },
                    { id: 'moderate', label: t('profile.paceModerate'), desc: formData.goal === 'lose' ? '-500 kcal' : '+350 kcal' },
                    { id: 'aggressive', label: t('profile.paceAggressive'), desc: formData.goal === 'lose' ? '-750 kcal' : '+500 kcal' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleChange('pace', p.id)}
                      style={{
                        padding: '0.6rem 0.4rem',
                        borderRadius: '10px',
                        border: formData.pace === p.id ? '2px solid var(--color-indigo)' : '1px solid var(--border-light)',
                        background: formData.pace === p.id ? 'var(--color-indigo-subtle)' : 'var(--bg-app)',
                        color: formData.pace === p.id ? 'var(--color-indigo)' : 'var(--text-main)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div>{p.label}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.8 }}>{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Buttons Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
          {step > 1 ? (
            <button
              onClick={handlePrev}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-app)',
                fontWeight: 600,
                color: 'var(--text-main)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <ChevronLeft size={16} /> {t('modal.back')}
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.name.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: 'var(--color-indigo)',
                color: 'white',
                fontWeight: 600,
                cursor: (step === 1 && !formData.name.trim()) ? 'not-allowed' : 'pointer',
                opacity: (step === 1 && !formData.name.trim()) ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              {t('modal.next')} <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={isSubmitting}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: 'var(--color-indigo)',
                color: 'white',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Sparkles size={18} />
              {isSubmitting ? t('modal.creating') : t('modal.create')}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
