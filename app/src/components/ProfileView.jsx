import React, { useState, useEffect } from 'react';
import { Save, User, Activity, Target } from 'lucide-react';
import { saveProfile } from '../lib/supabase';
import { calculateProfileTargets } from '../utils/profile';

export default function ProfileView({ profile, onProfileSaved }) {
  const [formData, setFormData] = useState(profile || {
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
  });

  const [isSaving, setIsSaving] = useState(false);
  const [autoCalculate, setAutoCalculate] = useState(true);

  // Update local state when active profile changes
  useEffect(() => {
    if (profile) {
      setFormData(profile);
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
        Configuración de Perfil
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Basic Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="edit-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Género</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="edit-select">
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Edad</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required className="edit-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Altura (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} required className="edit-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Peso (kg)</label>
            <input type="number" name="weight" step="0.1" value={formData.weight} onChange={handleChange} required className="edit-input" />
          </div>
        </div>

        {/* Activity & Goals */}
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
          <Activity size={20} color="var(--color-calories)" />
          Actividad y Meta
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nivel de Actividad (NEAT)</label>
            <select name="activity_level" value={formData.activity_level} onChange={handleChange} className="edit-select">
              <option value="sedentary">Sedentario (Poco o ningún ejercicio)</option>
              <option value="light">Ligero (Ejercicio 1-3 días/sem)</option>
              <option value="moderate">Moderado (Ejercicio 3-5 días/sem)</option>
              <option value="active">Activo (Ejercicio 6-7 días/sem)</option>
              <option value="very_active">Muy Activo (Atleta/Doble turno)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Objetivo</label>
            <select name="goal" value={formData.goal} onChange={handleChange} className="edit-select">
              <option value="lose">Perder Peso (Déficit)</option>
              <option value="maintain">Mantener Peso</option>
              <option value="gain">Ganar Masa Muscular (Superávit)</option>
            </select>
          </div>
        </div>

        {/* Macros */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>
            <Target size={20} color="var(--color-protein)" />
            Objetivos Diarios (Macros)
          </h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={autoCalculate} 
              onChange={(e) => setAutoCalculate(e.target.checked)} 
            />
            Calcular automáticamente
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Kcal</label>
            <input type="number" name="target_calories" value={formData.target_calories} onChange={handleChange} disabled={autoCalculate} className="edit-input" style={{ opacity: autoCalculate ? 0.7 : 1 }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Proteína (g)</label>
            <input type="number" name="target_protein" value={formData.target_protein} onChange={handleChange} disabled={autoCalculate} className="edit-input" style={{ opacity: autoCalculate ? 0.7 : 1 }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Carbos (g)</label>
            <input type="number" name="target_carbs" value={formData.target_carbs} onChange={handleChange} disabled={autoCalculate} className="edit-input" style={{ opacity: autoCalculate ? 0.7 : 1 }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Grasas (g)</label>
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
          {isSaving ? 'Guardando...' : 'Guardar Perfil'}
        </button>

      </form>
    </div>
  );
}
