// @ts-ignore
import { Resend } from 'resend';

function parseEmailList(value: string | undefined, fallback: string[]) {
  const raw = String(value ?? '').trim();
  if (!raw) return fallback;
  const parts = raw
    .split(/[,\n]/g)
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.length ? parts : fallback;
}

function extractEmailAddress(value: string) {
  const raw = String(value ?? '').trim();
  const match = raw.match(/<([^>]+)>/);
  if (match?.[1]) return match[1].trim();
  // If it's already a plain email, return it.
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return raw;
  return '';
}

function sanitizeHeaderValue(value: unknown) {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim();
}

function escapeHtml(value: unknown) {
  const s = String(value ?? '');
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
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

    const plain = {
      name: sanitizeHeaderValue(name),
      email: sanitizeHeaderValue(email),
      company: sanitizeHeaderValue(company),
      productUrl: sanitizeHeaderValue(productUrl),
      region: sanitizeHeaderValue(region),
      timeline: sanitizeHeaderValue(timeline),
      budget: sanitizeHeaderValue(budget),
      stack: sanitizeHeaderValue(stack),
      // Free-form: keep newlines (used only in internal email body).
      message: String(message ?? '').replace(/\r/g, ''),
    };

    const safe = {
      name: escapeHtml(plain.name),
      email: escapeHtml(plain.email),
      company: escapeHtml(plain.company),
      productUrl: escapeHtml(plain.productUrl),
      region: escapeHtml(plain.region),
      timeline: escapeHtml(plain.timeline),
      budget: escapeHtml(plain.budget),
      stack: escapeHtml(plain.stack),
      message: escapeHtml(plain.message).replace(/\n/g, '<br/>'),
    };

    const loadedAt = Number(meta?.loadedAt ?? 0);
    const submittedAt = Number(meta?.submittedAt ?? 0);
    const isBot =
      Boolean(String(confirmEmail ?? '').trim()) ||
      (loadedAt > 0 && submittedAt > 0 && submittedAt - loadedAt < 1200);

    if (isBot) return res.status(200).json({ success: true, ignored: true });

    if (!plain.name || !plain.email || !plain.company || !plain.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

    const resend = new Resend(apiKey);
    const to = parseEmailList(process.env.CONTACT_TO_EMAILS, ['hello@vishnulabs.com']);
    const from = String(process.env.RESEND_FROM ?? 'Portfolio Contact <onboarding@resend.dev>');
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: plain.email,
      subject: `New Inquiry: ${plain.name} (${plain.company})`,
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

    // Visitor confirmation email (keeps leads warm; low-risk, no marketing).
    // We preserve the verified domain by reusing the email address from RESEND_FROM.
    const fromEmail = extractEmailAddress(from);
    const visitorFrom =
      String(process.env.RESEND_VISITOR_FROM ?? '').trim() ||
      (fromEmail ? `VeeScout <${fromEmail}>` : from);

    try {
      const visitorSubject =
        String(process.env.RESEND_VISITOR_SUBJECT ?? '').trim() ||
        `Received: your message to Vishnu (${plain.company})`;

      const summaryLines = [
        plain.company ? `Company / Project: ${plain.company}` : '',
        plain.productUrl ? `Product URL: ${plain.productUrl}` : '',
        plain.region ? `Region / Time Zone: ${plain.region}` : '',
        plain.timeline ? `Timeline: ${plain.timeline}` : '',
        plain.budget ? `Budget: ${plain.budget}` : '',
        plain.stack ? `Stack: ${plain.stack}` : '',
      ].filter(Boolean);

      const visitorText = [
        `Hey ${plain.name},`,
        ``,
        `I’m VeeScout — Vishnu’s website assistant. I got your message and queued it for review.`,
        `You’ll hear back soon (usually within 24 hours).`,
        ``,
        summaryLines.length ? `What we received:` : ``,
        ...summaryLines,
        ``,
        `If you want a faster diagnosis, reply to this email with:`,
        `1) a link to the product or repo`,
        `2) 2-3 failing flows or screenshots`,
        `3) one production log snippet (or error code + frequency)`,
        ``,
        `If it’s urgent, you can book a call: https://cal.com/vishnuvardhanburri/30min`,
        ``,
        `— VeeScout`,
      ]
        .filter(Boolean)
        .join('\n');

      const visitorHtml = `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.55;color:#111">
          <p>Hey ${safe.name},</p>
          <p><strong>I’m VeeScout</strong> — Vishnu’s website assistant. I got your message and queued it for review.<br/>
          You’ll hear back soon (usually within 24 hours).</p>
          ${
            summaryLines.length
              ? `<p style="margin-top:18px"><strong>What we received:</strong><br/>${summaryLines
                  .map((l) => escapeHtml(l))
                  .join('<br/>')}</p>`
              : ''
          }
          <p style="margin-top:18px"><strong>If you want a faster diagnosis, reply with:</strong><br/>
            1) a link to the product or repo<br/>
            2) 2-3 failing flows or screenshots<br/>
            3) one production log snippet (or error code + frequency)
          </p>
          <p style="margin-top:18px">If it’s urgent, book a call: <a href="https://cal.com/vishnuvardhanburri/30min">cal.com/vishnuvardhanburri/30min</a></p>
          <p style="margin-top:22px">— VeeScout</p>
        </div>
      `;

      await resend.emails.send({
        from: visitorFrom,
        to: [plain.email],
        subject: visitorSubject,
        text: visitorText,
        html: visitorHtml,
      });
    } catch (confirmationErr) {
      // Don't fail the primary lead email if confirmation fails.
      console.error('Visitor confirmation send failed:', confirmationErr);
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
