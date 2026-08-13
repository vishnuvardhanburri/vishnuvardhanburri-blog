import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, ArrowLeft, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';
import { EXECUTIVE_CONFERENCE_MOMENTS } from '@/src/components/ExecutiveConferencesSection';

export function GalleryPage() {
  usePageMeta({
    title: 'Executive Gallery & Conferences | Vishnu Vardhan Burri | XAVIRA Technologies',
    description:
      'Executive company meetings and technical discussions in Bangalore Electronic City IT Tech Center and Delhi Security Summits featuring Vishnu Vardhan Burri, Director & CEO of XAVIRA Technologies.',
    image: '/images/executive/electronic-city-conference-vishnu-vardhan-burri.jpg',
  });

  return (
    <div className="py-16 px-5 sm:px-6 lg:px-12 max-w-7xl mx-auto text-zinc-100 selection:bg-blue-500/30">
      {/* Header */}
      <header className="mb-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Overview
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-blue-400">
          <Building2 size={14} /> Technical Leadership Gallery
        </div>

        <h1 className="mt-6 text-3xl font-bold italic tracking-tighter text-white sm:text-5xl md:text-6xl">
          Executive Presence &amp; Tech Conferences
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Official engineering presence representing XAVIRA Technologies across key technology hubs in <strong className="text-zinc-200">Bangalore Electronic City IT Tech Center</strong> and <strong className="text-zinc-200">New Delhi Security Summits</strong>. Focused on zero-knowledge cryptography, Web Application Firewalls, and private AI governance.
        </p>
      </header>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {EXECUTIVE_CONFERENCE_MOMENTS.map((moment, idx) => (
          <motion.figure
            key={moment.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-all duration-300 hover:border-blue-500/40"
          >
            <div>
              {/* Image Container with fast-loading JPEGs and explicit dimensions */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src={moment.image}
                  alt={moment.altText}
                  width={600}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />

                <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  <MapPin size={12} className="text-blue-400" />
                  <span>{moment.cityTag}</span>
                </div>
              </div>

              {/* Caption */}
              <figcaption className="p-6">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-blue-400">
                  <Building2 size={12} /> {moment.location}
                </div>

                <h2 className="mt-3 font-mono text-lg font-bold tracking-tight text-white transition-colors group-hover:text-blue-300">
                  {moment.title}
                </h2>

                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  {moment.description}
                </p>
              </figcaption>
            </div>

            <div className="p-6 pt-0">
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {moment.topics.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/5 bg-black/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.figure>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 p-10 text-center sm:p-14">
        <h3 className="text-2xl font-bold italic tracking-tight text-white sm:text-3xl">
          Interested in XAVIRA Technologies Engineering Work?
        </h3>
        <p className="mt-4 text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          We collaborate with engineering teams worldwide on zero-knowledge cryptography, WAF security, AI governance, and backend platform architecture.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.xaviratechlabs.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-blue-600"
          >
            Visit Official Website <ArrowRight size={14} />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 font-mono text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:bg-white hover:text-black"
          >
            Contact Team
          </Link>
        </div>
      </div>
    </div>
  );
}
