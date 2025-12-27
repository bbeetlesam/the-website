import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';
import App from './App.tsx'
import './index.css'

// initialize overlay scrollbars for the whole document body with a small custom theme
if (typeof document !== 'undefined') {
  OverlayScrollbars(document.body, {
    // the scrollbar auto-hides after user stops scrolling (mobile-like)
    scrollbars: { autoHide: 'scroll', autoHideDelay: 1000, visibility: 'auto' },
    overflow: { x: 'hidden', y: 'scroll' },
  });
  document.body.classList.add('os-theme-site');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log(
  '%c💿 bbeetlesam.dev 💿%c\n\n' +
  'Hey you, out there on your own\n' +
  'Sitting naked by the phone, would you touch me?\n\n' +
  'Hey you, don\'t tell me there\'s no hope at all\n' +
  'Together we stand, divided we fall\n',
  isDarkMode
    ? 'font-size: 20px; font-weight: bold; color: #1a1a1a; background: #f5f5f5;; padding: 8px 12px; border-radius: 10px;'
    : 'font-size: 20px; font-weight: bold; color: #f5f5f5; background: #323237; padding: 8px 12px; border-radius: 10px;',
  isDarkMode
    ? 'font-size: 14px; color: #e0e0e0; padding: 3px;'
    : 'font-size: 14px; color: #323237; padding: 3px;'  
);
