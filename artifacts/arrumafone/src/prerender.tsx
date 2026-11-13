import { renderToString } from 'react-dom/server';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

/**
 * Renderiza uma rota como HTML estático para crawlers que não executam JS.
 * A árvore deve ser idêntica à de `main.tsx` para que a hidratação seja limpa.
 */
export function render(route: string): string {
  return renderToString(
    <ErrorBoundary>
      <App ssrPath={route} />
    </ErrorBoundary>,
  );
}
