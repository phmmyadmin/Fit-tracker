import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, User, Activity, Target, Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveProfile } from '../lib/supabase';
import { calculateProfileTargets } from '../utils/profile';

export default function NewProfileModal({ isOpen, onClose, onProfileCreated }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    age: 30,
    height: 170,
    weight: 70,
    activity_level: 'moderate',
    goal: 'lose',
    language: 'en'
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
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
          activity_level: 'moderate',
          goal: 'lose',
          language: 'en'
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

        {/* Step 1: Name & Gender */}
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-indigo)', marginBottom: '0.5rem' }}>
              <User size={20} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Paso 1 de 4</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>¿Cómo te llamas?</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Crearemos un perfil personalizado para ti.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Tu Nombre</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Ej: Pablo" 
                  autoFocus
                  className="edit-input" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Género</label>
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
                    Hombre
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
                    Mujer
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Idioma de Preferencia</label>
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
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Paso 2 de 4</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Tus Medidas Corporales</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Sirven para calcular tu metabolismo basal (TDEE).</p>

            <div className="form-grid-3">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Edad</label>
                <input 
                  type="number" 
                  value={formData.age} 
                  onChange={(e) => handleChange('age', Number(e.target.value))}
                  className="edit-input" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Altura (cm)</label>
                <input 
                  type="number" 
                  value={formData.height} 
                  onChange={(e) => handleChange('height', Number(e.target.value))}
                  className="edit-input" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Peso (kg)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formData.weight} 
                  onChange={(e) => handleChange('weight', Number(e.target.value))}
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
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Paso 3 de 4</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>¿Cuál es tu nivel de actividad?</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Indica el ejercicio que haces a la semana.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { id: 'sedentary', title: 'Sedentario', desc: 'Poco o ningún ejercicio' },
                { id: 'light', title: 'Actividad Ligera', desc: 'Ejercicio 1-3 días a la semana' },
                { id: 'moderate', title: 'Moderado', desc: 'Ejercicio 3-5 días a la semana' },
                { id: 'active', title: 'Activo', desc: 'Ejercicio 6-7 días a la semana' },
                { id: 'very_active', title: 'Muy Activo', desc: 'Atleta o trabajo físico pesado' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => handleChange('activity_level', opt.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: formData.activity_level === opt.id ? '2px solid var(--color-indigo)' : '1px solid var(--border-light)',
                    background: formData.activity_level === opt.id ? 'var(--color-indigo-subtle)' : 'var(--bg-app)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: formData.activity_level === opt.id ? 'var(--color-indigo)' : 'var(--text-main)' }}>{opt.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                  </div>
                  {formData.activity_level === opt.id && <Check size={18} color="var(--color-indigo)" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Goal */}
        {step === 4 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-indigo)', marginBottom: '0.5rem' }}>
              <Target size={20} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Paso final</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>¿Cuál es tu objetivo?</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Ajustaremos tus macros según tu meta.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'lose', title: 'Perder Peso (Déficit)', desc: 'Reduce ~500 kcal para perder grasa de forma limpia' },
                { id: 'maintain', title: 'Mantener Peso', desc: 'Mantiene tus calorías en tu gasto total diario' },
                { id: 'gain', title: 'Ganar Masa Muscular', desc: 'Añade un ligero superávit para subir de peso' }
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
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: formData.goal === opt.id ? 'var(--color-indigo)' : 'var(--text-main)' }}>{opt.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.desc}</div>
                  </div>
                  {formData.goal === opt.id && <Check size={18} color="var(--color-indigo)" />}
                </div>
              ))}
            </div>
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
              <ChevronLeft size={16} /> Atrás
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
              Siguiente <ChevronRight size={16} />
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
              {isSubmitting ? 'Creando...' : 'Crear Perfil'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
