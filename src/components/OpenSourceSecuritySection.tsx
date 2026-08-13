import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, ShieldCheck, ArrowRight, Award, Lock, Cpu, Eye } from 'lucide-react';
import { OPEN_SOURCE_PROJECTS, type OpenSourceProject } from '@/src/data/openSourceProjects';
import { ProjectDetailModal } from './ProjectDetailModal';

export function OpenSourceSecuritySection() {
  const [selectedProject, setSelectedProject] = useState<OpenSourceProject | null>(null);

  return (
    <section id="open-source" className="relative border-b border-white/5 bg-black px-5 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-blue-400">
              <ShieldCheck size={14} /> Open Source Security Engineering
            </div>
            <h2 className="mt-6 text-3xl font-bold italic tracking-tighter text-white sm:text-4xl md:text-5xl">
              Open Source Security Engineering
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
              At XAVIRA Technologies, we build and contribute to open-source security infrastructure focused on cryptographic verification, software supply-chain security, application security, and human-governed AI systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vishnuvardhanburri"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              GitHub Organization <Github size={14} />
            </a>
          </div>
        </div>

        {/* 3 Premium Project Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {OPEN_SOURCE_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_28px_90px_rgba(59,130,246,0.15)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-blue-400">
                    {project.securityDomain}
                  </span>

                  {/* Official OpenSSF Badge */}
                  <a
                    href={project.openSsfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:scale-105 ${
                      project.badgeType === 'GOLD'
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                        : 'border-slate-400/40 bg-slate-400/10 text-slate-200 hover:bg-slate-400/20'
                    }`}
                    title={`OpenSSF Best Practices ${project.badgeLevel} (${project.badgePercentage})`}
                  >
                    <Award size={13} className={project.badgeType === 'GOLD' ? 'text-amber-400' : 'text-slate-300'} />
                    <span>OpenSSF {project.badgeLevel} — {project.badgePercentage}</span>
                  </a>
                </div>

                {/* Project Title & Description */}
                <h3 className="mt-5 font-mono text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
                  {project.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                <div className="mt-6 space-y-2">
                  {project.architectureHighlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/5 bg-black px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative mt-8 space-y-3 pt-6 border-t border-white/5">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    href={project.openSsfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:text-white"
                  >
                    <Award size={14} /> Verify OpenSSF
                  </a>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-blue-300 transition-colors hover:bg-blue-500 hover:text-white"
                >
                  <Eye size={14} /> View Project Details <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
