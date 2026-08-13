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
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return raw;
  return '';
}

function sanitizeHeaderValue(value: unknown) {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim();
}

function sanitizeText(value: unknown) {
  return String(value ?? '').replace(/\r/g, '').trim();
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

function row(label: string, value: unknown) {
  const safeValue = escapeHtml(value || '—').replace(/\n/g, '<br/>');
  return `<tr><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;width:220px"><strong>${escapeHtml(label)}</strong></td><td style="padding:8px 12px;border-bottom:1px solid #eee">${safeValue}</td></tr>`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const {
      name,
      email,
      company,
      role,
      website,
      region,
      license,
      buyerType,
      timeline,
      paymentReadiness,
      legalBuyerName,
      billingEmail,
      billingCountry,
      billingAddress,
      taxId,
      poReference,
      signerName,
      useCase,
      notes,
      confirmEmail,
      meta,
    } = req.body ?? {};

    const loadedAt = Number(meta?.loadedAt ?? 0);
    const submittedAt = Number(meta?.submittedAt ?? 0);
    const isBot =
      Boolean(String(confirmEmail ?? '').trim()) ||
      (loadedAt > 0 && submittedAt > 0 && submittedAt - loadedAt < 1200);

    if (isBot) return res.status(200).json({ success: true, ignored: true });

    const plain = {
      name: sanitizeHeaderValue(name),
      email: sanitizeHeaderValue(email),
      company: sanitizeHeaderValue(company),
      role: sanitizeHeaderValue(role),
      website: sanitizeHeaderValue(website),
      region: sanitizeHeaderValue(region),
      license: sanitizeHeaderValue(license),
      buyerType: sanitizeHeaderValue(buyerType),
      timeline: sanitizeHeaderValue(timeline),
      paymentReadiness: sanitizeHeaderValue(paymentReadiness),
      legalBuyerName: sanitizeHeaderValue(legalBuyerName),
      billingEmail: sanitizeHeaderValue(billingEmail),
      billingCountry: sanitizeHeaderValue(billingCountry),
      billingAddress: sanitizeText(billingAddress),
      taxId: sanitizeHeaderValue(taxId),
      poReference: sanitizeHeaderValue(poReference),
      signerName: sanitizeHeaderValue(signerName),
      useCase: sanitizeText(useCase),
      notes: sanitizeText(notes),
    };

    const required = [
      plain.name,
      plain.email,
      plain.company,
      plain.license,
      plain.buyerType,
      plain.timeline,
      plain.paymentReadiness,
      plain.legalBuyerName,
      plain.billingEmail,
      plain.billingCountry,
      plain.billingAddress,
      plain.signerName,
      plain.useCase,
    ];
    if (required.some((value) => !value)) return res.status(400).json({ error: 'Missing required fields' });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

    const resend = new Resend(apiKey);
    const to = parseEmailList(process.env.XAVIRA_BOOKING_TO_EMAILS ?? process.env.CONTACT_TO_EMAILS, [
      'hello@vishnulabs.com',
    ]);
    const from = String(process.env.RESEND_FROM ?? 'Xavira Licensing <onboarding@resend.dev>');
    const calendarUrl = String(process.env.XAVIRA_CALENDAR_URL ?? 'https://cal.com/vishnuvardhanburri/30min');

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: plain.email,
      subject: `Xavira Buyer Packet: ${plain.company} - ${plain.license}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.55;color:#111">
          <h2>Xavira Control Stack Buyer Packet</h2>
          <p><strong>Calendar:</strong> <a href="${escapeHtml(calendarUrl)}">${escapeHtml(calendarUrl)}</a></p>
          <h3>Buyer</h3>
          <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:760px">
            ${row('Name', plain.name)}
            ${row('Email', plain.email)}
            ${row('Company', plain.company)}
            ${row('Role / title', plain.role)}
            ${row('Website', plain.website)}
            ${row('Region / time zone', plain.region)}
          </table>
          <h3>Commercial Fit</h3>
          <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:760px">
            ${row('Package', plain.license)}
            ${row('Buyer type', plain.buyerType)}
            ${row('Timeline', plain.timeline)}
            ${row('Payment readiness', plain.paymentReadiness)}
            ${row('Use case', plain.useCase)}
          </table>
          <h3>Invoice / Payment Details</h3>
          <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:760px">
            ${row('Legal buyer / entity', plain.legalBuyerName)}
            ${row('Billing email', plain.billingEmail)}
            ${row('Billing country', plain.billingCountry)}
            ${row('Billing address', plain.billingAddress)}
            ${row('Tax / VAT / GST ID', plain.taxId)}
            ${row('PO / payment reference', plain.poReference)}
            ${row('Signer / decision maker', plain.signerName)}
            ${row('Extra notes', plain.notes)}
          </table>
        </div>
      `,
    });

    if (error) return res.status(400).json(error);

    const fromEmail = extractEmailAddress(from);
    const visitorFrom =
      String(process.env.RESEND_VISITOR_FROM ?? '').trim() ||
      (fromEmail ? `Xavira Licensing <${fromEmail}>` : from);

    try {
      await resend.emails.send({
        from: visitorFrom,
        to: [plain.email],
        subject: `Received: Xavira licensing details for ${plain.company}`,
        text: [
          `Hey ${plain.name},`,
          ``,
          `I received your Xavira Control Stack buyer details.`,
          `Package: ${plain.license}`,
          `Payment readiness: ${plain.paymentReadiness}`,
          ``,
          `Next step: book the 30-minute licensing call here:`,
          calendarUrl,
          ``,
          `Bank-transfer or invoice details are shared after the buyer packet is reviewed.`,
          ``,
          `- Xavira Licensing`,
        ].join('\n'),
        html: `
          <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.55;color:#111">
            <p>Hey ${escapeHtml(plain.name)},</p>
            <p>I received your <strong>Xavira Control Stack</strong> buyer details.</p>
            <p><strong>Package:</strong> ${escapeHtml(plain.license)}<br/>
            <strong>Payment readiness:</strong> ${escapeHtml(plain.paymentReadiness)}</p>
            <p><strong>Next step:</strong> book the 30-minute licensing call:<br/>
            <a href="${escapeHtml(calendarUrl)}">${escapeHtml(calendarUrl)}</a></p>
            <p>Bank-transfer or invoice details are shared after the buyer packet is reviewed.</p>
            <p>- Xavira Licensing</p>
          </div>
        `,
      });
    } catch (confirmationErr) {
      console.error('Xavira confirmation send failed:', confirmationErr);
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Xavira booking API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
