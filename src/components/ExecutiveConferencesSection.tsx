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
    <section id="conferences" className="relative border-b border-white/5 bg-black px-5 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Minimal section label */}
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">
            Bangalore · New Delhi — Company Meetings &amp; Technical Discussions
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {/* Clean 4-photo grid — image only, minimal hover caption */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {EXECUTIVE_CONFERENCE_MOMENTS.map((moment, idx) => (
            <motion.figure
              key={moment.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="group relative overflow-hidden rounded-2xl bg-zinc-950 aspect-[3/4]"
            >
              <img
                src={moment.image}
                alt={moment.altText}
                width={600}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover: minimal caption at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <div className="flex items-center gap-1 mb-0.5">
                  <MapPin size={9} className="text-blue-400 shrink-0" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-blue-300">
                    {moment.cityTag}
                  </span>
                </div>
                <figcaption className="font-mono text-[10px] font-bold text-white leading-snug">
                  {moment.title.split('—')[0].split('&')[0].trim()}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
