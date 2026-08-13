import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarClock, CheckCircle2, Mail, ShieldCheck, Timer, Video } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';
import { saveContactPrefill } from '@/src/lib/intakePrefill';

const CAL_URL = 'https://cal.com/vishnuvardhanburri/30min';
const CAL_EMBED_URL = 'https://cal.com/vishnuvardhanburri/30min?embed=1&theme=dark';

const callTypes = [
  {
    title: 'Backend audit',
    body: 'For products with slow APIs, fragile releases, unclear ownership, database pressure, or production incidents.',
    icon: ShieldCheck,
  },
  {
    title: 'AI infrastructure',
    body: 'For teams building RAG, assistants, workflow automation, guardrails, internal AI systems, or evaluation pipelines.',
    icon: Video,
  },
  {
    title: 'Xavira licensing',
    body: 'For buyers evaluating Sovereign Engine, Sovereign Shield, Xavira AI Assistant, internal licenses, or white-label rights.',
    icon: CalendarClock,
  },
] as const;

const prepItems = [
  'Product URL or short product summary',
  'Current stack and deployment setup',
  'The symptom hurting users, revenue, or team speed',
  'Timeline, urgency, and decision-maker context',
  'Budget range or commercial path if already known',
] as const;

const contactPrefill = {
  timeline: 'Book call / direct scheduling',
  stack: 'Booking page inquiry',
  message:
    'I tried to book a call and want to share context directly. Product / stack / problem / timeline:',
};

export function Book() {
  usePageMeta({
    title: 'Book a Call | Vishnu Vardhan Burri',
    description:
      'Book a focused call with Vishnu Vardhan Burri for backend audits, AI infrastructure, production reliability, Xavira licensing, and high-stakes platform work.',
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
            Book // Founder Call
          </span>
          <h1 className="text-5xl font-bold italic tracking-tighter md:text-8xl">
            Book a focused engineering call.
          </h1>
        </div>
        <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8">
          <p className="text-lg leading-relaxed text-zinc-500">
            Use this call for production backend issues, AI infrastructure, reliability decisions, architecture reviews, or Xavira Control Stack licensing. Bring the real problem. I will help you identify the smallest serious next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['30 minutes', 'Remote-friendly', 'Founder-level context'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-black/35 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {callTypes.map((callType, index) => {
          const Icon = callType.icon;
          return (
            <motion.article
              key={callType.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black">
                <Icon size={20} className="text-blue-400" />
              </div>
              <h2 className="mt-8 text-xl font-bold uppercase italic tracking-tight text-white">{callType.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">{callType.body}</p>
            </motion.article>
          );
        })}
      </section>

      <section className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <Timer className="text-blue-400" />
            <h2 className="text-xl font-bold uppercase italic tracking-tight">Before the call</h2>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-zinc-500">
            The best calls are specific. You do not need a perfect brief, but a few concrete details help turn the call into a useful diagnosis.
          </p>
          <div className="mt-8 grid gap-3">
            {prepItems.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/35 p-4">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
                <span className="text-sm leading-relaxed text-zinc-400">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-blue-400">Pricing note</div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Pricing is premium and scope-based. Low-price bargaining is not accepted. If budget is constrained, the right move is to reduce scope and start with the highest-impact diagnosis.
            </p>
          </div>
        </aside>

        <section className="overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="flex flex-col gap-4 border-b border-white/5 bg-black/50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">Calendar</div>
              <h2 className="mt-2 text-xl font-bold uppercase italic tracking-tight text-white">Select a time</h2>
            </div>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/10"
            >
              Open Cal.com <ArrowUpRight size={14} className="text-blue-400" />
            </a>
          </div>
          <div className="h-[760px] bg-black sm:h-[820px]">
            <iframe
              title="Book a call with Vishnu Vardhan Burri"
              src={CAL_EMBED_URL}
              className="h-full w-full border-0"
              loading="lazy"
              allow="clipboard-write; fullscreen"
            />
          </div>
        </section>
      </section>

      <section className="mt-20 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
        <Mail className="mx-auto text-blue-400" />
        <h2 className="mt-6 text-2xl font-bold uppercase italic tracking-tight md:text-3xl">
          Prefer to send context first?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          If the calendar does not load or you want to share a private product brief first, use the contact form and I will receive it at hello@vishnulabs.com.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            onClick={() => saveContactPrefill(contactPrefill)}
            className="group flex w-full max-w-xs items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 sm:w-auto sm:max-w-none"
          >
            Send Context <ArrowUpRight size={14} />
          </Link>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40 sm:w-auto sm:max-w-none"
          >
            Book on Cal.com <CalendarClock size={14} className="text-blue-400" />
          </a>
        </div>
      </section>
    </div>
  );
}
