import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, BadgeCheck, BrainCircuit, Building2, Github, Linkedin, Search, ShieldCheck, Terminal } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';

const aliases = [
  'Vishnu',
  'Vishnu Vardhan',
  'Vishnu Burri',
  'Burri Vishnu',
  'Vishnu V Burri',
  'vishnuvardhanburri',
];

const signals = [
  {
    title: 'Backend systems engineer',
    copy: 'Focused on production APIs, data integrity, service boundaries, and backend reliability for founder-led products.',
    icon: Terminal,
  },
  {
    title: 'AI infrastructure engineer',
    copy: 'Builds AI workflows with retrieval, validation, guardrails, fallback behavior, and observability instead of fragile demos.',
    icon: BrainCircuit,
  },
  {
    title: 'Founder, Xavira Tech Labs',
    copy: 'Leads Xavira Tech Labs, an engineering lab for communication operations, AI governance, and intelligent business infrastructure.',
    icon: Building2,
  },
  {
    title: 'Verified expert network',
    copy: 'Publicly positioned as a Toptal software engineering developer, with a production-first backend and platform focus.',
    icon: BadgeCheck,
  },
];

const profileLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishnuvardhanburri/', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/vishnuvardhanburri', icon: Github },
  { label: 'Toptal', href: 'https://www.toptal.com/developers/resume/vishnu-vardhan-burri', icon: ShieldCheck },
];

export function AboutVishnu() {
  const [searchQuery, setSearchQuery] = useState('Vishnu Vardhan Burri');
  const googleSearchUrl = useMemo(() => {
    const query = `${searchQuery || 'Vishnu Vardhan Burri'} official Vishnu Vardhan Burri`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }, [searchQuery]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(googleSearchUrl, '_blank', 'noopener,noreferrer');
  };

  usePageMeta({
    title: 'About Vishnu Vardhan Burri | Backend Systems & AI Infrastructure Engineer',
    description:
      'Official profile of Vishnu Vardhan Burri, a backend systems and AI infrastructure engineer, founder of Xavira Tech Labs, and production-focused architecture consultant.',
    image: '/images/gallery/vishnu/media_1786612562943.jpg',
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-blue-500">
            Official Identity // Vishnu Vardhan Burri
          </span>
          <h1 className="mb-8 text-5xl font-bold italic tracking-tighter text-white md:text-8xl">
            Vishnu Vardhan Burri.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
            Vishnu Vardhan Burri is a backend systems and AI infrastructure engineer from Andhra Pradesh,
            India. He works on production-grade APIs, distributed systems, observability, cloud reliability,
            AI guardrails, and platform architecture for founders and technical teams that cannot afford
            fragile systems.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <div className="relative aspect-[3/4] w-28 overflow-hidden rounded-2xl border border-white/10 bg-black shrink-0 shadow-lg">
              <img
                src="/images/gallery/vishnu/media_1786612562943.jpg"
                alt="Vishnu Vardhan Burri - Bangalore Electronic City IT Tech Center"
                className="h-full w-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-blue-400">Bangalore, India</div>
              <div className="text-xs font-bold text-white mt-0.5">Vishnu Vardhan Burri</div>
              <div className="text-[11px] text-zinc-400 mt-1">Director &amp; CEO · XAVIRA Technologies</div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6"
        >
          <div className="mb-4 flex items-center gap-3">
            <Search size={16} className="text-blue-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-500">Search Aliases</span>
          </div>
          <form onSubmit={submitSearch} className="mb-4 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="official-search-query">
              Search Vishnu Vardhan Burri official presence
            </label>
            <input
              id="official-search-query"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search Vishnu, Vishnu Burri..."
              className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 font-mono text-xs text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-blue-500/60"
            />
            <button
              type="submit"
              className="min-h-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-blue-200 transition-colors hover:border-blue-500 hover:bg-blue-500/20"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            {aliases.map(alias => (
              <button
                key={alias}
                type="button"
                onClick={() => setSearchQuery(alias)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[10px] text-zinc-300 transition-colors hover:border-blue-500/50 hover:text-white"
              >
                {alias}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-zinc-500">
            These names point to the same official identity: Vishnu Vardhan Burri, founder of Xavira Tech Labs
            and backend systems engineer for production-critical software.
          </p>
        </motion.div>
      </header>

      <section className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {signals.map((signal, index) => {
          const Icon = signal.icon;
          return (
            <motion.article
              key={signal.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/5 bg-zinc-950/60 p-6"
            >
              <Icon size={20} className="mb-8 text-blue-500" />
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-white">{signal.title}</h2>
              <p className="text-sm leading-relaxed text-zinc-500">{signal.copy}</p>
            </motion.article>
          );
        })}
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8">
          <span className="mb-5 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">What he is known for</span>
          <h2 className="mb-6 text-3xl font-bold italic tracking-tighter text-white md:text-5xl">
            Simple lifestyle. Serious systems.
          </h2>
          <p className="text-sm leading-7 text-zinc-500">
            Vishnu presents himself with a simple personal style, but the work is deeply technical:
            backend foundations, production safety, AI governance, secure workflows, and systems that
            let businesses operate with more confidence.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/presence" className="group rounded-3xl border border-white/5 bg-white/[0.03] p-6 transition-colors hover:border-blue-500/40">
            <ArrowUpRight className="mb-10 text-blue-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-white">Official Presence</h3>
            <p className="text-xs leading-6 text-zinc-500">Canonical profiles, search aliases, and trusted public links.</p>
          </Link>
          <Link to="/case-studies" className="group rounded-3xl border border-white/5 bg-white/[0.03] p-6 transition-colors hover:border-blue-500/40">
            <ArrowUpRight className="mb-10 text-blue-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-white">Case Studies</h3>
            <p className="text-xs leading-6 text-zinc-500">10 production builds, real constraints, and verified deliverables.</p>
          </Link>
          <Link to="/experience" className="group rounded-3xl border border-white/5 bg-white/[0.03] p-6 transition-colors hover:border-blue-500/40">
            <ArrowUpRight className="mb-10 text-blue-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-white">Experience</h3>
            <p className="text-xs leading-6 text-zinc-500">Backend, platform, AI infrastructure, and reliability work.</p>
          </Link>
          <Link to="/book" className="group rounded-3xl border border-blue-500/20 bg-blue-500/10 p-6 transition-colors hover:border-blue-500/60">
            <ArrowUpRight className="mb-10 text-blue-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
            <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-white">Book Vishnu</h3>
            <p className="text-xs leading-6 text-zinc-400">Start with a product, backend, AI, or infrastructure conversation.</p>
          </Link>
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-white/5 bg-zinc-950/70 p-8 md:p-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Verified public links</span>
            <h2 className="text-2xl font-bold italic tracking-tighter text-white md:text-4xl">Official online presence.</h2>
          </div>
          <Link to="/contact" className="w-fit rounded-full border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:border-blue-500 hover:bg-blue-500/10">
            Contact
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {profileLinks.map(link => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-sm text-zinc-300 transition-colors hover:border-blue-500/40"
              >
                <span className="flex items-center gap-3">
                  <Icon size={16} className="text-blue-500" />
                  {link.label}
                </span>
                <ArrowUpRight size={16} />
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
