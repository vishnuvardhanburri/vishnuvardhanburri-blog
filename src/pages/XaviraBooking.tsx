import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Banknote, CalendarClock, CheckCircle2, FileText, Send, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '@/src/lib/seo';

const CAL_URL = 'https://cal.com/vishnuvardhanburri/30min';

const licenseOptions = [
  {
    value: 'Internal License - GBP 40,000',
    label: 'Internal License',
    price: 'GBP 40,000',
    body: 'For one organization using Xavira Control Stack internally.',
  },
  {
    value: 'White Label - GBP 160,000',
    label: 'White Label',
    price: 'GBP 160,000',
    body: 'For commercial deployment, agency use, and reseller-style rights.',
  },
  {
    value: 'Maintenance - GBP 3,000/month',
    label: 'Maintenance',
    price: 'GBP 3k/mo',
    body: 'Operational support, platform maintenance, and rollout assistance.',
  },
] as const;

const readinessOptions = [
  'Ready for GBP bank transfer today',
  'Need invoice before payment',
  'Need procurement / legal review',
  'Evaluating fit before commercial step',
] as const;

const buyerTypes = [
  'Agency / white-label operator',
  'RevOps / outbound team',
  'Cybersecurity or AI consultancy',
  'SaaS / internal operations team',
  'Enterprise procurement / leadership',
] as const;

const inputClass =
  'w-full rounded-sm border border-white/5 bg-black px-5 py-4 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-800 focus:border-blue-500';
const labelClass = 'text-[9px] font-mono uppercase tracking-widest text-zinc-500';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const initialFormData = {
  name: '',
  email: '',
  company: '',
  role: '',
  website: '',
  region: '',
  license: 'White Label - GBP 160,000',
  buyerType: '',
  timeline: '',
  paymentReadiness: 'Need invoice before payment',
  legalBuyerName: '',
  billingEmail: '',
  billingCountry: '',
  billingAddress: '',
  taxId: '',
  poReference: '',
  signerName: '',
  useCase: '',
  notes: '',
  confirmEmail: '',
};

