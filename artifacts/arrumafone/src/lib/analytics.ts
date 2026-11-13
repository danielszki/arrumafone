type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Envia um evento para o GA4 (no-op quando a tag não carregou). */
export function track(event: string, params?: EventParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}

function linkContext(anchor: HTMLAnchorElement) {
  const testId = anchor.dataset.testid;
  const section = anchor.closest('section[id], footer, header');
  const sectionId = section?.id || (section?.tagName.toLowerCase() ?? '');
  return testId || sectionId || 'unknown';
}

/**
 * Um único listener delegado cobre todos os CTAs do site (hero, cards, rodapé,
 * botão flutuante), inclusive os que aparecem depois de uma navegação interna.
 */
export function initLinkTracking() {
  if (typeof document === 'undefined') return;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const href = anchor.getAttribute('href') || '';

    if (href.startsWith('tel:')) {
      track('phone_click', { link_location: linkContext(anchor) });
      return;
    }

    if (/wa\.me|api\.whatsapp\.com/i.test(href)) {
      track('whatsapp_click', { link_location: linkContext(anchor) });
    }
  });
}
