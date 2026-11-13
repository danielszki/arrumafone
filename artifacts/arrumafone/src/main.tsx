import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const container = document.getElementById('root')!;
const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
const options = {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error: unknown, errorInfo: { componentStack?: string | null }) => {
    console.error(error, errorInfo.componentStack);
  },
};

// O build injeta o HTML pré-renderizado dentro de #root; quando existe, hidratamos
// para preservar o conteúdo servido a crawlers sem executar JavaScript.
if (container.hasChildNodes()) {
  hydrateRoot(container, app, options);
} else {
  createRoot(container, options).render(app);
}
