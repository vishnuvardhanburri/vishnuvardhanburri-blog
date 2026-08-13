import { INTAKE_PREFILL_STORAGE_KEY } from '@/src/components/assistant/intake';

export type ContactPrefill = {
  name?: string;
  email?: string;
  company?: string;
  productUrl?: string;
  region?: string;
  timeline?: string;
  budget?: string;
  stack?: string;
  message?: string;
};

export function saveContactPrefill(payload: ContactPrefill) {
  try {
    sessionStorage.setItem(INTAKE_PREFILL_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
}

export function consumeContactPrefill(): ContactPrefill | null {
  try {
    const raw = sessionStorage.getItem(INTAKE_PREFILL_STORAGE_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(INTAKE_PREFILL_STORAGE_KEY);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as ContactPrefill;
  } catch {
    return null;
  }
}

