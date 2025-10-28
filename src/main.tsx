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
