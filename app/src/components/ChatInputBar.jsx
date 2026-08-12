import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Mic, MicOff, Utensils, Egg, X, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchCatalog } from '../lib/supabase';

const normalizeStr = (str) =>
  str ? str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() : "";

export default function ChatInputBar({ onSendFood, onSendFoodDirect, isLoading }) {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [catalog, setCatalog] = useState({ ingredients: [], dishes: [] });
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Selected chips state
  const [selectedChips, setSelectedChips] = useState([]);
  const recognitionRef = useRef(null);

  const refreshCatalog = () => {
    fetchCatalog().then(res => setCatalog(res));
  };

  useEffect(() => {
    refreshCatalog();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setText(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      refreshCatalog();
    }
  }, [isLoading]);

  // Filter catalog items with accent normalization and substring contains matching
  useEffect(() => {
    if (!text.trim() || text.length < 2) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const cleanQuery = normalizeStr(text);
    const parts = text.split(/[,+]/);
    const lastPart = normalizeStr(parts[parts.length - 1]);

    const targetSearch = lastPart.length >= 2 ? lastPart : cleanQuery;

    if (!targetSearch || targetSearch.length < 2) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matchedIngredients = (catalog.ingredients || [])
      .filter(ing => ing.name && normalizeStr(ing.name).includes(targetSearch))
      .sort((a, b) => {
        const aNorm = normalizeStr(a.name);
        const bNorm = normalizeStr(b.name);
        if (aNorm === targetSearch) return -1;
        if (bNorm === targetSearch) return 1;
        if (aNorm.startsWith(targetSearch) && !bNorm.startsWith(targetSearch)) return -1;
        if (!aNorm.startsWith(targetSearch) && bNorm.startsWith(targetSearch)) return 1;
        return aNorm.localeCompare(bNorm);
      })
      .map(ing => ({ ...ing, type: 'ingredient' }));

    const matchedDishes = (catalog.dishes || [])
      .filter(d => d.name && normalizeStr(d.name).includes(targetSearch))
      .sort((a, b) => {
        const aNorm = normalizeStr(a.name);
        const bNorm = normalizeStr(b.name);
        if (aNorm === targetSearch) return -1;
        if (bNorm === targetSearch) return 1;
        if (aNorm.startsWith(targetSearch) && !bNorm.startsWith(targetSearch)) return -1;
        if (!aNorm.startsWith(targetSearch) && bNorm.startsWith(targetSearch)) return 1;
        return aNorm.localeCompare(bNorm);
      })
      .map(d => ({ ...d, type: 'dish' }));

    const combined = [...matchedDishes, ...matchedIngredients].slice(0, 10);
    setFilteredSuggestions(combined);
    setShowSuggestions(combined.length > 0);
  }, [text, catalog]);

  const addChip = (item) => {
    if (item.type === 'dish') {
      const components = (item.components && item.components.length > 0) ? item.components : [
        {
          name: item.name,
          category: 'other',
          unit: 'porcion',
          quantity: 1,
          calories: item.calories || 0,
          protein: item.protein || 0,
          carbs: item.carbs || 0,
          fats: item.fats || 0
        }
      ];

      setSelectedChips(prev => [
        ...prev,
        {
          chipId: Date.now() + Math.random(),
          type: 'dish',
          name: item.name,
          multiplier: 1,
          components: components
        }
      ]);
    } else {
      const isGramCat = ['meat','grains','tubers','legumes','vegetables','healthy_fats'].includes(item.category);
      const targetUnit = (item.unit && item.unit !== 'porcion') ? item.unit : (isGramCat ? 'g' : 'ud');
      const defaultQty = targetUnit === 'g' ? 100 : 1;

      setSelectedChips(prev => [
        ...prev,
        {
          chipId: Date.now() + Math.random(),
          type: 'ingredient',
          name: item.name,
          category: item.category || 'other',
          unit: targetUnit,
          quantity: defaultQty,
          baseCalories: item.calories || 0,
          baseProtein: item.protein || 0,
          baseCarbs: item.carbs || 0,
          baseFats: item.fats || 0
        }
      ]);
    }

    // Clear search text
    setText('');
    setShowSuggestions(false);
  };

  const removeChip = (chipId) => {
    setSelectedChips(prev => prev.filter(c => c.chipId !== chipId));
  };

  const updateChipQuantity = (chipId, delta) => {
    setSelectedChips(prev => prev.map(chip => {
      if (chip.chipId !== chipId) return chip;
      if (chip.type === 'dish') {
        const newMult = Math.max(1, chip.multiplier + delta);
        return { ...chip, multiplier: newMult };
      } else {
        const stepVal = chip.unit === 'g' ? 50 : 1;
        const newQty = Math.max(stepVal, chip.quantity + (delta * stepVal));
        return { ...chip, quantity: newQty };
      }
    }));
  };

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(i18n.language.startsWith('es') ? 'Reconocimiento de voz no disponible en este navegador.' : 'Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        if (!recognitionRef.current) {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = true;
          recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript;
            }
            setText(transcript);
          };
          recognition.onerror = () => setIsListening(false);
          recognition.onend = () => setIsListening(false);
          recognitionRef.current = recognition;
        }
        recognitionRef.current.lang = i18n.language.startsWith('es') ? 'es-ES' : 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
        setIsListening(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);

    if (isListening && recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (err) {}
      setIsListening(false);
    }

    // Direct submission of selected chips (0 AI latency)
    if (selectedChips.length > 0) {
      const itemsToSave = [];
      selectedChips.forEach(chip => {
        if (chip.type === 'dish') {
          chip.components.forEach(comp => {
            const factor = chip.multiplier;
            itemsToSave.push({
              name: comp.name,
              dishName: chip.name,
              category: comp.category || 'other',
              quantity: (comp.quantity || 1) * factor,
              unit: comp.unit || 'porcion',
              calories: Math.round((comp.calories || 0) * factor),
              protein: Math.round(((comp.protein || 0) * factor) * 10) / 10,
              carbs: Math.round(((comp.carbs || 0) * factor) * 10) / 10,
              fats: Math.round(((comp.fats || 0) * factor) * 10) / 10
            });
          });
        } else {
          const factor = chip.unit === 'g' ? (chip.quantity / 100) : chip.quantity;
          itemsToSave.push({
            name: chip.name,
            category: chip.category || 'other',
            quantity: chip.quantity,
            unit: chip.unit,
            calories: Math.round(chip.baseCalories * factor),
            protein: Math.round((chip.baseProtein * factor) * 10) / 10,
            carbs: Math.round((chip.baseCarbs * factor) * 10) / 10,
            fats: Math.round((chip.baseFats * factor) * 10) / 10
          });
        }
      });

      if (onSendFoodDirect) {
        onSendFoodDirect(itemsToSave);
      } else {
        onSendFood(itemsToSave.map(i => `${i.name} ${i.quantity}${i.unit}`).join(', '));
      }
      setSelectedChips([]);
      setText('');
      return;
    }

    // Text free form submission via AI
    if (!text.trim() || isLoading) return;
    onSendFood(text.trim());
    setText('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(250, 250, 247, 0.94)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border-light)',
        padding: '0.75rem 1rem',
        zIndex: 100
      }}
    >
      {/* Suggestions Popup Overlay */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto 0.5rem auto',
            background: 'var(--bg-surface)',
            borderRadius: '16px',
            border: '1px solid var(--border-light)',
            boxShadow: '0 -10px 25px rgba(0,0,0,0.1)',
            padding: '0.5rem',
            maxHeight: '220px',
            overflowY: 'auto',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {i18n.language.startsWith('es') ? 'Sugerencias de Catálogo (Añadir Directo)' : 'Catalog Suggestions (Direct Add)'}
          </div>
          {filteredSuggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => addChip(item)}
              style={{
                padding: '0.65rem 0.75rem',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background 0.15s ease',
                background: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-app)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {item.type === 'dish' ? (
                  <span style={{ background: 'var(--color-orange-subtle)', padding: '4px', borderRadius: '6px', color: 'var(--color-orange)', display: 'flex' }}>
                    <Utensils size={14} />
                  </span>
                ) : (
                  <span style={{ background: 'var(--color-indigo-subtle)', padding: '4px', borderRadius: '6px', color: 'var(--color-indigo)', display: 'flex' }}>
                    <Egg size={14} />
                  </span>
                )}
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.name}</div>
                  {item.calories > 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.calories} kcal · {item.protein}g P · {item.carbs}g C · {item.fats}g G
                    </div>
                  )}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', background: item.type === 'dish' ? 'var(--color-orange-subtle)' : 'var(--color-indigo-subtle)', color: item.type === 'dish' ? 'var(--color-orange)' : 'var(--color-indigo)', fontWeight: 600 }}>
                {item.type === 'dish' ? (i18n.language.startsWith('es') ? 'Plato' : 'Dish') : (i18n.language.startsWith('es') ? 'Ingrediente' : 'Ingredient')}
              </span>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center'
        }}
      >
        <div 
          style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            gap: '0.4rem',
            background: isListening ? 'var(--color-calories-bg)' : 'var(--bg-surface)',
            border: isListening ? '1px solid var(--color-calories)' : '1px solid var(--border-light)',
            borderRadius: '24px',
            padding: '0.4rem 0.5rem 0.4rem 0.85rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            transition: 'all 0.25s ease',
            minHeight: '44px'
          }}
        >
          {/* Selected Product Chips */}
          {selectedChips.map(chip => (
            <div
              key={chip.chipId}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: chip.type === 'dish' ? 'var(--color-orange-subtle)' : 'var(--color-indigo-subtle)',
                border: chip.type === 'dish' ? '1px solid var(--color-orange)' : '1px solid var(--color-indigo)',
                color: chip.type === 'dish' ? 'var(--color-orange)' : 'var(--color-indigo)',
                borderRadius: '16px',
                padding: '0.2rem 0.6rem',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              <span>{chip.type === 'dish' ? '🥗' : '🥚'} {chip.name}</span>
              
              {/* Stepper Quantity Controls */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', padding: '1px 4px' }}>
                <button
                  type="button"
                  onClick={() => updateChipQuantity(chip.chipId, -1)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit' }}
                >
                  <Minus size={12} />
                </button>
                <span style={{ fontSize: '0.78rem', minWidth: '18px', textAlign: 'center' }}>
                  {chip.type === 'dish' ? `${chip.multiplier}x` : `${chip.quantity}${chip.unit}`}
                </span>
                <button
                  type="button"
                  onClick={() => updateChipQuantity(chip.chipId, 1)}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit' }}
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Remove Chip */}
              <button
                type="button"
                onClick={() => removeChip(chip.chipId)}
                style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', padding: 0, color: 'inherit', marginLeft: '2px' }}
              >
                <X size={14} />
              </button>
            </div>
          ))}

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={refreshCatalog}
            placeholder={
              selectedChips.length > 0 
                ? (i18n.language.startsWith('es') ? 'Añadir más o enviar directo...' : 'Add more or send direct...')
                : isListening ? (i18n.language.startsWith('es') ? 'Escuchando tu voz...' : 'Listening to your voice...') : t('chat.placeholder')
            }
            disabled={isLoading}
            style={{
              flex: 1,
              minWidth: '120px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-main)',
              outline: 'none'
            }}
          />

          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? 'Detener micrófono' : 'Dictar por voz'}
            style={{
              background: isListening ? 'var(--color-calories)' : 'transparent',
              color: isListening ? '#FFF' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            {isListening ? <MicOff size={16} className="spin" /> : <Mic size={16} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={(!text.trim() && selectedChips.length === 0) || isLoading}
          style={{
            background: (text.trim() || selectedChips.length > 0) && !isLoading ? 'var(--color-indigo)' : 'var(--bg-subtle)',
            color: (text.trim() || selectedChips.length > 0) && !isLoading ? '#FFF' : 'var(--text-subtle)',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (text.trim() || selectedChips.length > 0) && !isLoading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
        >
          {isLoading ? <Loader2 size={20} className="spin" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
}
