# VeeScout Intake Assistant (Chat → Lead → Email) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the site assistant (VeeScout) into a short client-intake flow that generates a clean brief and sends it to Vishnu via `/api/contact`, with a safe fallback that pre-fills `/contact` if send fails.

**Architecture:** Add a small, testable “intake engine” (pure functions) + wire it into `PortfolioAssistant`. Implement a real Vercel Function at `api/contact.ts` and ensure SPA rewrites do not swallow `/api/*`. Use `sessionStorage` as a fallback transport to pre-fill the Contact form.

**Tech Stack:** React 19 + React Router, Motion (`motion/react`), Node 22 (built-in `node:test`), Resend, Vercel Functions.

---

## File Map (Write Scope)

**Create**
- `api/contact.ts` (Vercel Function, production contact endpoint)
- `src/components/assistant/intake.ts` (pure intake engine)
- `src/components/assistant/intake.test.ts` (node:test coverage for intake engine)
- `src/lib/intakePrefill.ts` (sessionStorage prefill helper)

**Modify**
- `vercel.json` (exclude `/api/*` from SPA rewrite; keep host redirect + sitemap/robots redirects)
- `package.json` (add `test` script for `node:test` running TS via `tsx/esm`)
- `src/pages/Contact.tsx` (read+apply prefill once; then delete)
- `src/components/PortfolioAssistant.tsx` (intake mode UX + send-to-Vishnu)

---

## Task 1: Add Minimal Test Runner (node:test + tsx)

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add a deterministic `test` script**

Edit `package.json` scripts block to include:

```json
{
  "scripts": {
    "test": "node --import tsx/esm --test src/components/assistant/intake.test.ts"
  }
}
```

- [ ] **Step 2: Run tests once (will fail until Task 2 adds the file)**

Run: `npm run test`  
Expected: FAIL with “Cannot find module … intake.test.ts” (or similar).

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "test: add node:test runner for assistant intake engine"
```

---

## Task 2: Implement Intake Engine (Pure, Testable)

**Files:**
- Create: `src/components/assistant/intake.ts`

- [ ] **Step 1: Create `src/components/assistant/intake.ts`**

```ts
// src/components/assistant/intake.ts
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
    const hasScheme = /^https?:\/\//i.test(raw);
    const url = new URL(hasScheme ? raw : `https://${raw}`);
    // Only accept http(s)
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
      return 'Pick a timeline and budget (budget is optional).';
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

export function buildContactPayload(data: IntakeData, meta: { loadedAt: number; submittedAt: number }): ContactPayload {
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/assistant/intake.ts
git commit -m "feat(assistant): add intake engine for VeeScout"
```

---

## Task 3: Add Intake Engine Tests

**Files:**
- Create: `src/components/assistant/intake.test.ts`

- [ ] **Step 1: Create `src/components/assistant/intake.test.ts`**

```ts
// src/components/assistant/intake.test.ts
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createEmptyIntake,
  shouldTriggerIntake,
  parseUrlMaybe,
  applyProductAnswer,
  applySymptomsAnswer,
  applyStackAnswer,
  applyTimelineBudgetAnswer,
  applyEmailAnswer,
  buildSummaryText,
} from './intake';

test('shouldTriggerIntake detects intent', () => {
  assert.equal(shouldTriggerIntake('Hi'), false);
  assert.equal(shouldTriggerIntake('Can you audit my backend?'), true);
  assert.equal(shouldTriggerIntake('Find my product problem'), true);
});

test('parseUrlMaybe normalizes URLs', () => {
  assert.equal(parseUrlMaybe(''), '');
  assert.ok(parseUrlMaybe('example.com').startsWith('https://'));
  assert.ok(parseUrlMaybe('https://example.com').startsWith('https://'));
  assert.equal(parseUrlMaybe('ftp://example.com'), '');
});

