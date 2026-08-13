import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronRight, Shield, Sparkles, Timer, Wallet } from 'lucide-react';
import { AI_DELIVERY_PRINCIPLES, AI_TOOLKIT, PRICING_PLANS } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';
import { ConversionCtas } from '@/src/components/ConversionCtas';

export function Pricing() {
  usePageMeta({
    title: 'Pricing | Audit, Stabilization, Delivery | Vishnu Vardhan Burri',
    description:
      'Founder-friendly pricing for backend & platform work: system audits, stabilization sprints, delivery builds, and retainers. Clear scope, clean handoff, calmer production.',
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="mb-24 text-center">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
          Pricing // Founder Clarity
        </span>
        <h1 className="mb-8 text-5xl font-bold italic tracking-tighter md:text-8xl">Clear pricing. Clean delivery.</h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-500">
          This is not generic “web development.” The work is backend, platform, and system pressure: reliability, scale, cloud
          friction, messy architecture, and high-stakes delivery. If you want a predictable way to engage, pick the shape below.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-3">
        {[
          {
            icon: <Timer className="text-blue-500" />,
            title: 'Fast response',
            body: 'I move quickly when the system is under pressure: short loops, visible progress, and clear decisions.',
          },
          {
            icon: <Shield className="text-emerald-500" />,
            title: 'Risk-first engineering',
            body: 'Validation, observability, and rollback thinking are default. The goal is calmer production.',
          },
          {
            icon: <Wallet className="text-orange-500" />,
            title: 'No surprise scope',
            body: 'You’ll get a plan with tradeoffs, risks, and a clear “what’s included” boundary before delivery starts.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-black p-10 sm:p-12">
            {item.icon}
            <h3 className="mt-6 text-sm font-bold uppercase tracking-widest">{item.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-24">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">
              Engagement Options
            </span>
            <h2 className="text-3xl font-bold italic tracking-tighter md:text-5xl">Pick the delivery shape.</h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 transition-colors hover:text-white"
          >
            Start a conversation <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            >
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_10%,rgba(59,130,246,0.12),transparent_50%)]" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-zinc-600">{plan.duration}</div>
                    <h3 className="mt-3 text-2xl font-bold uppercase italic tracking-tight text-white sm:text-3xl">
                      {plan.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-500">{plan.bestFor}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black px-6 py-5 text-center">
                    <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-zinc-600">Starting</div>
                    <div className="mt-2 text-3xl font-bold italic tracking-tighter">{plan.price}</div>
                  </div>
                </div>

                <div className="mt-10 grid gap-3">
                  {plan.outcomes.map((outcome) => (
                    <div
                      key={outcome}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/40 p-4"
                    >
                      <CheckCircle2 size={16} className="mt-0.5 text-blue-500" />
                      <span className="text-sm leading-relaxed text-zinc-400">{outcome}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xl text-xs leading-relaxed text-zinc-600">{plan.notes}</p>
                  <a
                    href="https://www.xaviratechlabs.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300 transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    Enquire on XAVIRA <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-10 text-center">
          <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">AI // Pricing Reality</span>
          <h2 className="text-3xl font-bold italic tracking-tighter md:text-5xl">AI tools reduce time. Not responsibility.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500">
            Yes, I use AI tooling to move faster. But founders don’t pay for tokens or autocomplete. They pay for outcomes:
            correct systems, safe launches, fewer incidents, and backend foundations that don’t collapse under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10">
            <div className="flex items-center gap-3">
              <Sparkles className="text-emerald-400" />
              <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-400">Where AI Helps</div>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                'Faster iteration loops: drafts, refactors, test scaffolds, migrations planning.',
                'More surface area: I can reason through unfamiliar codebases and stacks faster.',
                'Better clarity: turning messy symptoms into clean action plans and checklists.',
              ].map((line) => (
                <div key={line} className="rounded-2xl border border-white/5 bg-black/40 p-4 text-sm leading-relaxed text-zinc-400">
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10">
            <div className="flex items-center gap-3">
              <Shield className="text-blue-500" />
              <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-400">What You’re Really Buying</div>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                'Judgment: the right boundary, the right tradeoff, the right “don’t ship this.”',
                'Production safety: validation, rollback paths, observability, and failure containment.',
                'Ownership: shipping the change end-to-end and standing behind it.',
              ].map((line) => (
                <div key={line} className="rounded-2xl border border-white/5 bg-black/40 p-4 text-sm leading-relaxed text-zinc-400">
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {AI_TOOLKIT.slice(0, 2).map((block) => (
            <div key={block.title} className="rounded-3xl border border-white/5 bg-black/40 p-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-blue-400">{block.title}</div>
              <div className="mt-6 grid gap-3">
                {block.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/30 p-4">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span className="text-sm leading-relaxed text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {AI_DELIVERY_PRINCIPLES.map((principle) => (
            <span key={principle} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
              {principle}
            </span>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/5 bg-zinc-950/50 p-10 text-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">Pricing Policy</div>
            <h3 className="text-xl font-bold italic tracking-tight md:text-2xl">Rates are firm.</h3>
            <p className="text-sm leading-relaxed text-zinc-500">
              Pricing is scope-based and I don’t negotiate discounts. If budget is a constraint, we can still make progress by right-sizing
              scope: start with a short audit, fix the highest-risk bottleneck first, then stage the rest.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
        <h2 className="text-2xl font-bold uppercase italic tracking-tight">Not sure what you need yet?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          That’s normal. Most founders start with a messy symptom: slow releases, flaky APIs, scale anxiety, cloud bills, or
          reliability surprises. Tell me what hurts and I’ll recommend the simplest engagement that gets you clarity.
        </p>
        <ConversionCtas align="center" className="mt-8" />
      </section>
    </div>
  );
}
