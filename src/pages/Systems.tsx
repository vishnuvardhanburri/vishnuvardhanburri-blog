import { motion } from 'motion/react';
import { Cpu, Cloud, Database, Layout, Terminal, Code2, Globe, Sparkles } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';
import { AI_DELIVERY_PRINCIPLES, AI_TOOLKIT } from '@/src/constants';

export function Systems() {
  usePageMeta({
    title: 'Systems | Backend Leverage | Vishnu Vardhan Burri',
    description:
      'Systems and platform capabilities: distributed services, reliability, cloud-native delivery, data pipelines, and security-first backend foundations for founder-led products.',
  });

  const domains = [
    {
      title: "Distributed Systems",
      icon: <Network className="w-5 h-5 text-blue-500" />,
      capabilities: [
        "Event-driven services",
        "Clear ownership boundaries",
        "Reliable async workflows",
        "Deterministic execution"
      ]
    },
    {
      title: "Platform Engineering",
      icon: <Layout className="w-5 h-5 text-zinc-400" />,
      capabilities: [
        "Kubernetes deployments",
        "GitOps delivery paths",
        "Developer workflow tools",
        "Legacy refactoring"
      ]
    },
    {
      title: "Cloud Infrastructure",
      icon: <Cloud className="w-5 h-5 text-white" />,
      capabilities: [
        "Cloud environment setup",
        "Deployment reliability",
        "Runtime governance",
        "AI guardrail orchestration"
      ]
    },
    {
      title: "Data Infrastructure",
      icon: <Cpu className="w-5 h-5 text-orange-500" />,
      capabilities: [
        "OCR and PDF extraction",
        "ETL workflow automation",
        "Structured data outputs",
        "Local-first protection"
      ]
    },
    {
      title: "AI Engineering (Production)",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      capabilities: [
        "RAG + retrieval pipelines",
        "Schema validation + guardrails",
        "Deterministic fallback paths",
        "Audit-friendly observability"
      ]
    }
  ];

  return (
    <div className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <header className="mb-24">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-6 block text-center">Where Founders Use Me // Repository:V02</span>
        <h1 className="text-5xl md:text-9xl font-extrabold tracking-tighter text-center uppercase italic">
          Backend <br /> Leverage.
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden mb-32">
        {domains.map((domain, i) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden bg-black p-8 transition-colors hover:bg-zinc-950/50 sm:p-12 lg:p-20 group"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Terminal size={120} />
             </div>
             <div className="mb-10 flex items-center gap-4 sm:mb-12 sm:gap-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:border-blue-500/50 transition-colors">
                   {domain.icon}
                </div>
                <h2 className="text-lg font-bold uppercase tracking-wider sm:text-xl sm:tracking-widest">{domain.title}</h2>
             </div>
             <ul className="grid grid-cols-1 gap-6">
                {domain.capabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-4 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                     <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-bold sm:text-xs sm:tracking-widest">{cap}</span>
                  </li>
                ))}
             </ul>
          </motion.div>
        ))}
      </div>

      {/* Secondary Tech Stack Topology */}
      <section>
         <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-12 text-center">Tools I Use To Remove Backend Risk</h3>
         <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {[
              { name: 'Go', icon: <Code2 /> },
              { name: 'Rust', icon: <Cpu /> },
              { name: 'Java', icon: <Terminal /> },
              { name: 'Terraform', icon: <Layout /> },
              { name: 'Docker', icon: <Database /> },
              { name: 'Kubernetes', icon: <Globe /> },
              { name: 'AWS', icon: <Cloud /> },
              { name: 'PostgreSQL', icon: <Database /> },
            ].map(tech => (
              <div key={tech.name} className="flex flex-col items-center gap-4 group">
                 <div className="text-white group-hover:text-blue-500 transition-colors">{tech.icon}</div>
                 <span className="text-[10px] uppercase font-bold tracking-widest font-mono">{tech.name}</span>
              </div>
            ))}
         </div>
      </section>

      <section className="mt-32">
        <div className="mb-12 text-center">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-6 block">
            AI // Real Value
          </span>
          <h3 className="text-3xl md:text-5xl font-bold italic tracking-tighter">
            AI that ships, not AI that breaks.
          </h3>
          <p className="mx-auto mt-6 max-w-3xl text-sm md:text-base leading-relaxed text-zinc-500">
            I use AI tools to compress time, but I do not sell “AI demos.” The difference is production safety: validation,
            fallbacks, observability, and clean system boundaries so the product stays correct even when models are wrong.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {AI_TOOLKIT.map((block) => (
            <div
              key={block.title}
              className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-blue-400">{block.title}</div>
              <div className="mt-6 grid gap-3">
                {block.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/40 p-4">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-sm leading-relaxed text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {AI_DELIVERY_PRINCIPLES.map((principle) => (
            <span
              key={principle}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400"
            >
              {principle}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function Network(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}
