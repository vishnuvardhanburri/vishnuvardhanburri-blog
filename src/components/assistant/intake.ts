export type IntakeMode = 'chat' | 'intake';

export type IntakeTimeline = 'ASAP' | '1-2 weeks' | '2-4 weeks' | '1-3 months' | 'Not sure';
export type IntakeBudget = '$1k-$5k' | '$5k-$10k' | '$10k-$25k' | '$25k+' | 'Not sure' | '';

export type IntakeStepId = 'product' | 'symptoms' | 'stack' | 'timeline_budget' | 'email' | 'summary';

export type IntakeSendState = 'idle' | 'sending' | 'sent' | 'error';

export type IntakeData = {
  name?: string;
  email: string;
  company: string;
  productUrl: string;
  productOneLiner: string;
  symptoms: string;
  stack: string;
  timeline: IntakeTimeline | '';
  budget: IntakeBudget;
};

export type IntakeState = {
  mode: IntakeMode;
  step: IntakeStepId;
  data: IntakeData;
  sendState: IntakeSendState;
};

export const INTAKE_PREFILL_STORAGE_KEY = 'vvb_intake_prefill_v1';

export function normalize(input: string) {
  return String(input ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
}

export function shouldTriggerIntake(input: string) {
  const text = normalize(input);
  if (!text) return false;
  const keywords = [
    'audit',
    'diagnose',
    'diagnosis',
    'review my product',
    'find my product problem',
    'problem',
    'breaking',
    'slow',
    'scale',
    'hire',
    'consult',
    'work with you',
    'work with me',
    'backend is',
    'incident',
    'downtime',
    'latency',
  ];
  return keywords.some((k) => text.includes(k));
}

export function createEmptyIntake(): IntakeState {
  return {
    mode: 'intake',
    step: 'product',
    sendState: 'idle',
    data: {
      email: '',
      company: '',
      productUrl: '',
      productOneLiner: '',
      symptoms: '',
      stack: '',
      timeline: '',
      budget: '',
    },
  };
}

export function parseUrlMaybe(value: string) {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  try {
    // If the user included a scheme, only accept http(s).
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(raw) && !/^https?:\/\//i.test(raw)) {
      return '';
    }
    const hasScheme = /^https?:\/\//i.test(raw);
    const url = new URL(hasScheme ? raw : `https://${raw}`);
    if (!/^https?:$/i.test(url.protocol)) return '';
    return url.toString();
  } catch {
    return '';
  }
}

export function getStepLabel(step: IntakeStepId) {
  const map: Record<IntakeStepId, string> = {
    product: 'Step 1/5',
    symptoms: 'Step 2/5',
    stack: 'Step 3/5',
    timeline_budget: 'Step 4/5',
    email: 'Step 5/5',
    summary: 'Summary',
  };
  return map[step];
}

export function getStepPrompt(step: IntakeStepId) {
  switch (step) {
    case 'product':
      return 'Share your product URL (optional) or 1 line describing what it does.';
    case 'symptoms':
      return 'What is breaking / slow / risky right now? Give 2–3 symptoms.';
    case 'stack':
      return 'What stack are you on (backend, DB, infra)? If unsure, say “not sure”.';
    case 'timeline_budget':
      return 'Pick a timeline and budget (budget is optional). Note: pricing is scope-based and kept firm (no discount negotiations) — if budget is tight, start with a smaller audit and stage delivery.';
    case 'email':
      return 'Where should Vishnu reply? (Email)';
    case 'summary':
      return 'Here is the brief. You can send it to Vishnu or edit.';
  }
}

export function applyProductAnswer(state: IntakeState, input: string): IntakeState {
  const productUrl = parseUrlMaybe(input);
  const productOneLiner = productUrl ? '' : String(input ?? '').trim();
  return {
    ...state,
    step: 'symptoms',
    data: { ...state.data, productUrl, productOneLiner },
  };
}

export function applySymptomsAnswer(state: IntakeState, input: string): IntakeState {
  return { ...state, step: 'stack', data: { ...state.data, symptoms: String(input ?? '').trim() } };
}

export function applyStackAnswer(state: IntakeState, input: string): IntakeState {
  return { ...state, step: 'timeline_budget', data: { ...state.data, stack: String(input ?? '').trim() } };
}

export function applyTimelineBudgetAnswer(
  state: IntakeState,
  input: { timeline: IntakeTimeline | ''; budget: IntakeBudget },
): IntakeState {
  return { ...state, step: 'email', data: { ...state.data, timeline: input.timeline, budget: input.budget } };
}

export function applyEmailAnswer(state: IntakeState, input: string): IntakeState {
  return { ...state, step: 'summary', data: { ...state.data, email: String(input ?? '').trim() } };
}

export function buildSummaryText(data: IntakeData) {
  const product = [data.productUrl, data.productOneLiner].filter(Boolean).join(' — ');
  const lines = [
    `Product: ${product || '—'}`,
    `Symptoms: ${data.symptoms || '—'}`,
    `Stack: ${data.stack || '—'}`,
    `Timeline: ${data.timeline || '—'}`,
    `Budget: ${data.budget || '—'}`,
    `Reply to: ${data.email || '—'}`,
  ];
  return lines.join('\n');
}

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  productUrl?: string;
  region?: string;
  timeline?: string;
  budget?: string;
  stack?: string;
  message: string;
  confirmEmail: string;
  meta: { loadedAt: number; submittedAt: number };
};

export function buildContactPayload(
  data: IntakeData,
  meta: { loadedAt: number; submittedAt: number },
): ContactPayload {
  const safeCompany = data.company?.trim() || 'Project';
  const message = `VeeScout Intake Brief\n\n${buildSummaryText(data)}\n\n---\nRaw symptoms:\n${data.symptoms || ''}`;
  return {
    name: data.name?.trim() || 'Visitor',
    email: data.email.trim(),
    company: safeCompany,
    productUrl: data.productUrl?.trim() || '',
    region: '',
    timeline: data.timeline || '',
    budget: data.budget || '',
    stack: data.stack || '',
    message,
    confirmEmail: '',
    meta,
  };
}
