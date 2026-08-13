import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ShieldCheck, Cpu, Code2, Lock, Terminal, Globe, UserCheck } from 'lucide-react';

const FOCUS_AREAS = [
  'Secure software engineering',
  'Backend systems',
  'AI infrastructure',
  'Cybersecurity',
  'Cryptography',
  'Software supply-chain security',
  'Cloud systems',
  'Automation',
  'Production-grade APIs',
  'Security-focused open source',
] as const;

export function CompanyLeadershipSection() {
  return (
    <section id="company" className="relative border-b border-white/5 bg-black px-5 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Company Positioning */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-blue-400">
              <Globe size={14} /> Technology Leadership
            </div>

            <h2 className="mt-6 text-3xl font-bold italic tracking-tighter text-white sm:text-4xl md:text-5xl">
              XAVIRA Technologies
            </h2>

            <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
              XAVIRA Technologies is an engineering firm dedicated to building production-grade backend systems, secure AI infrastructure, and open-source security tooling. We engineer systems designed for correctness, deep observability, zero-knowledge verification, and deterministic execution under high concurrency.
            </p>

            {/* Official Company Website CTA */}
            <div className="mt-8">
              <a
                href="https://www.xaviratechlabs.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-blue-500/40 bg-blue-500/10 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-blue-300 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Visit Official Website: www.xaviratechlabs.com <ExternalLink size={14} />
              </a>
            </div>

            {/* 10 Focus Areas Grid */}
            <div className="mt-10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">
                Core Engineering Specializations
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {FOCUS_AREAS.map((area) => (
                  <div
                    key={area}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-950/60 p-3.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-medium text-zinc-300">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Leadership Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                <img
                  src="/images/gallery/vishnu/media_1786612568431.jpg"
                  alt="Vishnu Vardhan Burri - Director & CEO at XAVIRA Technologies"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-400">
                      Executive Leadership
                    </span>
                    <h3 className="mt-1 text-2xl font-bold italic tracking-tight text-white">
                      Vishnu Vardhan Burri
                    </h3>
                    <p className="mt-1 font-mono text-xs text-zinc-400">
                      Director &amp; CEO — XAVIRA Technologies
                    </p>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/vishnuvardhanburri/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:border-blue-500 hover:bg-blue-500 hover:text-white"
                    aria-label="LinkedIn profile"
                  >
                    <UserCheck size={18} />
                  </a>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                  Security-focused software engineer and technology leader directing system architecture, cryptographic research, and open-source security engineering across XAVIRA Technologies platforms.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                  <a
                    href="https://github.com/vishnuvardhanburri"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white"
                  >
                    GitHub: @vishnuvardhanburri
                  </a>
                  <span className="text-zinc-600">•</span>
                  <a
                    href="https://www.linkedin.com/in/vishnuvardhanburri/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
