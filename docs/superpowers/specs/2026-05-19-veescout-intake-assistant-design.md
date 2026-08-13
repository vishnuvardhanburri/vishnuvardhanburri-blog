# VeeScout Intake Assistant (Chat → Lead → Email) — Design

Date: 2026-05-19
Repo: `vishnuvardhanburri-blog`

## Goal

Turn the website assistant (**VeeScout**) into a lightweight client-intake flow that:

1. Helps visitors describe their product problem clearly.
2. Produces a clean, founder-friendly summary.
3. Sends the summary to Vishnu via the existing `POST /api/contact` (Resend).
4. Falls back gracefully by pre-filling the `/contact` page if sending fails.

This is a conversion + credibility upgrade: visitors feel helped, and Vishnu receives better leads.

## Non-Goals

- No external LLM calls, no “AI model training,” no new backend services.
- No database storage of user chat history.
- No invasive analytics or tracking requirements.
- No “salesy” spam. The tone stays premium and problem-solving.

## UX Principles

- Default feels like a normal chat.
- When a visitor expresses intent to diagnose/hire (“Find my product problem”, “audit”, “help”, “backend is breaking”), VeeScout switches to **Intake Mode**.
- Intake Mode is short, structured, and skippable.
- The visitor can always exit Intake Mode and keep chatting.

## Intake Mode Flow

### Trigger

Any of:
- suggestion click: “Find my product problem”
- keywords in message: “audit”, “diagnose”, “problem”, “breaking”, “slow”, “scale”, “hire”, “consult”
- “I want to contact Vishnu” / “how do I work with him”

### Steps (5 questions max)

1. Product link or short description:
   - “Share your product URL (optional) or 1 line describing what it does.”
2. Symptoms:
   - “What is breaking / slow / risky right now? Give 2–3 symptoms.”
3. Stack:
   - “What stack are you on (backend, DB, infra)? If unsure, say ‘not sure’.”
4. Urgency + budget:
   - timeline: ASAP / 1–2w / 2–4w / 1–3m / not sure
   - budget (optional): `$1k-$5k`, `$5k-$10k`, `$10k-$25k`, `$25k+`, “not sure”
5. Contact email:
   - “Where should Vishnu reply?”

### Output

After step 5, VeeScout renders:
- a structured **Summary Card** (what the product is, what hurts, stack, urgency, budget, contact)
- 2 primary actions:
  - **Send to Vishnu**
  - **Edit answers**

Plus optional:
- “Or open the Contact page” link (safety valve)

## Delivery Mechanism

### Primary path: `POST /api/contact`

Reuse the existing contact endpoint in `server.ts`.

Payload mapping:
- `name`: from intake (or “Visitor” if unknown)
- `email`: intake email
- `company`: use “Project / Company” field if provided, else `Product`
- `productUrl`: product link
- `region`: optional (if we add later; not required now)
- `timeline`: selected timeline
- `budget`: selected budget
- `stack`: stack text
- `message`: formatted summary + the visitor’s raw symptom text
- `confirmEmail`: empty (honeypot)
- `meta`: `loadedAt/submittedAt` same as contact form (anti-bot)

If response is OK:
- show “Sent. Vishnu will reply soon.” + link to `/case-studies` and `/pricing`.

If response fails:
- show a fallback state:
  - “Couldn’t send automatically. Opening the contact page with your details prefilled.”
  - navigate to `/contact` with a prefill payload (see below).

### Fallback path: Prefill `/contact`

Mechanism:
- Store an object in `sessionStorage` under a stable key, e.g. `vvb_intake_prefill_v1`.
- Redirect to `/contact`.
- On `/contact`, read from `sessionStorage` once on mount and populate fields, then delete the key.

Why sessionStorage:
- avoids long URLs with sensitive-ish detail
- persists across a single-tab navigation
- no backend changes required

## Chat UI Changes

### New States

- `mode: "chat" | "intake"`
- `intakeStep: 0..4`
- `intakeData` object
- `intakeSendState: "idle" | "sending" | "sent" | "error"`

### Messages

The assistant should:
- greet warmly (“Hey hi, hope your week’s productive…”)
- be decisive and helpful (“I’ll collect the 5 things Vishnu needs to spot the real issue.”)
- keep responses short and skimmable

### Buttons/Controls

- Suggested chips remain.
- In intake mode, show a small progress indicator:
  - `Step 2/5` etc.
- After summary:
  - `Send to Vishnu`
  - `Edit`
  - `Contact page`

## Privacy & Trust Copy

Short line at the bottom of the assistant panel (subtle, not salesy):
- “This chat is used to create a project brief for Vishnu. Don’t share secrets you wouldn’t email.”

## SEO / Discoverability (Supportive, Not Heavy)

This change is mostly conversion, but it supports credibility:
- better lead capture → more consistent client conversations → better testimonials/case studies over time

## Success Criteria

- A visitor can complete intake in under ~60 seconds.
- Vishnu receives a usable email brief (not vague “hi”).
- If Resend key is missing or request fails, visitor still lands on `/contact` with everything filled.
- No regressions in scrolling behavior or mobile layout.

## Risks & Mitigations

- Spam submissions:
  - keep existing honeypot + “too-fast submit” checks (already in `server.ts`)
- Visitor frustration:
  - intake mode can be exited; “Edit answers” always available
- Sensitive content:
  - add the short privacy line and avoid storing history on server