test('intake flow advances steps and stores answers', () => {
  let st = createEmptyIntake();
  st = applyProductAnswer(st, 'https://example.com');
  assert.equal(st.step, 'symptoms');
  assert.ok(st.data.productUrl.includes('https://'));

  st = applySymptomsAnswer(st, 'API 500s, slow queries');
  assert.equal(st.step, 'stack');
  assert.equal(st.data.symptoms, 'API 500s, slow queries');

  st = applyStackAnswer(st, 'Node, Postgres, AWS');
  assert.equal(st.step, 'timeline_budget');

  st = applyTimelineBudgetAnswer(st, { timeline: 'ASAP', budget: '$5k-$10k' });
  assert.equal(st.step, 'email');

  st = applyEmailAnswer(st, 'founder@example.com');
  assert.equal(st.step, 'summary');
  assert.equal(st.data.email, 'founder@example.com');

  const summary = buildSummaryText(st.data);
  assert.ok(summary.includes('Timeline: ASAP'));
  assert.ok(summary.includes('Budget: $5k-$10k'));
});
```

- [ ] **Step 2: Run tests**

Run: `npm run test`  
Expected: PASS (0 failing tests).

- [ ] **Step 3: Commit**

```bash
git add src/components/assistant/intake.test.ts
git commit -m "test(assistant): cover intake engine flow"
```

---

## Task 4: Add Prefill Helper + Contact Prefill Read

**Files:**
- Create: `src/lib/intakePrefill.ts`
- Modify: `src/pages/Contact.tsx`

- [ ] **Step 1: Create `src/lib/intakePrefill.ts`**

```ts
// src/lib/intakePrefill.ts
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
```

- [ ] **Step 2: Modify Contact page to consume prefill on mount**

In `src/pages/Contact.tsx`, update imports and add a mount effect:

```ts
import React, { useEffect, useState } from 'react';
import { consumeContactPrefill } from '@/src/lib/intakePrefill';
```

Then, right after `useState` declarations:

```ts
  const [prefilledFromAssistant, setPrefilledFromAssistant] = useState(false);

  useEffect(() => {
    const prefill = consumeContactPrefill();
    if (!prefill) return;
    setFormData((prev) => ({
      ...prev,
      name: prefill.name ?? prev.name,
      email: prefill.email ?? prev.email,
      company: prefill.company ?? prev.company,
      productUrl: prefill.productUrl ?? prev.productUrl,
      region: prefill.region ?? prev.region,
      timeline: prefill.timeline ?? prev.timeline,
      budget: prefill.budget ?? prev.budget,
      stack: prefill.stack ?? prev.stack,
      message: prefill.message ?? prev.message,
    }));
    setPrefilledFromAssistant(true);
  }, []);
```

Finally, render a subtle banner just above the form:

```tsx
{prefilledFromAssistant && (
  <div className="mb-6 rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
    <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-emerald-400">Prefilled</div>
    <div className="mt-2 text-sm text-zinc-400">
      VeeScout prepared this brief. Review and hit send.
    </div>
  </div>
)}
```

- [ ] **Step 3: Run typecheck**

Run: `npm run lint`  
Expected: exit code 0.

- [ ] **Step 4: Commit**

```bash
git add src/lib/intakePrefill.ts src/pages/Contact.tsx
git commit -m "feat(contact): prefill intake briefs via sessionStorage"
```

---

## Task 5: Make `/api/contact` Real in Production (Vercel Function) + Fix Rewrites

**Files:**
- Create: `api/contact.ts`
- Modify: `vercel.json`

- [ ] **Step 1: Create `api/contact.ts` (Vercel Function)**

```ts
// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

