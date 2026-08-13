import React from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { OPEN_SOURCE_PROJECTS } from '@/src/data/openSourceProjects';

export function OpenSSFTrackRecord() {
  return (
    <section className="border-b border-white/5 bg-black px-5 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-emerald-400">
              Verified Credibility
            </div>
            <h2 className="mt-6 text-3xl font-bold italic tracking-tighter text-white md:text-5xl">
              OpenSSF Security Track Record
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400">
              Our open-source security infrastructure projects are registered and independently verified on the Linux Foundation&apos;s OpenSSF Best Practices directory. Achieving OpenSSF Best Practices badge levels demonstrates our commitment to security governance, automated regression testing, vulnerability reporting, and software supply-chain integrity.
            </p>
          </div>
        </div>

        {/* Track Record Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OPEN_SOURCE_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all hover:border-emerald-500/30"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
                    OpenSSF Badge
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${
                      project.badgeType === 'GOLD'
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                        : 'border-slate-400/40 bg-slate-400/10 text-slate-200'
                    }`}
                  >
                    <Award size={14} className={project.badgeType === 'GOLD' ? 'text-amber-400' : 'text-slate-300'} />
                    {project.badgeLevel} — {project.badgePercentage}
                  </span>
                </div>

                {/* Project Info */}
                <h3 className="mt-6 font-mono text-2xl font-bold tracking-tight text-white">
                  {project.name}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  {project.securityDomain}
                </p>

                {/* OpenSSF Highlights */}
                <div className="mt-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>OpenSSF Best Practices {project.badgeLevel} Criteria</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Automated CI/CD & Vulnerability Policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Cryptographic Integrity & Supply Chain Standards</span>
                  </div>
                </div>
              </div>

              {/* Official Link */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <a
                  href={project.openSsfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:text-white"
                >
                  <span>Verify OpenSSF {project.name}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Framing & Disclaimer */}
        <div className="mt-10 rounded-2xl border border-white/5 bg-zinc-950/40 p-6 text-xs leading-relaxed text-zinc-400">
          <p>
            <strong className="text-zinc-200">Accurate Open-Source Security Framing:</strong> Achievement of OpenSSF Best Practices GOLD and SILVER badge levels indicates compliance with open-source security guidelines, security policies, automated build/test requirements, and vulnerability response disclosures. It reflects technical rigor and supply-chain discipline; it does not constitute a legal warranty or claim that any software is mathematically unhackable.
          </p>
        </div>
      </div>
    </section>
  );
}
