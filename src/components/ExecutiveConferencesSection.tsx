import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Building2, ShieldCheck, Award, ExternalLink } from 'lucide-react';

export interface ConferenceMoment {
  id: string;
  image: string;
  title: string;
  location: string;
  cityTag: string;
  altText: string;
  description: string;
  topics: string[];
}

export const EXECUTIVE_CONFERENCE_MOMENTS: ConferenceMoment[] = [
  {
    id: 'bangalore-electronic-city',
    image: '/images/executive/electronic-city-conference-vishnu-vardhan-burri.jpg',
    title: 'Bangalore Electronic City IT Tech Center — Technical Strategy',
    location: 'Electronic City IT Tech Center, Bangalore',
    cityTag: 'Bangalore, KA',
    altText: 'Vishnu Vardhan Burri presenting technical architecture at Bangalore Electronic City IT Tech Center',
    description:
      'Leading deep technical discussions on software supply-chain security, zero-knowledge verification, and high-concurrency backend architecture at Electronic City IT Tech Center.',
    topics: ['Electronic City IT Hub', 'Supply Chain Security', 'API Reliability'],
  },
  {
    id: 'bangalore-tech-summit',
    image: '/images/executive/bangalore-tech-summit-vishnu-vardhan-burri.jpg',
    title: 'Bangalore Tech Leadership & Company Meeting',
    location: 'Bangalore IT Tech Corridor, Bangalore',
    cityTag: 'Bangalore, KA',
    altText: 'Vishnu Vardhan Burri Director and CEO XAVIRA Technologies at Bangalore tech company meeting',
    description:
      'Executive company meetings with engineering leaders detailing zero-knowledge proof engines (zk-proof-engine) and scalable database transaction boundaries.',
    topics: ['Tech Center Meetings', 'Cryptography', 'XAVIRA Leadership'],
  },
  {
    id: 'delhi-security-summit',
    image: '/images/executive/delhi-security-summit-vishnu-vardhan-burri.jpg',
    title: 'Delhi Cybersecurity & AI Governance Summit',
    location: 'New Delhi Tech Conference Center, Delhi',
    cityTag: 'New Delhi, DL',
    altText: 'Vishnu Vardhan Burri speaking at Delhi Cybersecurity and AI Governance Summit',
    description:
      'Keynote technical panels on human-governed AI systems (Sovereign-Shield), PII masking, and private AI security controls for enterprise deployments.',
    topics: ['Delhi Security Summit', 'AI Governance', 'Human Oversight'],
  },
  {
    id: 'delhi-tech-conference',
    image: '/images/executive/delhi-tech-conference-vishnu-vardhan-burri.jpg',
    title: 'Delhi Technical Leadership & Security Forum',
    location: 'New Delhi Conference Center, Delhi',
    cityTag: 'New Delhi, DL',
    altText: 'Vishnu Vardhan Burri participating in technical leadership forum in Delhi',
    description:
      'Presenting OpenSSF Best Practices GOLD & SILVER track records and PyWAF Web Application Firewall threat mitigation patterns to cybersecurity leaders.',
    topics: ['Delhi Tech Forum', 'OpenSSF Standards', 'PyWAF Middleware'],
  },
];

export function ExecutiveConferencesSection() {
  return (
    <section id="conferences" className="relative border-b border-white/5 bg-black px-5 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-blue-400">
              <Building2 size={14} /> Executive Presence &amp; Industry Forums
            </div>
            <h2 className="mt-6 text-3xl font-bold italic tracking-tighter text-white sm:text-4xl md:text-5xl">
              Company Meetings &amp; Tech Conferences
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
              Representing XAVIRA Technologies at major technology centers across <strong className="text-zinc-200">Bangalore (Electronic City IT Tech Center)</strong> and <strong className="text-zinc-200">New Delhi</strong>. Vishnu Vardhan Burri engages in technical discussions on zero-knowledge cryptography, Web Application Firewalls, open-source security (OpenSSF), and private AI governance.
            </p>
          </div>
        </div>

        {/* 4 Conference Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {EXECUTIVE_CONFERENCE_MOMENTS.map((moment, idx) => (
            <motion.figure
              key={moment.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.65)] transition-all duration-300 hover:border-blue-500/40"
            >
              <div>
                {/* Image Container with explicit dimensions and loading="lazy" for SEO */}
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

                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    <MapPin size={12} className="text-blue-400" />
                    <span>{moment.cityTag}</span>
                  </div>
                </div>

                {/* Card Content */}
                <figcaption className="p-6">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-blue-400">
                    <Building2 size={12} /> {moment.location}
                  </div>

                  <h3 className="mt-3 font-mono text-lg font-bold tracking-tight text-white transition-colors group-hover:text-blue-300">
                    {moment.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                    {moment.description}
                  </p>
                </figcaption>
              </div>

              {/* Topic Tags Footer */}
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
      </div>
    </section>
  );
}
