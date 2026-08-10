import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

/**
 * A tab that was open across a deploy still references the previous build's
 * lazy chunks. When one fails to resolve, reload once so the tab picks up the
 * new index — the sessionStorage flag stops it becoming a reload loop.
 */
const CHUNK_RELOAD_KEY = 'sl-chunk-reload';
function isChunkLoadError(message: string) {
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(
    message,
  );
}
window.addEventListener('vite:preloadError', () => {
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return;
  sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
  window.location.reload();
});
window.addEventListener('error', (e) => {
  if (!isChunkLoadError(String(e?.message ?? ''))) return;
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return;
  sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
  window.location.reload();
});
window.addEventListener('unhandledrejection', (e) => {
  if (!isChunkLoadError(String((e?.reason as Error)?.message ?? e?.reason ?? ''))) return;
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return;
  sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
  window.location.reload();
});
window.addEventListener('load', () => sessionStorage.removeItem(CHUNK_RELOAD_KEY));

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
