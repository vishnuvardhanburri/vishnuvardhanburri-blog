import type { Config } from 'tailwindcss';

// Tailwind v4 can run without a config, but a tight `content` set keeps builds fast
// (especially when the repo contains screenshots, docs, and other large folders).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
} satisfies Config;

