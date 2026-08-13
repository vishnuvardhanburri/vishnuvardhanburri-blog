import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ExternalLink, Mail, Calendar } from 'lucide-react';

export function ContactCtaSection() {
  return (
    <section className="border-t border-white/5 bg-black px-5 py-24 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 via-zinc-950 to-black p-10 text-center sm:p-16">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
            <MessageSquare size={14} /> XAVIRA Technologies Engineering Engagement
          </div>

          <h2 className="mt-6 text-3xl font-bold italic tracking-tight text-white sm:text-4xl md:text-5xl">
            Have a technically difficult problem?
          </h2>

          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
            XAVIRA Technologies works with teams worldwide on security-focused software, AI infrastructure, backend systems, and complex engineering projects.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.xaviratechlabs.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-blue-500 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_12px_40px_rgba(59,130,246,0.35)] transition-all hover:bg-blue-600 hover:scale-105"
            >
              Discuss a Project <ArrowRight size={16} />
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-zinc-200 transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              Contact Engineering Team <Mail size={15} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            <span>Official Company: www.xaviratechlabs.com</span>
            <span>•</span>
            <span>Worldwide Async &amp; Direct Engagement</span>
            <span>•</span>
            <span>Zero Exaggerated Claims</span>
          </div>
        </div>
      </div>
    </section>
  );
}