function escapeHtml(value: unknown) {
  const s = String(value ?? '');
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const {
      name,
      email,
      company,
      productUrl,
      region,
      timeline,
      budget,
      stack,
      message,
      confirmEmail,
      meta,
    } = (req.body ?? {}) as any;

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      company: escapeHtml(company),
      productUrl: escapeHtml(productUrl),
      region: escapeHtml(region),
      timeline: escapeHtml(timeline),
      budget: escapeHtml(budget),
      stack: escapeHtml(stack),
      message: escapeHtml(message).replace(/\n/g, '<br/>'),
    };

    const loadedAt = Number(meta?.loadedAt ?? 0);
    const submittedAt = Number(meta?.submittedAt ?? 0);
    const isBot =
      Boolean(String(confirmEmail ?? '').trim()) ||
      (loadedAt > 0 && submittedAt > 0 && submittedAt - loadedAt < 1200);

    if (isBot) return res.status(200).json({ success: true, ignored: true });

    if (!safe.name || !safe.email || !safe.company || !safe.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'vishnuvardhanburri21@gmail.com',
      subject: `New Inquiry: ${safe.name} (${safe.company})`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Company / Project:</strong> ${safe.company}</p>
        <p><strong>Product URL:</strong> ${safe.productUrl || '—'}</p>
        <p><strong>Region / Time Zone:</strong> ${safe.region || '—'}</p>
        <p><strong>Timeline:</strong> ${safe.timeline || '—'}</p>
        <p><strong>Budget:</strong> ${safe.budget || '—'}</p>
        <p><strong>Stack:</strong> ${safe.stack || '—'}</p>
        <p><strong>Message:</strong></p>
        <p>${safe.message}</p>
      `,
    });

    if (error) return res.status(400).json(error);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

- [ ] **Step 2: Update `vercel.json` to NOT rewrite `/api/*` to `index.html`**

Replace the `rewrites` block with:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

Keep existing redirects.

- [ ] **Step 3: Run typecheck**

Run: `npm run lint`  
Expected: exit code 0.

- [ ] **Step 4: Commit**

```bash
git add api/contact.ts vercel.json
git commit -m "feat(api): add /api/contact Vercel function and fix SPA rewrites"
```

---

## Task 6: Wire Intake Mode Into `PortfolioAssistant`

**Files:**
- Modify: `src/components/PortfolioAssistant.tsx`

- [ ] **Step 1: Import intake engine + prefill helper**

At top of `src/components/PortfolioAssistant.tsx`, add:

```ts
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createEmptyIntake,
  shouldTriggerIntake,
  getStepLabel,
  getStepPrompt,
  applyProductAnswer,
  applySymptomsAnswer,
  applyStackAnswer,
  applyTimelineBudgetAnswer,
  applyEmailAnswer,
  buildContactPayload,
  buildSummaryText,
  type IntakeBudget,
  type IntakeTimeline,
  type IntakeState,
} from '@/src/components/assistant/intake';
import { saveContactPrefill } from '@/src/lib/intakePrefill';
```

- [ ] **Step 2: Add intake state + “loadedAt” timestamp**

Inside `PortfolioAssistant()` component:

```ts
  const navigate = useNavigate();
  const location = useLocation();
  const assistantLoadedAtRef = useRef(Date.now());
  const [intake, setIntake] = useState<IntakeState | null>(null);
```

- [ ] **Step 3: Trigger intake mode on suggestion or keywords**

Update `sendMessage()` so that if the user selects “Find my product problem” or message matches `shouldTriggerIntake`, it switches into intake:

```ts
  const sendMessage = (value: string) => {
    const text = value.trim();
    if (!text) return;

    // Start intake if intent appears.
    if (!intake && (text === 'Find my product problem' || shouldTriggerIntake(text))) {
      const next = createEmptyIntake();
      setIntake(next);
      setMessages((prev) => [
        ...prev,
        { role: 'visitor', content: text },
        { role: 'assistant', content: `Got it. I’ll collect the 5 things Vishnu needs to spot the real issue. ${getStepPrompt(next.step)}` },
      ]);
      setInput('');
      return;
    }

    // Intake step routing
    if (intake && intake.step !== 'summary') {
      setMessages((prev) => [...prev, { role: 'visitor', content: text }]);

      setIntake((prev) => {
        if (!prev) return prev;
        let updated = prev;
        if (prev.step === 'product') updated = applyProductAnswer(prev, text);
        else if (prev.step === 'symptoms') updated = applySymptomsAnswer(prev, text);
        else if (prev.step === 'stack') updated = applyStackAnswer(prev, text);
        else if (prev.step === 'email') updated = applyEmailAnswer(prev, text);

        // Prompt next question or show summary.
        if (updated.step === 'timeline_budget') {
          setMessages((m) => [...m, { role: 'assistant', content: getStepPrompt('timeline_budget') }]);
        } else if (updated.step === 'email') {
          setMessages((m) => [...m, { role: 'assistant', content: getStepPrompt('email') }]);
        } else if (updated.step === 'summary') {
          setMessages((m) => [...m, { role: 'assistant', content: `Summary ready:\n\n${buildSummaryText(updated.data)}\n\nUse “Send to Vishnu” below.` }]);
        } else {
          setMessages((m) => [...m, { role: 'assistant', content: getStepPrompt(updated.step) }]);
        }
        return updated;
      });

      setInput('');
      return;
    }

    // Default chat behavior
    setMessages((prev) => [
      ...prev,
      { role: 'visitor', content: text },
      { role: 'assistant', content: getPortfolioReply(text) },
    ]);
    setInput('');
  };
```

- [ ] **Step 4: Add timeline/budget UI inside assistant when `step === "timeline_budget"`**

Add a compact inline panel in the message list when intake step is timeline/budget:

```tsx
{intake?.step === 'timeline_budget' && (
  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500">
      {getStepLabel('timeline_budget')}
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <select
        value={intake.data.timeline}
        onChange={(e) =>
          setIntake((prev) =>
            prev ? { ...prev, data: { ...prev.data, timeline: e.target.value as IntakeTimeline } } : prev,
          )
        }
        className="w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white"
      >
        <option value="">Timeline</option>
        <option value="ASAP">ASAP</option>
        <option value="1-2 weeks">1-2 weeks</option>
        <option value="2-4 weeks">2-4 weeks</option>
        <option value="1-3 months">1-3 months</option>
        <option value="Not sure">Not sure</option>
      </select>

      <select
        value={intake.data.budget}
        onChange={(e) =>
          setIntake((prev) => (prev ? { ...prev, data: { ...prev.data, budget: e.target.value as IntakeBudget } } : prev))
        }
        className="w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white"
      >
        <option value="">Budget (optional)</option>
        <option value="$1k-$5k">$1k-$5k</option>
        <option value="$5k-$10k">$5k-$10k</option>
        <option value="$10k-$25k">$10k-$25k</option>
        <option value="$25k+">$25k+</option>
        <option value="Not sure">Not sure</option>
      </select>
    </div>
    <button
      type="button"
      className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
      onClick={() => setIntake((prev) => (prev ? applyTimelineBudgetAnswer(prev, { timeline: prev.data.timeline as any, budget: prev.data.budget }) : prev))}
      disabled={!intake.data.timeline}
    >
      Continue
    </button>
  </div>
)}
```

- [ ] **Step 5: Add “Send to Vishnu” / “Edit” actions for summary step**

Render CTA buttons when `intake?.step === 'summary'`:

```tsx
{intake?.step === 'summary' && (
  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500">Summary</div>
    <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black p-3 text-[11px] text-zinc-300">
      {buildSummaryText(intake.data)}
    </pre>

    <div className="mt-3 grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={async () => {
          setIntake((prev) => (prev ? { ...prev, sendState: 'sending' } : prev));
          try {
            const meta = { loadedAt: assistantLoadedAtRef.current, submittedAt: Date.now() };
            const payload = buildContactPayload(intake.data, meta);
            const resp = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            if (resp.ok) {
              setIntake((prev) => (prev ? { ...prev, sendState: 'sent' } : prev));
              setMessages((m) => [...m, { role: 'assistant', content: 'Sent. Vishnu will reply soon.' }]);
            } else {
              throw new Error('send_failed');
            }
          } catch {
            // fallback: prefill contact page
            saveContactPrefill({
              name: intake.data.name || 'Visitor',
              email: intake.data.email,
              company: intake.data.company || 'Project',
              productUrl: intake.data.productUrl,
              timeline: intake.data.timeline,
              budget: intake.data.budget,
              stack: intake.data.stack,
              message: `VeeScout Intake Brief\n\n${buildSummaryText(intake.data)}\n\n---\nRaw symptoms:\n${intake.data.symptoms}`,
            });
            setMessages((m) => [...m, { role: 'assistant', content: 'Could not send automatically. Opening Contact with your brief prefilled.' }]);
            navigate('/contact');
            setIntake((prev) => (prev ? { ...prev, sendState: 'error' } : prev));
          }
        }}
        className="rounded-xl bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black disabled:opacity-60"
        disabled={intake.sendState === 'sending'}
      >
        {intake.sendState === 'sending' ? 'Sending…' : 'Send to Vishnu'}
      </button>

      <button
        type="button"
        onClick={() => setIntake(createEmptyIntake())}
        className="rounded-xl border border-white/10 bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
      >
        Edit
      </button>
    </div>
  </div>
)}
```

- [ ] **Step 6: Run app + manual smoke**

Run: `npm run dev`  
Open: `http://localhost:3000/`  
Expected:
1. Click assistant button → opens panel
2. Send “Find my product problem” → intake starts
3. Complete steps → summary appears
4. Click “Send to Vishnu” → either success, or fallback opens `/contact` with prefilled form

- [ ] **Step 7: Commit**

```bash
git add src/components/PortfolioAssistant.tsx
git commit -m "feat(assistant): add intake mode with send-to-Vishnu + fallback prefill"
```

---

## Task 7: Verification + Deployment Checklist

**Files:**
- (no new files required)

- [ ] **Step 1: Run checks**

Run: `npm run lint`  
Expected: exit code 0.

Run: `npm run test`  
Expected: PASS.

- [ ] **Step 2: Verify in Playwright (desktop + mobile)**

Desktop: `http://localhost:3000/` and `/contact`  
Mobile viewport: `390x844`

Expected:
- Assistant button visible bottom-right
- Intake flow usable without layout overflow
- Contact page shows “Prefilled” banner after fallback navigation

- [ ] **Step 3: Push**

```bash
git push origin main
```

- [ ] **Step 4: Vercel env + routing**

Confirm in Vercel Project Settings:
- `RESEND_API_KEY` is set
- After deploy, `POST https://www.vishnuvardhanburri.in/api/contact` returns JSON (not `index.html`)

