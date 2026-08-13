const SITE_FACTS = `
Vishnu Vardhan Burri is a backend systems engineer, AI infrastructure engineer, and founder of Xavira Tech Labs.
Positioning: production-grade backend systems, API architecture, distributed systems, cloud infrastructure, observability, reliability, secure workflows, and AI systems with guardrails.
Credibility: Toptal Verified Expert in Engineering, B.Tech CSE Cybersecurity at The Apollo University, Xavira Tech Labs founder, public LinkedIn/GitHub/Toptal presence.
Core services: architecture audits, backend stabilization, API redesign, Postgres performance, migrations, observability, CI/CD, cloud deployment, AI/RAG infrastructure, automation workflows, security/access-control cleanup.
AI stance: AI is a tool; Vishnu is accountable for production outcomes. AI helps draft and accelerate, but founders pay for judgment, tradeoffs, validation, observability, rollback safety, and ownership.
Pricing stance: polite and firm. No discount bargaining. If budget is tight, reduce scope, start with an audit, or stage delivery.
Best lead info: product link, current stack, main pain, users/traffic, failing flows, logs/errors, timeline, budget range, and desired outcome.
Contact destination: hello@vishnulabs.com.
Assistant name: VeeScout.
`;

function sanitize(value: unknown, max = 1200) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function fallbackReply(message: string) {
  const text = message.toLowerCase();
  if (text.includes('price') || text.includes('budget') || text.includes('discount') || text.includes('cheap')) {
    return 'Pricing is scope-based and kept firm. If budget is tight, the best path is to reduce scope: start with a short audit, ship the highest-impact fix first, then stage the rest.';
  }

  return 'I can help with Vishnu, Xavira Tech Labs, backend systems, AI infrastructure, pricing, proof, and product diagnosis. Share your product link, current stack, main pain, timeline, and desired outcome, and I will shape it into a useful brief for Vishnu.';
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const message = sanitize(req.body?.message);
  if (!message) return res.status(400).json({ error: 'Missing message' });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(200).json({ reply: fallbackReply(message), source: 'fallback' });

  try {
    const model = process.env.OPENROUTER_MODEL || 'openrouter/free';
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.vishnuvardhanburri.in',
        'X-Title': 'Vishnu Vardhan Burri Portfolio Assistant',
      },
      body: JSON.stringify({
        model,
        temperature: 0.35,
        max_tokens: 360,
        messages: [
          {
            role: 'system',
            content:
              `You are VeeScout, Vishnu Vardhan Burri's website assistant. Be warm, concise, founder-facing, and technically credible. Use only the facts below. Do not invent employers, clients, guarantees, prices, or private details. If a visitor shares a problem, ask for the missing context and suggest the smallest useful next step. Keep pricing polite and firm.\n\n${SITE_FACTS}`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error('OpenRouter error:', response.status, await response.text());
      return res.status(200).json({ reply: fallbackReply(message), source: 'fallback' });
    }

    const json = await response.json();
    const reply = sanitize(json?.choices?.[0]?.message?.content, 1800);
    return res.status(200).json({ reply: reply || fallbackReply(message), source: reply ? 'openrouter' : 'fallback' });
  } catch (error) {
    console.error('Assistant API error:', error);
    return res.status(200).json({ reply: fallbackReply(message), source: 'fallback' });
  }
}
