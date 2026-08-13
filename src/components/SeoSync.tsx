import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function upsertLink(rel: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  return el;
}

/**
 * SPA SEO sync:
 * - Ensures canonical + og:url track the current route so Google doesn't treat every page as "/".
 */
export function SeoSync() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const origin = window.location.origin || 'https://www.vishnuvardhanburri.in';
    const href = `${origin}${pathname}${search ?? ''}`;

    const canonical = upsertLink('canonical');
    canonical.setAttribute('href', href);

    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: href });
  }, [pathname, search]);

  return null;
}
