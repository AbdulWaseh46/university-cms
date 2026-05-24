import React from 'react';
import { useAppContext } from '../context/AppContext';

const icons = { success: '✓', error: '✕', info: 'ℹ' };

const ToastContainer = () => {
  const { toasts } = useAppContext();
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span style={{ fontWeight: 700, fontSize: '1rem' }}>{icons[t.type]}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
