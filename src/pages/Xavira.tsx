import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  KeyRound,
  Layers3,
  Play,
  RadioTower,
  ShieldCheck,
} from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';

const productCards = [
  {
    title: 'Sovereign Engine',
    category: 'Enterprise Communication Operations Platform',
    description:
      'Operational control for outbound infrastructure, reputation intelligence, monitoring, and communication governance.',
    button: 'Watch Demo',
    href: '#sovereign-engine-demo',
    icon: RadioTower,
  },
  {
    title: 'Sovereign Shield',
    category: 'Enterprise AI Governance Platform',
    description:
      'Private AI governance, compliance controls, auditability, security, and operational visibility.',
    button: 'Watch Demo',
    href: '#sovereign-shield-demo',
    icon: ShieldCheck,
  },
  {
    title: 'Xavira AI Assistant',
    category: 'Enterprise AI Assistant Platform',
    description:
      'Custom-trained AI assistants for operations, support, compliance, sales, knowledge management, and internal workflows.',
    button: 'Learn More',
    href: '#buyer-guide',
    icon: BrainCircuit,
    capabilities: ['Company Knowledge AI', 'Support AI', 'Operations AI', 'Compliance AI', 'Executive AI', 'Sales AI'],
  },
] as const;

const commercialOptions = [
  { label: 'Internal License', price: '£40,000', amount: 40000, note: 'Enterprise internal operational usage.' },
  { label: 'White Label', price: '£160,000', amount: 160000, note: 'Commercial deployment and reseller rights.' },
  { label: 'Maintenance', price: '£3k/mo', amount: 3000, note: 'Operational support and platform maintenance.' },
] as const;

const valueReasons = [
  {
    title: 'Replaces scattered tool spend',
    body: 'Communication, reputation, monitoring, governance, reporting, compliance, and AI control usually become a patchwork of paid tools, custom glue, and recurring operational overhead.',
  },
  {
    title: 'Built as owned infrastructure',
    body: 'Xavira Control Stack is positioned as a system an organization can own and operate, not just another dashboard rented month to month.',
  },
  {
    title: 'No core external AI API dependency',
    body: 'The governance and control layer is designed around private operational logic, auditability, and deterministic workflows instead of depending on third-party AI APIs for core behavior.',
  },
  {
    title: 'Future-facing operating layer',
    body: 'The value is not only the current product. It is the foundation for future communication operations, AI governance, and intelligent business infrastructure.',
  },
] as const;

const platformPillars = [
  'Communication Operations',
  'AI Governance',
  'Operational Visibility',
  'Reputation Protection',
  'Compliance Controls',
  'Infrastructure Intelligence',
] as const;

const buyerTypes = [
  'Outbound Agencies',
  'RevOps Teams',
  'Cybersecurity Consultancies',
  'AI Consultancies',
  'Enterprise Operators',
  'SaaS Companies',
  'Managed Service Providers',
  'Organizations building internal AI systems',
] as const;

const problemsSolved = [
  'Communication Infrastructure Visibility',
  'Reputation Monitoring',
  'Deliverability Governance',
  'AI Governance',
  'Compliance Oversight',
  'Auditability',
  'Operational Monitoring',
  'Workflow Intelligence',
  'Infrastructure Control',
] as const;

const fitChecklist = [
  'You operate outbound communication systems.',
  'You manage multiple domains, providers, or communication channels.',
  'You require governance and operational visibility.',
  'You are exploring secure AI adoption.',
  'You need auditability and compliance controls.',
  'You want infrastructure ownership instead of relying entirely on third-party SaaS tools.',
  'You are interested in commercializing infrastructure services.',
] as const;

const demoVideos = [
  {
    id: 'sovereign-engine-demo',
    title: 'Sovereign Engine Demo',
    description: 'Communication operations, reputation intelligence, monitoring, and outbound governance.',
    href: 'https://youtu.be/5eP6cWxaNdI?si=lSvfqthUhKJ5a75F',
    embed: 'https://www.youtube-nocookie.com/embed/5eP6cWxaNdI',
  },
  {
    id: 'sovereign-shield-demo',
    title: 'Sovereign Shield Demo',
    description: 'AI governance, compliance controls, auditability, and operational visibility.',
    href: 'https://youtu.be/4sn0JBHLCj0?si=ayhoTfL4kLtKWjjL',
    embed: 'https://www.youtube-nocookie.com/embed/4sn0JBHLCj0',
  },
] as const;