export function XaviraBooking() {
  usePageMeta({
    title: 'Xavira Licensing Qualification | Vishnu Vardhan Burri',
    description:
      'Submit buyer, billing, payment-readiness, and scheduling details for Xavira Control Stack licensing.',
  });

  const [formState, setFormState] = useState<FormState>('idle');
  const [formLoadedAt] = useState(() => Date.now());
  const [formData, setFormData] = useState(initialFormData);

  const selectedLicense = useMemo(
    () => licenseOptions.find((option) => option.value === formData.license) ?? licenseOptions[0],
    [formData.license],
  );

  const updateField = (field: keyof typeof initialFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormState('submitting');

    try {
      const response = await fetch('/api/xavira-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          meta: { loadedAt: formLoadedAt, submittedAt: Date.now() },
        }),
      });

      if (!response.ok) {
        setFormState('error');
        return;
      }

      setFormState('success');
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
            Xavira // Licensing
          </span>
          <h1 className="text-5xl font-bold italic tracking-tighter md:text-8xl">
            Qualify the buyer, then book the call.
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-500">
            This form is only for Xavira Control Stack. It collects the commercial, billing, and payment-readiness details needed before a serious licensing call.
          </p>
        </div>

        <aside className="rounded-3xl border border-white/5 bg-zinc-950/55 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black">
              <ShieldCheck size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase italic tracking-tight text-white">Xavira Control Stack</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Communication operations, AI governance, reputation visibility, compliance control, and infrastructure ownership.
              </p>
            </div>
          </div>
          <div className="mt-8 grid gap-3">
            {licenseOptions.map((option) => (
              <div
                key={option.value}
                className={`rounded-2xl border p-5 transition-colors ${
                  selectedLicense.value === option.value
                    ? 'border-blue-500/30 bg-blue-500/10'
                    : 'border-white/5 bg-black/35'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">{option.label}</div>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{option.body}</p>
                  </div>
                  <div className="shrink-0 text-right text-xl font-bold italic tracking-tighter text-white">{option.price}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.03]" />
          <div className="relative">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  className="flex min-h-[620px] flex-col items-center justify-center text-center"
                >
                  <CheckCircle2 size={54} className="mb-7 text-emerald-500" />
                  <h2 className="text-3xl font-bold uppercase italic tracking-tight text-white md:text-5xl">
                    Xavira packet received
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500">
                    The buyer, billing, payment, and use-case details have been sent for review. Next step: book the 30-minute licensing call.
                  </p>
                  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex w-full max-w-xs items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 sm:w-auto sm:max-w-none"
                    >
                      Book Licensing Call <ArrowUpRight size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFormState('idle');
                        setFormData(initialFormData);
                      }}
                      className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40 sm:w-auto sm:max-w-none"
                    >
                      Submit Another Packet <FileText size={14} className="text-blue-400" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div>
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-400">Step 1</div>
                    <h2 className="text-2xl font-bold uppercase italic tracking-tight">Buyer details</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Name</label>
                      <input required className={inputClass} value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Buyer name" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Work email</label>
                      <input required type="email" className={inputClass} value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="buyer@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Company</label>
                      <input required className={inputClass} value={formData.company} onChange={(e) => updateField('company', e.target.value)} placeholder="Company name" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Role / title</label>
                      <input className={inputClass} value={formData.role} onChange={(e) => updateField('role', e.target.value)} placeholder="Founder, RevOps, Partner..." />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Company website</label>
                      <input type="url" className={inputClass} value={formData.website} onChange={(e) => updateField('website', e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Region / time zone</label>
                      <input className={inputClass} value={formData.region} onChange={(e) => updateField('region', e.target.value)} placeholder="UK, EU, US, APAC..." />
                    </div>
                  </div>

                  <div className="absolute left-[-5000px] top-auto h-px w-px overflow-hidden">
                    <label className={labelClass}>Confirm email</label>
                    <input tabIndex={-1} autoComplete="off" value={formData.confirmEmail} onChange={(e) => updateField('confirmEmail', e.target.value)} />
                  </div>

                  <div className="border-t border-white/5 pt-8">
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-400">Step 2</div>
                    <h2 className="text-2xl font-bold uppercase italic tracking-tight">Commercial fit</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Xavira package</label>
                      <select required className={inputClass} value={formData.license} onChange={(e) => updateField('license', e.target.value)}>
                        {licenseOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-black">
                            {option.label} - {option.price}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Buyer type</label>
                      <select required className={inputClass} value={formData.buyerType} onChange={(e) => updateField('buyerType', e.target.value)}>
                        <option value="" className="bg-black">Select buyer type</option>
                        {buyerTypes.map((type) => (
                          <option key={type} value={type} className="bg-black">{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Timeline</label>
                      <select required className={inputClass} value={formData.timeline} onChange={(e) => updateField('timeline', e.target.value)}>
                        <option value="" className="bg-black">Select timeline</option>
                        <option value="ASAP / this week" className="bg-black">ASAP / this week</option>
                        <option value="Within 30 days" className="bg-black">Within 30 days</option>
                        <option value="This quarter" className="bg-black">This quarter</option>
                        <option value="Researching" className="bg-black">Researching</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Payment readiness</label>
                      <select required className={inputClass} value={formData.paymentReadiness} onChange={(e) => updateField('paymentReadiness', e.target.value)}>
                        {readinessOptions.map((option) => (
                          <option key={option} value={option} className="bg-black">{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>Use case / reason for buying</label>
                    <textarea
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      value={formData.useCase}
                      onChange={(e) => updateField('useCase', e.target.value)}
                      placeholder="What should Xavira control for the company: outbound operations, AI governance, compliance, white-label client delivery, internal operations..."
                    />
                  </div>

                  <div className="border-t border-white/5 pt-8">
                    <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-blue-400">Step 3</div>
                    <h2 className="text-2xl font-bold uppercase italic tracking-tight">Invoice and payment details</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Legal buyer / entity name</label>
                      <input required className={inputClass} value={formData.legalBuyerName} onChange={(e) => updateField('legalBuyerName', e.target.value)} placeholder="Legal company name" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Billing email</label>
                      <input required type="email" className={inputClass} value={formData.billingEmail} onChange={(e) => updateField('billingEmail', e.target.value)} placeholder="accounts@company.com" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Billing country</label>
                      <input required className={inputClass} value={formData.billingCountry} onChange={(e) => updateField('billingCountry', e.target.value)} placeholder="United Kingdom" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Tax / VAT / GST ID</label>
                      <input className={inputClass} value={formData.taxId} onChange={(e) => updateField('taxId', e.target.value)} placeholder="Optional, if applicable" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>PO / payment reference</label>
                      <input className={inputClass} value={formData.poReference} onChange={(e) => updateField('poReference', e.target.value)} placeholder="PO number, invoice reference, or company name" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Signer / decision maker</label>
                      <input required className={inputClass} value={formData.signerName} onChange={(e) => updateField('signerName', e.target.value)} placeholder="Who can approve the payment?" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>Billing address</label>
                    <textarea
                      required
                      rows={3}
                      className={`${inputClass} resize-none`}
                      value={formData.billingAddress}
                      onChange={(e) => updateField('billingAddress', e.target.value)}
                      placeholder="Registered billing address for invoice and bank-transfer records"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass}>Extra notes</label>
                    <textarea
                      rows={4}
                      className={`${inputClass} resize-none`}
                      value={formData.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      placeholder="Procurement steps, payment timing, requested contract terms, call agenda, or anything needed before the call."
                    />
                  </div>

                  {formState === 'error' && (
                    <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-300">
                      Submission failed. Please try again, or email hello@vishnulabs.com directly.
                    </p>
                  )}

                  <button
                    disabled={formState === 'submitting'}
                    className="group flex w-full items-center justify-center gap-4 rounded-sm bg-white px-6 py-5 text-[11px] font-bold uppercase tracking-[0.28em] text-black transition-all hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {formState === 'submitting' ? 'Sending Packet...' : 'Send Details'}
                    <Send size={16} className={formState === 'submitting' ? 'animate-pulse' : 'transition-transform group-hover:-translate-y-1 group-hover:translate-x-1'} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </section>

        <aside className="space-y-8">
          <section className="rounded-3xl border border-blue-500/10 bg-blue-500/5 p-8">
            <Banknote className="text-blue-400" />
            <h2 className="mt-6 text-xl font-bold uppercase italic tracking-tight">Payment path</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Xavira licensing is handled by invoice and GBP bank transfer. Bank details are shared only after the buyer packet is reviewed.
            </p>
            <div className="mt-6 grid gap-3">
              {['Legal buyer name', 'Billing email and address', 'Tax ID if applicable', 'PO or payment reference', 'Signer / approval owner'].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/35 p-4">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
                  <span className="text-sm leading-relaxed text-zinc-400">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8">
            <CalendarClock className="text-blue-400" />
            <h2 className="mt-6 text-xl font-bold uppercase italic tracking-tight">Call booking</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              After sending the details, book the 30-minute licensing call so the discussion starts with buyer context already in hand.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 flex w-full items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40"
            >
              Open Calendar <ArrowUpRight size={14} className="text-blue-400" />
            </a>
          </section>

          <section className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8">
            <FileText className="text-blue-400" />
            <h2 className="mt-6 text-xl font-bold uppercase italic tracking-tight">Need proof first?</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Review the Xavira executive proof brief before submitting the buyer packet.
            </p>
            <Link
              to="/xavira"
              className="mt-7 flex w-full items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40"
            >
              Back to Xavira <ArrowUpRight size={14} className="text-blue-400" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
