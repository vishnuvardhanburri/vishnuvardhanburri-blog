import { useEffect } from 'react';

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

export function usePageMeta({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });

    if (image) {
      const origin = window.location.origin || 'https://www.vishnuvardhanburri.in';
      const absolute = image.startsWith('http') ? image : `${origin}${image}`;
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: absolute });
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: absolute });
    }
  }, [description, image, title]);
}
