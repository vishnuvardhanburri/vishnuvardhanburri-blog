import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, ArrowUpRight, Cloud, Database, LockKeyhole, Network, Server, ShieldCheck } from 'lucide-react';
import { CASE_STUDIES } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';

const systems = [
  {
    title: 'API architecture',
    copy: 'Clear contracts, versioning discipline, idempotent workflows, rate limits, and service boundaries that reduce production surprises.',
    icon: Network,
  },
  {
    title: 'PostgreSQL and data integrity',
    copy: 'Schema cleanup, indexing, transaction safety, migration plans, and validation paths for data that cannot silently drift.',
    icon: Database,
  },
  {
    title: 'Cloud release safety',
    copy: 'CI/CD workflows, rollback paths, health checks, deployment discipline, and infrastructure that supports real operating pressure.',
    icon: Cloud,
  },
  {
    title: 'Observability and recovery',
    copy: 'Logs, metrics, traces, dashboards, runbooks, and alerts tied to user impact instead of vanity telemetry.',
    icon: Activity,
  },
];

const outcomes = [
  { value: '-40%', label: 'Backend latency reduction under concurrent load' },
  { value: '99.9%', label: 'Availability target for critical workflows' },
  { value: '0', label: 'Duplicate payment execution risk after idempotency controls' },
  { value: '-30%', label: 'Synchronization delay reduction in real-time systems' },
];

export function BackendSystemsEngineer() {
  usePageMeta({
    title: 'Backend Systems Engineer | Vishnu Vardhan Burri',
    description:
      'Vishnu Vardhan Burri helps founders and CTOs stabilize backend systems, APIs, PostgreSQL, observability, cloud releases, and production reliability.',
  });

  const featuredStudies = CASE_STUDIES.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="max-w-4xl">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-blue-500">
          Backend Systems Engineer
        </span>
        <h1 className="mb-8 text-5xl font-bold italic tracking-tighter text-white md:text-8xl">
          Backend systems that stay calm under pressure.
        </h1>
        <p className="text-lg leading-relaxed text-zinc-400">
          Vishnu Vardhan Burri works on the parts of software that founders usually feel only when
          they break: APIs, databases, data flows, payment safety, service boundaries, deployment
          reliability, and production visibility.
        </p>
      </header>

      <section className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={outcome.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.05 }}
            className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6"
          >
            <div className="mb-5 text-4xl font-bold italic tracking-tighter text-white">{outcome.value}</div>
            <p className="text-xs leading-6 text-zinc-500">{outcome.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-20 grid gap-5 md:grid-cols-2">
        {systems.map((system, index) => {
          const Icon = system.icon;
          return (
            <motion.article
              key={system.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/5 bg-white/[0.03] p-8"
            >
              <Icon size={22} className="mb-10 text-blue-500" />
              <h2 className="mb-4 text-base font-bold uppercase tracking-[0.28em] text-white">{system.title}</h2>
              <p className="text-sm leading-7 text-zinc-500">{system.copy}</p>
            </motion.article>
          );
        })}
      </section>

      <section className="mt-20 rounded-3xl border border-white/5 bg-zinc-950/70 p-8 md:p-10">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Engineering Method</span>
            <h2 className="text-3xl font-bold italic tracking-tighter text-white md:text-5xl">What changes in the system.</h2>
          </div>
          <Link to="/case-studies" className="group flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:border-blue-500 hover:bg-blue-500/10">
            Case Studies <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredStudies.map(study => (
            <Link
              key={study.id}
              to={`/case-studies/${study.id}`}
              className="group rounded-3xl border border-white/5 bg-black/40 p-6 transition-colors hover:border-blue-500/40"
            >
              <div className="mb-8 flex items-center justify-between">
                <Server size={18} className="text-blue-500" />
                <ArrowUpRight size={16} className="text-zinc-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white">{study.title}</h3>
              <p className="mb-6 text-xs leading-6 text-zinc-500">{study.challenge}</p>
              <div className="flex flex-wrap gap-2">
                {study.metrics.slice(0, 2).map(metric => (
                  <span key={`${study.id}-${metric.label}`} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-zinc-400">
                    {metric.label}: {metric.value}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-blue-500/20 bg-blue-500/10 p-8">
          <ShieldCheck className="mb-8 text-blue-400" size={24} />
          <h2 className="mb-5 text-3xl font-bold italic tracking-tighter text-white">Built for founders who need reliability, not noise.</h2>
          <p className="text-sm leading-7 text-zinc-400">
            The work is usually not about adding another feature. It is about making the product
            safer to operate: known failure paths, cleaner data, measurable latency, clearer ownership,
            and deployment habits that do not panic the business.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {['Idempotency', 'RBAC boundaries', 'Rollback paths', 'Migration checks', 'Request tracing', 'Security review'].map(item => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-950/60 p-5 text-sm text-zinc-300">
              <LockKeyhole size={15} className="text-emerald-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 flex flex-col gap-4 rounded-3xl border border-white/5 bg-zinc-950/70 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">Start here</span>
          <h2 className="text-2xl font-bold italic tracking-tighter text-white">Need a backend audit or production stabilization sprint?</h2>
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