const proofBriefHref = '/docs/xavira-control-stack-executive-proof-brief.pdf';

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/35 p-4">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
          <span className="text-sm leading-relaxed text-zinc-400">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function Xavira() {
  usePageMeta({
    title: 'Xavira Control Stack | Enterprise Infrastructure | Vishnu Vardhan Burri',
    description:
      'Enterprise systems built by Vishnu Vardhan Burri through Xavira Tech Labs for communication operations, AI governance, operational visibility, and infrastructure intelligence.',
  });

  useEffect(() => {
    const id = 'xavira-control-stack-jsonld';
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Xavira Control Stack',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://www.vishnuvardhanburri.in/xavira',
      creator: {
        '@type': 'Person',
        name: 'Vishnu Vardhan Burri',
        url: 'https://www.vishnuvardhanburri.in/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Xavira Tech Labs',
      },
      description:
        'Enterprise systems for communication operations, AI governance, operational visibility, reputation protection, compliance controls, and infrastructure intelligence.',
      offers: commercialOptions.map((option) => ({
        '@type': 'Offer',
        name: option.label,
        price: option.amount,
        priceCurrency: 'GBP',
        description: option.note,
      })),
      hasPart: [
        { '@type': 'SoftwareApplication', name: 'Sovereign Engine' },
        { '@type': 'SoftwareApplication', name: 'Sovereign Shield' },
        { '@type': 'SoftwareApplication', name: 'Xavira AI Assistant' },
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <section>
        <header className="mb-16 text-center">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
            Xavira // Enterprise Lab
          </span>
          <h1 className="mb-8 text-5xl font-bold italic tracking-tighter md:text-8xl">Xavira Control Stack</h1>
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-zinc-500">
            Enterprise systems for communication operations, AI governance, and intelligent business infrastructure.
          </p>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.32em] text-blue-400">
            Built by Vishnu Vardhan Burri through Xavira Tech Labs.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {productCards.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.article
                key={product.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/55 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(59,130,246,0.12),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <div className="mt-8 font-mono text-[9px] uppercase tracking-[0.26em] text-zinc-600">{product.category}</div>
                  <h2 className="mt-4 text-2xl font-bold uppercase italic tracking-tight text-white">{product.title}</h2>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-500">{product.description}</p>
                  {'capabilities' in product && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-500"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  )}
                  <a
                    href={product.href}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    {product.button} <ArrowUpRight size={14} className="text-blue-400" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <section className="mt-20 overflow-hidden rounded-3xl border border-white/5 bg-white/5">
          <div className="grid grid-cols-1 gap-px bg-white/5 md:grid-cols-4">
            {commercialOptions.map((option) => (
              <div key={option.label} className="bg-black p-8">
                <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">{option.label}</div>
                <div className="mt-4 text-4xl font-bold italic tracking-tighter text-white">{option.price}</div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">{option.note}</p>
              </div>
            ))}
            <div className="flex items-center justify-center bg-black p-8">
              <Link
                to="/xavira/book"
                className="group flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95"
              >
                Qualify & Book <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/5 bg-zinc-950/50 p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">
                Why Premium
              </span>
              <h2 className="text-3xl font-bold italic tracking-tighter md:text-5xl">
                Priced as infrastructure, not as another tool subscription.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                The license reflects the cost of replacing scattered tools, custom integrations, governance gaps, and recurring vendor dependency with a controlled enterprise system built for ownership.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {valueReasons.map((reason) => (
                <div key={reason.title} className="rounded-2xl border border-white/5 bg-black/35 p-5">
                  <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-blue-400">{reason.title}</div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-500">{reason.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-500/15 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.14),transparent_42%),rgba(24,24,27,0.45)] p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-black/60">
              <FileText size={34} className="text-blue-400" />
            </div>
            <div>
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-blue-400">
                Executive Proof Brief
              </span>
              <h2 className="text-3xl font-bold italic tracking-tighter md:text-5xl">
                A buyer-ready proof document for Xavira Control Stack.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-500">
                Download the executive brief covering the product thesis, control-stack positioning,
                buyer logic, licensing value, and enterprise infrastructure proof points for Sovereign Engine,
                Sovereign Shield, and Xavira AI Assistant.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={proofBriefHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 sm:w-auto"
                >
                  Open Brief <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={proofBriefHref}
                  download
                  className="group flex w-full items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-blue-500/50 sm:w-auto"
                >
                  Download PDF <Download size={14} className="text-blue-400" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="product-demos" className="mt-20 scroll-mt-28">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">
                Product Demonstrations
              </span>
              <h2 className="text-3xl font-bold italic tracking-tighter md:text-5xl">Watch the control stack in motion.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {demoVideos.map((video) => (
              <article
                key={video.title}
                id={video.id}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/55 p-8 transition-colors hover:border-blue-500/30"
              >
                <div className="aspect-video overflow-hidden rounded-2xl border border-white/5 bg-black">
                  <iframe
                    title={video.title}
                    src={video.embed}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold uppercase italic tracking-tight text-white">{video.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">{video.description}</p>
                  </div>
                  <a
                    href={video.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 transition-colors hover:text-white"
                  >
                    Open YouTube <ArrowUpRight size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
          <h2 className="text-2xl font-bold uppercase italic tracking-tight md:text-3xl">
            Interested in Enterprise Infrastructure?
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/xavira/book"
              className="group flex w-full max-w-xs items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 sm:w-auto sm:max-w-none"
            >
              Qualify & Book <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/xavira/book"
              className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40 sm:w-auto sm:max-w-none"
            >
              Send Buyer Details <KeyRound size={14} className="text-blue-400" />
            </Link>
          </div>
        </section>
      </section>

      <section id="buyer-guide" className="mt-28 border-t border-white/5 pt-24">
        <header className="mb-16 text-center">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
            For Buyers
          </span>
          <h2 className="mb-8 text-4xl font-bold italic tracking-tighter md:text-7xl">For Buyers</h2>
          <p className="mx-auto max-w-4xl text-base leading-relaxed text-zinc-500">
            A quick overview of what Xavira Control Stack does, who it is designed for, and how organizations typically engage with it.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10"
          >
            <div className="flex items-center gap-3">
              <Layers3 className="text-blue-400" />
              <h3 className="text-xl font-bold uppercase italic tracking-tight">What Is It?</h3>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              Xavira Control Stack combines Sovereign Engine and Sovereign Shield into a unified enterprise platform for:
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {platformPillars.map((pillar) => (
                <div key={pillar} className="rounded-2xl border border-white/5 bg-black/35 p-4 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                  {pillar}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              The platform is designed to help organizations operate critical communication and AI systems with greater visibility, governance, and control.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10"
          >
            <div className="flex items-center gap-3">
              <Eye className="text-blue-400" />
              <h3 className="text-xl font-bold uppercase italic tracking-tight">Who Is It For?</h3>
            </div>
            <div className="mt-6">
              <CheckList items={buyerTypes} />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-400" />
              <h3 className="text-xl font-bold uppercase italic tracking-tight">What Problems Does It Solve?</h3>
            </div>
            <div className="mt-6">
              <CheckList items={problemsSolved} />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10"
          >
            <div className="flex items-center gap-3">
              <KeyRound className="text-blue-400" />
              <h3 className="text-xl font-bold uppercase italic tracking-tight">Commercial Options</h3>
            </div>
            <div className="mt-6 grid gap-3">
              {commercialOptions.map((option) => (
                <div key={option.label} className="rounded-2xl border border-white/5 bg-black/35 p-5">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">{option.label}</div>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-500">{option.note}</p>
                    </div>
                    <div className="text-right text-2xl font-bold italic tracking-tighter text-white">{option.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              These prices are intentionally premium because the buyer is not purchasing a small AI wrapper. The buyer is acquiring an operating layer for communication control, AI governance, visibility, and future infrastructure ownership.
            </p>
          </motion.article>
        </div>

        <section className="mt-20 rounded-3xl border border-white/5 bg-zinc-950/50 p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Fit Check</span>
              <h3 className="text-3xl font-bold italic tracking-tighter md:text-5xl">Is This Relevant To Your Organization?</h3>
              <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                If several items apply, a conversation is likely worthwhile.
              </p>
            </div>
            <CheckList items={fitChecklist} />
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/5 bg-zinc-950/50 p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">
                Buyer Document
              </span>
              <h3 className="text-2xl font-bold uppercase italic tracking-tight md:text-3xl">
                Review the executive proof brief before a licensing call.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                Use this PDF to understand the system, the commercial logic, and why Xavira Control Stack is priced as owned infrastructure.
              </p>
            </div>
            <a
              href={proofBriefHref}
              target="_blank"
              rel="noreferrer"
              className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-blue-500/50 lg:w-auto"
            >
              Open Proof Brief <FileText size={14} className="text-blue-400" />
            </a>
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
          <h3 className="text-2xl font-bold uppercase italic tracking-tight md:text-3xl">Interested In Learning More?</h3>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 lg:flex-row">
            <Link
              to="/xavira/book"
              className="group flex w-full max-w-xs items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 lg:w-auto lg:max-w-none"
            >
              Qualify & Book <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/xavira/book"
              className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40 lg:w-auto lg:max-w-none"
            >
              Send Buyer Details <KeyRound size={14} className="text-blue-400" />
            </Link>
            <a
              href="#product-demos"
              className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40 lg:w-auto lg:max-w-none"
            >
              Watch Product Demonstrations <Play size={14} className="text-blue-400" />
            </a>
          </div>
        </section>
      </section>
    </div>
  );
}
