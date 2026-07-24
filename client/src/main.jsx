import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/styles.css';
import './assets/styles/dashboard.css';
import './assets/styles/features.css';

// Global toast system attached to window (from script.js port)
window.showToast = (message) => {
  const container = document.getElementById('toastContainer') || (() => {
    const c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Global ripple effect attached to document
document.addEventListener('click', e => {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: fixed;
    left: ${e.clientX - 10}px;
    top:  ${e.clientY - 10}px;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.5), transparent);
    pointer-events: none;
    z-index: 9999;
    animation: rippleOut 0.6s ease forwards;
  `;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

if (!document.getElementById('rippleStyle')) {
  const style = document.createElement('style');
  style.id = 'rippleStyle';
  style.textContent = `
    @keyframes rippleOut {
      0%   { transform: scale(1);  opacity: 1; }
      100% { transform: scale(8);  opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
