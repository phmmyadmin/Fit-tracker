import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ChatInputBar({ onSendFood, isLoading }) {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('chat.placeholder')}
          disabled={isLoading}
          style={{
            flex: 1,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            padding: '0.75rem 1.25rem',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-main)',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        />
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
