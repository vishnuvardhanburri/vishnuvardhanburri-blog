import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, FileText, ShieldCheck, Timer, Wrench } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';
import { ConversionCtas } from '@/src/components/ConversionCtas';

export function Process() {
  usePageMeta({
    title: 'How I Work | Audit, Ship, Stabilize | Vishnu Vardhan Burri',
    description:
      'A founder-friendly delivery process for backend and platform work: audit the real risk, plan with tradeoffs, ship production-safe changes, and stabilize with observability + runbooks. Remote-friendly worldwide across time zones.',
  });

  const steps = [
    {
      icon: <Timer className="text-blue-500" />,
      title: '1) Audit the real risk',
      body:
        'I start by mapping boundaries: what owns what, where the data can corrupt, what breaks deployments, and why latency or incidents repeat.',
      outputs: ['Architecture map', 'Top risks list', 'Quick wins + pressure points'],
    },
    {
      icon: <FileText className="text-emerald-500" />,
      title: '2) Plan with tradeoffs',
      body:
        'You get a short execution plan you can trust: priorities, what changes first, what stays stable, and what we will not touch yet.',
      outputs: ['7-14 day plan', 'Scope boundaries', 'Rollback + verification path'],
    },
    {
      icon: <Wrench className="text-orange-500" />,
      title: '3) Ship in small, safe loops',
      body:
        'I ship changes as compact modules with clear acceptance criteria. Less drama, fewer regressions, easier review, faster iteration.',
      outputs: ['PRs that are reviewable', 'Release checklist', 'Safer deploy loop'],
    },
    {
      icon: <ShieldCheck className="text-blue-400" />,
      title: '4) Stabilize so it stays calm',
      body:
        'The goal is not “fixed once.” It is a calmer system: logs you can trust, dashboards that tell the truth, and runbooks for recovery.',
      outputs: ['Structured logs + metrics', 'Dashboards + alerts', 'Runbooks + handoff notes'],
    },
  ];

  const notFit = [
    'You want a quick landing page, marketing site, or generic agency build.',
    'You want “move fast” without validation, observability, or release safety.',
    'You cannot share any context (access, logs, metrics, or a brief).',
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="mb-24 text-center">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
          Process // Founder Delivery
        </span>
        <h1 className="mb-8 text-5xl font-bold italic tracking-tighter md:text-8xl">
          Audit. Ship. Stabilize.
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-500">
          I work like a problem solver, not a ticket machine. The job is to remove backend risk that slows founders down: fragile APIs, messy data,
          slow releases, cloud friction, and production surprises.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_10%,rgba(59,130,246,0.12),transparent_52%)]" />
            <div className="relative">
              {step.icon}
              <h2 className="mt-6 text-xl font-bold uppercase italic tracking-tight text-white sm:text-2xl">{step.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">{step.body}</p>

              <div className="mt-8 grid gap-2">
                {step.outputs.map((o) => (
                  <div key={o} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/40 p-4">
                    <CheckCircle2 size={16} className="mt-0.5 text-blue-500" />
                    <span className="text-sm leading-relaxed text-zinc-400">{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/5 bg-black/50 p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Remote Fit</div>
          <h3 className="mt-6 text-2xl font-bold uppercase italic tracking-tight text-white">Built for distributed teams.</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Most of my work runs remote: crisp briefs, fast async loops, and scheduled syncs when decisions matter. I work worldwide across time zones, and I’m
            comfortable overlapping US/UK/UAE/EU hours when needed, without turning delivery into chaos.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Worldwide', 'Americas', 'Europe/UK', 'Middle East', 'APAC', 'Remote-first'].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-black/50 p-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Not A Fit</div>
          <h3 className="mt-6 text-2xl font-bold uppercase italic tracking-tight text-white">Clarity beats mismatch.</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            The fastest way to lose momentum is a bad fit. If any of these are true, I will tell you quickly and point you to a better path.
          </p>
          <div className="mt-8 grid gap-3">
            {notFit.map((line) => (
              <div key={line} className="rounded-2xl border border-white/5 bg-zinc-950/50 p-5 text-sm leading-relaxed text-zinc-400">
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
        <h2 className="text-2xl font-bold uppercase italic tracking-tight">Want the simplest next step?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Start with a short intake. I will reply with the next best engagement shape: audit, sprint, delivery, or retainer.
        </p>
        <ConversionCtas align="center" className="mt-8" />
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
          <Link to="/pricing" className="transition-colors hover:text-white">
            See pricing
          </Link>
          <span className="h-1 w-1 rounded-full bg-blue-500/40" aria-hidden="true" />
          <Link to="/case-studies" className="transition-colors hover:text-white">
            See work notes
          </Link>
        </div>
      </section>
    </div>
  );
}
