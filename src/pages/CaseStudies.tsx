import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '@/src/constants';
import { ArrowRight, FileText } from 'lucide-react';
import { OpenSSFTrackRecord } from '@/src/components/OpenSSFTrackRecord';
import { usePageMeta } from '@/src/lib/seo';
import { ConversionCtas } from '@/src/components/ConversionCtas';

export function CaseStudies() {
  usePageMeta({
    title: 'Case Studies | Backend Work Notes | Vishnu Vardhan Burri',
    description:
      'Case studies showing backend and platform delivery under pressure: reliability, migrations, observability, security, automation, and calmer production for founder-led teams.',
  });

  const summarize = (text: string, max = 132) => {
    const clean = String(text ?? '').replace(/\s+/g, ' ').trim();
    const dot = clean.indexOf('.');
    const candidate = dot > 40 ? clean.slice(0, dot + 1) : clean;
    if (candidate.length <= max) return candidate;
    return `${candidate.slice(0, Math.max(0, max - 1)).trim()}…`;
  };

  return (
    <div className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <header className="mb-24 text-center">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-6 block">Work // Proof for founders</span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic">
          Work <br /> Notes.
        </h1>
        <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Ten work modules that show how I approach backend pressure: reliability, delivery, security, migrations, queues, and
          production-proof foundations.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {CASE_STUDIES.map((study, i) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.1,
              ease: [0.21, 1, 0.36, 1] 
            }}
            className="group relative"
          >
            <Link to={`/case-studies/${study.id}`} className="block">
              <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 p-6 transition-all hover:border-blue-500/30 hover:bg-zinc-900 sm:p-8 lg:p-14">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.14),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                        Work Note: {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
                        {study.client.confidentiality === 'nda' ? 'NDA' : 'Public'}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold tracking-tight group-hover:text-blue-500 transition-colors uppercase italic sm:text-3xl">
                        {study.title}
                      </h2>
                      <p className="mt-3 text-sm font-medium text-zinc-400">{study.subtitle}</p>
                    </div>

                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xl">{study.description}</p>

                    <div className="grid gap-3 rounded-2xl border border-white/5 bg-black/40 p-5">
                      <div className="grid gap-2">
                        {[
                          ['Problem', summarize(study.challenge)],
                          ['What changed', summarize(study.solution)],
                          ['Result', summarize(study.impact?.[0] ?? '')],
                        ].map(([label, value]) => (
                          <div key={label} className="flex gap-3">
                            <div className="w-24 shrink-0 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">
                              {label}
                            </div>
                            <div className="text-sm leading-relaxed text-zinc-400">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {study.tech.slice(0, 8).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-black border border-white/5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest rounded-sm"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3">
                      {study.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="rounded-2xl border border-white/5 bg-black/50 p-4">
                          <div className="text-xl font-bold italic tracking-tight text-white">{m.value}</div>
                          <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-zinc-600">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                      <img
                        src={study.image.src}
                        alt={study.image.alt}
                        className="h-full w-full object-contain opacity-75 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.01]"
                        style={{ objectPosition: study.image.focus ?? '50% 40%' }}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.12)_48%,rgba(0,0,0,0.78)_100%)]" />

                      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4">
                        <div>
                          <div className="font-mono text-[8px] uppercase tracking-[0.32em] text-blue-400">Client</div>
                          <div className="mt-1 text-sm font-bold uppercase tracking-tight text-white">{study.client.name}</div>
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-colors group-hover:bg-blue-500">
                          <ArrowRight size={18} className="text-black transition-colors group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <OpenSSFTrackRecord />
      </div>

      <div className="mt-20 p-12 glass border-white/5 rounded-2xl text-center">
         <FileText className="mx-auto mb-6 text-zinc-600" />
         <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Want the deeper version?</h4>
         <p className="text-zinc-500 text-[11px] max-w-md mx-auto leading-relaxed mb-8">
            Some implementation details stay private, but I can walk through the architecture style, tradeoffs, and lessons in a direct conversation.
         </p>
         <ConversionCtas align="center" className="mx-auto" />
      </div>
    </div>
  );
}
