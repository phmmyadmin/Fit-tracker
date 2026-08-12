import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Mic, MicOff, Utensils, Egg } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchCatalog } from '../lib/supabase';

export default function ChatInputBar({ onSendFood, isLoading }) {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [catalog, setCatalog] = useState({ ingredients: [], dishes: [] });
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Fetch catalog ingredients and dishes
    fetchCatalog().then(res => {
      setCatalog(res);
    });

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

  // Handle autocompletion suggestions as text changes
  useEffect(() => {
    if (!text.trim() || text.length < 2) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = text.trim().toLowerCase();

    // Find last comma-separated term or whole text
    const parts = query.split(/[,+]/);
    const lastPart = parts[parts.length - 1].trim();

    if (lastPart.length < 2) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matchedIngredients = (catalog.ingredients || [])
      .filter(ing => ing.name && ing.name.toLowerCase().includes(lastPart))
      .slice(0, 5)
      .map(ing => ({ ...ing, type: 'ingredient' }));

    const matchedDishes = (catalog.dishes || [])
      .filter(d => d.name && d.name.toLowerCase().includes(lastPart))
      .slice(0, 3)
      .map(d => ({ ...d, type: 'dish' }));

    const combined = [...matchedDishes, ...matchedIngredients];
    setFilteredSuggestions(combined);
    setShowSuggestions(combined.length > 0);
  }, [text, catalog]);

  const selectSuggestion = (item) => {
    const parts = text.split(/[,+]/);
    parts[parts.length - 1] = ' ' + item.name;
    const newText = parts.join(',').trim();
    setText(newText + ' ');
    setShowSuggestions(false);
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
        background: 'rgba(250, 250, 247, 0.92)',
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
            boxShadow: '0 -10px 25px rgba(0,0,0,0.08)',
            padding: '0.5rem',
            maxHeight: '220px',
            overflowY: 'auto',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {i18n.language.startsWith('es') ? 'Sugerencias de Catálogo' : 'Catalog Suggestions'}
          </div>
          {filteredSuggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => selectSuggestion(item)}
              style={{
                padding: '0.6rem 0.75rem',
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
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isListening ? (i18n.language.startsWith('es') ? 'Escuchando tu voz...' : 'Listening to your voice...') : t('chat.placeholder')}
            disabled={isLoading}
            style={{
              width: '100%',
              background: isListening ? 'var(--color-calories-bg)' : 'var(--bg-surface)',
              border: isListening ? '1px solid var(--color-calories)' : '1px solid var(--border-light)',
              borderRadius: '24px',
              padding: '0.75rem 3rem 0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-main)',
              outline: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              transition: 'all 0.25s ease'
            }}
          />

          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? 'Detener micrófono' : 'Dictar por voz'}
            style={{
              position: 'absolute',
              right: '0.5rem',
              background: isListening ? 'var(--color-calories)' : 'transparent',
              color: isListening ? '#FFF' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '50%',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isListening ? <MicOff size={18} className="spin" /> : <Mic size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          style={{
            background: text.trim() && !isLoading ? 'var(--color-indigo)' : 'var(--bg-subtle)',
            color: text.trim() && !isLoading ? '#FFF' : 'var(--text-subtle)',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: text.trim() && !isLoading ? 'pointer' : 'not-allowed',
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
