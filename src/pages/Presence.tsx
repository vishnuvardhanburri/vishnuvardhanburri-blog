import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Linkedin, Search, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { GALLERY_IMAGES } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';

const aliases = [
  'Vishnu Vardhan Burri',
  'Vishnu',
  'Vishnu Vardhan',
  'Vishnu Burri',
  'Burri Vishnu',
  'Vishnu V Burri',
  'vishnuvardhanburri',
] as const;

const profiles = [
  {
    name: 'LinkedIn',
    detail: 'Professional identity and public work signal',
    href: 'https://www.linkedin.com/in/vishnuvardhanburri/',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    detail: 'Engineering repositories and code presence',
    href: 'https://github.com/vishnuvardhanburri',
    icon: Github,
  },
  {
    name: 'Toptal',
    detail: 'Verified expert engineering profile',
    href: 'https://www.toptal.com/developers/resume/vishnu-vardhan-burri',
    icon: UserCheck,
  },
] as const;

const searchSignals = [
  'Backend systems engineer',
  'AI infrastructure engineer',
  'Xavira Tech Labs founder',
  'Toptal verified expert',
  'Production API architecture',
  'Cloud reliability and observability',
] as const;

const featuredImages = GALLERY_IMAGES;

export function Presence() {
  usePageMeta({
    title: 'Official Presence | Vishnu Vardhan Burri',
    description:
      'Official online presence of Vishnu Vardhan Burri, also known as Vishnu, Vishnu Vardhan, Vishnu Burri, Burri Vishnu, and vishnuvardhanburri. Backend systems and AI infrastructure engineer.',
    image: '/images/gallery/vishnu/recent-photograph.png',
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">
            Official Presence
          </span>
          <h1 className="text-5xl font-bold italic tracking-tighter md:text-8xl">
            Vishnu Vardhan Burri.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
            The canonical search and identity page for Vishnu Vardhan Burri: backend systems engineer, AI infrastructure engineer, Toptal verified expert, and founder of Xavira Tech Labs.
          </p>
        </div>
        <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8">
          <div className="flex items-center gap-3">
            <Search className="text-blue-400" />
            <h2 className="text-xl font-bold uppercase italic tracking-tight">Search aliases</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            These name variations refer to the same official engineering identity.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {aliases.map((alias) => (
              <span
                key={alias}
                className="rounded-full border border-white/10 bg-black/35 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400"
              >
                {alias}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {profiles.map((profile, index) => {
          const Icon = profile.icon;
          return (
            <motion.a
              key={profile.name}
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group rounded-3xl border border-white/5 bg-zinc-950/50 p-8 transition-colors hover:border-blue-500/30"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <ArrowUpRight size={16} className="text-zinc-700 transition-colors group-hover:text-white" />
              </div>
              <h2 className="mt-8 text-xl font-bold uppercase italic tracking-tight text-white">{profile.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">{profile.detail}</p>
            </motion.a>
          );
        })}
      </section>

      <section className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-400" />
            <h2 className="text-xl font-bold uppercase italic tracking-tight">Entity signals</h2>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-zinc-500">
            Search engines understand people better when the same identity, profiles, photos, and expertise signals connect consistently across pages.
          </p>
          <div className="mt-6 grid gap-3">
            {searchSignals.map((signal) => (
              <div key={signal} className="rounded-2xl border border-white/5 bg-black/35 p-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-400">{signal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {featuredImages.map((image) => (
            <Link
              key={image.src}
              to="/gallery"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black"
              aria-label={`Open gallery photo: ${image.alt}`}
            >
              <img
                src={image.thumb ?? image.src}
                alt={image.alt}
                className="h-48 w-full object-contain opacity-90 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100 sm:h-60"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-300">{image.alt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
        <Sparkles className="mx-auto text-blue-400" />
        <h2 className="mt-6 text-2xl font-bold uppercase italic tracking-tight md:text-3xl">
          Looking for Vishnu Vardhan Burri?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          This is the official website. For work inquiries, production backend audits, AI infrastructure, or Xavira licensing, use the booking or contact path.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/book"
            className="group flex w-full max-w-xs items-center justify-center gap-3 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 sm:w-auto sm:max-w-none"
          >
            Book a Call <ArrowUpRight size={14} />
          </Link>
          <Link
            to="/gallery"
            className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40 sm:w-auto sm:max-w-none"
          >
            View Photos <ArrowUpRight size={14} className="text-blue-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
