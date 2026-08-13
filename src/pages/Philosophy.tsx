import { motion } from 'motion/react';
import { Shield, Target, Zap, Anchor, Layers, Cpu, Database, Activity } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';

export function Philosophy() {
  usePageMeta({
    title: 'Philosophy | Production-First Engineering | Vishnu Vardhan Burri',
    description:
      'Production-first engineering philosophy: correctness over cleverness, visible systems, strong validation, and calm reliability habits that protect founder momentum.',
  });

  const tenets = [
    {
      title: "I believe reliability is a habit",
      desc: "Reliable systems do not happen at the end of a project. I believe reliability starts in the first design conversation: ownership, validation, logs, metrics, and recovery paths all need attention early.",
      icon: <Target className="text-blue-500" />
    },
    {
      title: "I prefer visible systems",
      desc: "Logs help, but they are not enough. I prefer systems that show their health through metrics, traces, dashboards, and alerts that point engineers toward the next useful action.",
      icon: <Activity className="text-emerald-500" />
    },
    {
      title: "I prefer simple architecture",
      desc: "I like architecture that can be explained clearly under pressure. Simple service boundaries, proven patterns, and direct data ownership usually beat clever designs that hide operational cost.",
      icon: <Layers className="text-orange-500" />
    },
    {
      title: "I care about data trust",
      desc: "When money, identity, healthcare, or security data is involved, correctness matters deeply. I prefer auditable writes, clear validation, and storage decisions that make recovery possible.",
      icon: <Database className="text-white" />
    }
  ];

  return (
    <div className="py-32 px-6 lg:px-12 max-w-5xl mx-auto">
      <header className="mb-32 text-center">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-6 block">My Beliefs // Founder Operating System</span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 italic">How I protect <br /> product momentum.</h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/5 mb-12 relative group"
        >
           <img 
             src="/images/vishnu-laptop.jpeg"
             alt="Vishnu Vardhan Burri working through engineering systems" 
             className="w-full h-full object-cover object-[50%_42%] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
             loading="lazy"
             decoding="async"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-px h-24 bg-blue-500/50" />
           </div>
        </motion.div>
        
        <div className="h-px w-24 bg-blue-500 mx-auto" />
      </header>

      <div className="space-y-40">
        {tenets.map((tenet, i) => (
          <motion.section 
            key={tenet.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 group"
          >
             <div className="lg:w-1/3 flex flex-col gap-6">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                   {tenet.icon}
                </div>
                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">0{i+1} // TENET</div>
             </div>
             <div className="lg:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 group-hover:text-blue-500 transition-colors italic uppercase">{tenet.title}</h2>
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed">
                   {tenet.desc}
                </p>
             </div>
          </motion.section>
        ))}
      </div>

      <section className="mt-60 p-12 lg:p-20 border border-white/5 glass rounded-3xl text-center relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
         <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-3xl font-bold mb-8 italic uppercase tracking-tighter">Production Discipline</h3>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
               I optimize for the founder and engineer who need the system to make sense later. Good work should reduce confusion, shorten debugging, and make production feel calm instead of mysterious.
            </p>
            <div className="flex gap-4">
               {['Clear', 'Observable', 'Maintainable', 'Reliable'].map(pill => (
                 <span key={pill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-zinc-400">
                    {pill}
                 </span>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
