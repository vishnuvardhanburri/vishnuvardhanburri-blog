import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '@/src/constants';
import { ChevronLeft, ShieldCheck, Activity, Layers, Network, Database, Cpu, ArrowUpRight } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';
import { ConversionCtas } from '@/src/components/ConversionCtas';

export function CaseStudyDetail() {
  const { id } = useParams();
  const study = CASE_STUDIES.find((s) => s.id === id);

  if (!study) return <Navigate to="/case-studies" />;

  usePageMeta({
    title: `${study.title} | Case Study | Vishnu Vardhan Burri`,
    description: study.description,
    image: study.image?.src,
  });

  return (
    <div className="py-24 px-6 lg:px-12 max-w-5xl mx-auto">
      <Link 
        to="/case-studies" 
        className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest hover:text-white transition-colors mb-20"
      >
        <ChevronLeft size={12} /> Back to Work
      </Link>

      <header className="mb-24">
        <div className="flex items-center gap-4 mb-6">
           <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-[9px] font-mono text-blue-500 uppercase tracking-widest font-bold">Work Note</span>
           <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">ID: {study.id.toUpperCase()}</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 italic">{study.title}</h1>
        <p className="text-zinc-400 text-xl font-medium leading-relaxed max-w-3xl">
          {study.subtitle}
        </p>
      </header>

      {/* Case Study Visual (keeps full image visible, no aggressive crop) */}
      <div className="relative mb-24 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_24px_90px_rgba(0,0,0,0.75)]">
        <div className="aspect-[16/9] w-full">
          <img
            src={study.image.src}
            alt={study.image.alt}
            className="h-full w-full object-contain opacity-95"
            style={{ objectPosition: study.image.focus ?? '50% 45%' }}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(59,130,246,0.14),transparent_58%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.78)_100%)]" />
      </div>

      {/* Engineering Stats Rack */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden mb-24">
        {study.metrics.map((m, i) => (
          <div key={i} className="bg-black p-8 text-center">
            <div className="text-2xl font-bold italic mb-1">{m.value}</div>
            <div className="text-[8px] uppercase tracking-widest font-bold text-zinc-600">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-20">
        <div className="space-y-24">
          <section>
            <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-8 border-b border-white/5 pb-4">
              01 // Problem
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {study.challenge}
            </p>
          </section>

          <section>
            <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-8 border-b border-white/5 pb-4">
              02 // What I changed
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              {study.solution}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 border border-white/5 glass rounded-2xl">
                  <Layers className="text-blue-500 mb-6" />
                  <h3 className="text-[10px] uppercase font-bold tracking-widest mb-4">Reliability Model</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">Keep ownership clear, reduce hidden coupling, and make the failure path visible before it is needed.</p>
               </div>
               <div className="p-8 border border-white/5 glass rounded-2xl">
                  <ShieldCheck className="text-emerald-500 mb-6" />
                  <h3 className="text-[10px] uppercase font-bold tracking-widest mb-4">Integrity Strategy</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">Prefer explicit validation, auditable writes, and recovery behavior that engineers can reason about.</p>
               </div>
            </div>

            <div className="mt-10 rounded-2xl border border-white/5 bg-zinc-950/50 p-8">
              <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">Modules shipped</div>
              <div className="grid gap-3">
                {study.modules.map((m, i) => (
                  <div
                    key={`${m}-${i}`}
                    className="flex items-start gap-4 rounded-xl border border-white/5 bg-black/50 p-5 transition-colors hover:border-blue-500/25"
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500/70" />
                    <div className="text-sm leading-relaxed text-zinc-400">{m}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-8 border-b border-white/5 pb-4">
              03 // Measurable result
            </h2>
            <div className="space-y-6">
               {study.impact.map((item, i) => (
                 <div key={i} className="flex items-start gap-4 p-6 bg-zinc-950 border border-white/5 rounded-xl group hover:border-blue-500/30 transition-colors">
                    <ArrowUpRight size={16} className="text-blue-500 mt-1 shrink-0" />
                    <span className="text-zinc-400 font-medium">{item}</span>
                 </div>
               ))}
            </div>
          </section>
        </div>

        <aside className="sticky top-32 h-fit space-y-12">
           <div>
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">Tools Used</h3>
              <div className="flex flex-col gap-3">
                 {study.tech.map(t => (
                   <div key={t} className="flex items-center gap-3 text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
                      <div className="w-1 h-1 bg-zinc-700 rounded-full" />
                      {t}
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-6 border border-white/5 glass rounded-2xl">
              <div className="text-[8px] uppercase tracking-widest font-bold text-zinc-600 mb-2">Engagement Snapshot</div>
              <div className="grid gap-2">
                {study.metrics
                  .filter((m) => ['Delivery Window', 'Availability', 'Latency', 'Rollback Incidents', 'MTTR'].includes(m.label))
                  .slice(0, 4)
                  .map((m) => (
                    <div key={m.label} className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-black/50 px-4 py-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-600">{m.label}</span>
                      <span className="text-xs font-bold uppercase tracking-tight text-white">{m.value}</span>
                    </div>
                  ))}
              </div>
           </div>

           <div className="p-6 border border-white/5 glass rounded-2xl">
              <Activity size={18} className="text-zinc-600 mb-4" />
              <div className="text-[8px] uppercase tracking-widest font-bold text-zinc-600 mb-2">Live Metrics Node</div>
              <div className="space-y-2">
                 <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-500" />
                 </div>
                 <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-emerald-500" />
                 </div>
              </div>
           </div>
        </aside>
      </div>

      <div className="mt-40 border-t border-white/5 pt-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-zinc-700">VISHNU_WORK_NOTE</span>
          <ConversionCtas align="left" />
        </div>
      </div>
    </div>
  );
}
