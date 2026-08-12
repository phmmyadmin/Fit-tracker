import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ChatInputBar({ onSendFood, isLoading }) {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
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

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

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
