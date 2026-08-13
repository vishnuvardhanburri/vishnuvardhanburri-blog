import { motion } from 'motion/react';
import { Server, Database, Globe, Shield, Radio, Layers, Cpu, Repeat } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';

export function Architecture() {
  usePageMeta({
    title: 'Architecture | Systems That Scale Calmly | Vishnu Vardhan Burri',
    description:
      'Architecture notes for founders: service boundaries, validation, failure paths, deployment safety, and observability for backend systems that keep shipping under pressure.',
  });

  return (
    <div className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.5em] mb-6 block">Architecture For Founder Momentum</span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-white to-zinc-600 bg-clip-text text-transparent italic">
            Systems that <br /> do not slow you down.
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed">
            The best architecture protects founder momentum. I prefer correctness over cleverness,
            visible behavior, strong validation, and service boundaries that help teams move faster without hidden backend risk.
          </p>
        </div>
        <div className="flex flex-col gap-2 p-6 glass border-white/5 rounded-2xl min-w-[300px]">
           <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Design Priorities</div>
           <div className="flex items-center justify-between">
              <span className="text-xs font-mono">Readable Flows</span>
              <span className="text-xs font-mono text-emerald-500">High</span>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-xs font-mono">Failure Paths</span>
              <span className="text-xs font-mono text-zinc-400">Known</span>
           </div>
           <div className="w-full h-1 bg-zinc-900 rounded-full mt-4 overflow-hidden">
              <div className="h-full w-3/4 bg-blue-500" />
           </div>
        </div>
      </header>

      {/* Main Architecture Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {/* Real-time Flow Mapping */}
        <div className="h-[600px] border border-white/5 rounded-2xl glass p-12 relative overflow-hidden group">
           <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
           <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <Globe size={16} className="text-blue-500" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Edge Traffic Ingress</span>
                 </div>
                 <div className="text-[10px] font-mono text-zinc-600">TLS 1.3 // eBPF</div>
              </div>

              {/* Animated Lines System */}
              <div className="flex-1 flex items-center justify-center relative">
                 <div className="absolute w-px h-full bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />
                 <div className="absolute top-1/3 h-20 w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                 
                 {/* Central Processor Node */}
                 <div className="w-48 h-48 border border-blue-500/20 rounded-full glass flex items-center justify-center z-10">
                    <div className="text-center">
                       <Cpu size={32} className="mx-auto mb-4 text-zinc-300" />
                       <span className="text-[10px] uppercase font-bold tracking-widest">Global Router</span>
                    </div>
                 </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-8">
                 <div className="flex items-center gap-3">
                    <Database size={16} className="text-emerald-500" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Sharded Persistence</span>
                 </div>
                 <div className="text-[10px] font-mono text-zinc-600">COMMIT_LOG_SEQ: 0x82A1</div>
              </div>
           </div>
        </div>

        {/* Feature Breakdown Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { title: 'Correctness First', icon: <Radio />, desc: 'I prefer deterministic execution and validation before clever abstractions.' },
             { title: 'Guarded AI Workflows', icon: <Repeat />, desc: 'AI integrations need runtime checks, structured outputs, and safe failure paths.' },
             { title: 'Service Boundaries', icon: <Layers />, desc: 'I split systems around ownership, data risk, and failure impact.' },
             { title: 'Deep Observability', icon: <Shield />, desc: 'I design telemetry so failure vectors are visible before users feel them.' },
           ].map((card, i) => (
             <motion.div 
               key={card.title}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               className="p-8 border border-white/5 glass rounded-2xl flex flex-col justify-between hover:border-blue-500/30 transition-colors group"
             >
                <div className="mb-8 p-3 bg-white/5 w-fit rounded-lg group-hover:bg-blue-500/10 transition-colors">
                   {card.icon}
                </div>
                <div>
                   <h3 className="text-xs uppercase font-bold tracking-widest text-zinc-300 mb-4">{card.title}</h3>
                   <p className="text-zinc-500 text-xs leading-relaxed">{card.desc}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Advanced Telemetry Section */}
      <section className="p-12 border border-white/5 bg-zinc-950/50 rounded-2xl">
         <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
               <h2 className="text-2xl font-bold mb-6 italic uppercase tracking-tighter">Observability-First Design</h2>
               <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                  I believe a system is only as good as its visibility. I prefer metrics, traces, logs, and useful dashboards from the start, because they change how fast a team can understand reality.
               </p>
               <div className="flex flex-wrap gap-3">
                  {['Prometheus', 'Grafana', 'Jaeger', 'Datadog', 'ELK', 'OpenTelemetry'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-zinc-400">
                      {tech}
                    </span>
                  ))}
               </div>
            </div>
            <div className="w-full md:w-1/2 h-48 flex items-end gap-2 px-8 overflow-hidden">
               {[...Array(20)].map((_, i) => (
                 <div 
                   key={i}
                   style={{ height: `${28 + ((i * 17) % 62)}%` }}
                   className="flex-1 bg-blue-500/20 rounded-t-sm border-t border-blue-500/40"
                 />
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
