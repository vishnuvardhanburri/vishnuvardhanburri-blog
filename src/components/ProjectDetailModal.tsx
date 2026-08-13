import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, ShieldCheck, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { OpenSourceProject } from '@/src/data/openSourceProjects';

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: OpenSourceProject | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_32px_120px_rgba(0,0,0,0.9)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/60 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              </span>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-blue-400">
                  {project.securityDomain}
                </span>
                <h2 className="font-mono text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {project.name}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* OpenSSF Badge Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 text-emerald-400 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                    <span>OpenSSF Best Practices</span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-white">
                      {project.badgeLevel} — {project.badgePercentage}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    Official verification on Linux Foundation&apos;s OpenSSF Best Practices Program directory.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={project.openSsfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:text-white"
                >
                  Verify OpenSSF <ExternalLink size={13} />
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  GitHub Repository <Github size={13} />
                </a>
              </div>
            </div>

            {/* 10 Structured Project Breakdown Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* 1. Problem */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-400">1. Problem</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.problem}</p>
              </div>

              {/* 2. What it does */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-400">2. What It Does</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.whatItDoes}</p>
              </div>

              {/* 3. Security Model */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">3. Security Model</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.securityModel}</p>
              </div>

              {/* 4. Architecture Overview */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-400">4. Architecture Overview</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.architectureOverview}</p>
              </div>
            </div>

            {/* 5. Key Capabilities */}
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-400">5. Key Capabilities</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.keyCapabilities.map((cap) => (
                  <div key={cap} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-zinc-950 p-3">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-blue-400" />
                    <span className="text-xs text-zinc-300">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* 6. Open Source Status */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">6. Open-Source Status</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.openSourceStatus}</p>
              </div>

              {/* 7. OpenSSF Achievement */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">7. OpenSSF Achievement</div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.openSsfAchievement}</p>
              </div>

              {/* 8. GitHub Repository */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">8. GitHub Repository</div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-400 hover:underline"
                >
                  {project.githubUrl} <ArrowUpRight size={13} />
                </a>
              </div>

              {/* 9. Verification Link */}
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400">9. OpenSSF Verification Link</div>
                <a
                  href={project.openSsfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 font-mono text-xs font-semibold text-emerald-400 hover:underline"
                >
                  {project.openSsfUrl} <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* 10. Future Direction */}
            <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-400">10. Future Direction</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.futureDirection}</p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-zinc-900/60 px-6 py-4 sm:px-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              XAVIRA Technologies • Open Source Security Infrastructure
            </span>
            <button
              onClick={onClose}
              className="rounded-full bg-white px-5 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-zinc-200"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
