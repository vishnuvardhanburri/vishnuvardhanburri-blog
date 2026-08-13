import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, ArrowUpRight, Bot, BrainCircuit, CheckCircle2, DatabaseZap, GitCompare, Route, ShieldCheck } from 'lucide-react';
import { AI_DELIVERY_PRINCIPLES, AI_TOOLKIT } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';

const pillars = [
  {
    title: 'Retrieval and RAG systems',
    copy: 'Knowledge ingestion, chunking, vector search, retrieval routing, source grounding, and context controls for useful AI answers.',
    icon: DatabaseZap,
  },
  {
    title: 'Guardrails and validation',
    copy: 'Structured outputs, schema checks, safe fallbacks, authorization boundaries, and workflow rules when models are wrong.',
    icon: ShieldCheck,
  },
  {
    title: 'AI workflow orchestration',
    copy: 'Prompt routing, tool calls, human handoff, workflow automation, intake flows, and operations assistants that support real teams.',
    icon: Route,
  },
  {
    title: 'Observability for AI',
    copy: 'Logs, evaluation signals, failure categories, response traces, cost visibility, and feedback loops for continuous improvement.',
    icon: Activity,
  },
];

const comparison = [
  ['AI tools', 'Generate drafts, code snippets, summaries, and quick experiments.'],
  ['Vishnu', 'Owns architecture, safety, deployment, reliability, data boundaries, and business outcomes.'],
  ['Xavira', 'Packages the work into governed systems, assistants, and enterprise infrastructure products.'],
];

export function AiInfrastructureEngineer() {
  usePageMeta({
    title: 'AI Infrastructure Engineer | Vishnu Vardhan Burri',
    description:
      'Vishnu Vardhan Burri builds production-safe AI infrastructure: RAG systems, AI guardrails, evals, observability, workflow automation, and AI governance.',
  });
  const productionAiStack = [
    ...AI_TOOLKIT.flatMap((block) => [block.title, ...block.items]),
    ...AI_DELIVERY_PRINCIPLES,
  ].slice(0, 12);

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="max-w-4xl">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-blue-500">
          AI Infrastructure Engineer
        </span>
        <h1 className="mb-8 text-5xl font-bold italic tracking-tighter text-white md:text-8xl">
          AI systems that behave like production software.
        </h1>
        <p className="text-lg leading-relaxed text-zinc-400">
          Vishnu Vardhan Burri builds AI infrastructure around reliability: retrieval, validation,
          auditability, observability, fallback behavior, and workflows that keep operating even when
          a model gives an uncertain answer.
        </p>
      </header>

      <section className="mt-20 grid gap-5 md:grid-cols-2">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/5 bg-zinc-950/60 p-8"
            >
              <Icon size={22} className="mb-10 text-blue-500" />
              <h2 className="mb-4 text-base font-bold uppercase tracking-[0.28em] text-white">{pillar.title}</h2>
              <p className="text-sm leading-7 text-zinc-500">{pillar.copy}</p>
            </motion.article>
          );
        })}
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8">
          <BrainCircuit className="mb-8 text-blue-500" size={24} />
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">AI vs engineer</span>
          <h2 className="mb-6 text-3xl font-bold italic tracking-tighter text-white md:text-5xl">
            AI is a tool. Vishnu is accountable for the system.
          </h2>
          <p className="text-sm leading-7 text-zinc-500">
            The difference is judgment and ownership. AI can accelerate research and drafts, but
            production software still needs boundaries, testing, governance, monitoring, rollout
            planning, and someone accountable when the business depends on it.
          </p>
        </div>

        <div className="space-y-3">
          {comparison.map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5">
              <div className="mb-2 flex items-center gap-3">
                <GitCompare size={15} className="text-blue-500" />
                <h3 className="font-mono text-[10px] uppercase tracking-[0.35em] text-white">{title}</h3>
              </div>
              <p className="text-sm leading-6 text-zinc-500">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-white/5 bg-zinc-950/70 p-8 md:p-10">
        <div className="mb-10 max-w-3xl">
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Production AI stack</span>
          <h2 className="text-3xl font-bold italic tracking-tighter text-white md:text-5xl">What gets designed before a model goes live.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productionAiStack.map(item => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/30 p-4 text-sm text-zinc-300">
              <CheckCircle2 size={15} className="text-emerald-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8">
          <Bot className="mb-8 text-blue-400" size={24} />
          <h2 className="mb-5 text-3xl font-bold italic tracking-tighter text-white">From chatbot to controlled workflow.</h2>
          <p className="text-sm leading-7 text-zinc-400">
            Vishnu treats AI as infrastructure, not decoration. The goal is to connect company knowledge,
            support, operations, compliance, sales, and internal workflows with enough control that teams
            can trust what the assistant does.
          </p>
        </div>
        <div className="rounded-3xl border border-white/5 bg-zinc-950/60 p-8">
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Xavira layer</span>
          <h3 className="mb-5 text-2xl font-bold italic tracking-tighter text-white">Xavira Control Stack</h3>
          <p className="mb-8 text-sm leading-7 text-zinc-500">
            Xavira Control Stack extends this thinking into enterprise AI governance, communication
            operations, auditability, compliance controls, and custom-trained assistants.
          </p>
          <Link to="/xavira" className="group flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:border-blue-500 hover:bg-blue-500/10">
            View Xavira <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <section className="mt-20 flex flex-col gap-4 rounded-3xl border border-white/5 bg-zinc-950/70 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">Start here</span>
          <h2 className="text-2xl font-bold italic tracking-tighter text-white">Need AI that can be trusted inside operations?</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/book" className="rounded-full bg-white px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-black">
            Book a Call
          </Link>
          <Link to="/contact" className="rounded-full border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:border-blue-500">
            Send Context
          </Link>
        </div>
      </section>
    </div>
  );
}
