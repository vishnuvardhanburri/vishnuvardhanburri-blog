import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Cpu, Database, Shield, Github, Award, Lock, ExternalLink } from 'lucide-react';
import { CASE_STUDIES, CREDIBILITY_SIGNALS, type CaseStudy } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';
import { OpenSourceSecuritySection } from '@/src/components/OpenSourceSecuritySection';
import { OpenSSFTrackRecord } from '@/src/components/OpenSSFTrackRecord';
import { CompanyLeadershipSection } from '@/src/components/CompanyLeadershipSection';
import { TrustSection } from '@/src/components/TrustSection';
import { ContactCtaSection } from '@/src/components/ContactCtaSection';

const FEATURED_CASE_STUDY_IDS = ['business-web-platform', 'high-risk-migration', 'ai-voice-booking'] as const;

export function Home() {
  usePageMeta({
    title: 'Vishnu Vardhan Burri | Backend & AI Infrastructure Engineer | XAVIRA Technologies',
    description:
      'Backend Systems and AI Infrastructure Engineer. Director & CEO of XAVIRA Technologies. Building high-concurrency systems, robust security protocols, and human-governed AI architectures.',
    image: '/images/vishnu-hero.jpg',
  });

  const featured = FEATURED_CASE_STUDY_IDS
    .map((id) => CASE_STUDIES.find((s) => s.id === id))
    .filter((study): study is CaseStudy => Boolean(study));

  return (
    <div className="relative bg-black text-zinc-100 selection:bg-blue-500/30">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/5 bg-black">
        <div className="absolute inset-0 grid-pattern opacity-[0.035]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(59,130,246,0.18),transparent_52%)]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <div className="inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>XAVIRA Technologies</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="text-blue-400">Open Source Security &amp; Systems</span>
              </div>

              <h1 className="mt-8 text-4xl font-bold italic leading-[1.02] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Open Source Security.
                <br />
                Production Systems.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                At XAVIRA Technologies, we design cryptographic verification engines, application firewalls, private AI governance layers, and reliable backend infrastructure engineered for production under pressure.
              </p>

              <div className="mt-8 grid max-w-2xl gap-3">
                {[
                  'Zero-knowledge proof engines & cryptographic artifact supply-chain verification.',
                  'Real-time Web Application Firewall (PyWAF) & OWASP Top 10 threat mitigation.',
                  'Private AI governance frameworks (Sovereign-Shield) with human oversight controls.',
                  'Production backend systems with Postgres transaction safety, idempotency & observability.',
                ].map((line) => (
                  <div key={line} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/40 p-4">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-500" />
                    <span className="text-sm leading-relaxed text-zinc-300">{line}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="https://www.xaviratechlabs.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-blue-500 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-[0_12px_40px_rgba(59,130,246,0.3)] transition-all hover:bg-blue-600 hover:scale-105"
                >
                  Discuss a Project <ArrowRight size={15} />
                </a>

                <a
                  href="#open-source"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Explore Open Source <Award size={15} />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                <a
                  href="https://github.com/vishnuvardhanburri"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  <Github size={13} /> GitHub Profile
                </a>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/in/vishnuvardhanburri/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://www.xaviratechlabs.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:underline"
                >
                  <ExternalLink size={12} /> xaviratechlabs.com
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/70 shadow-[0_28px_90px_rgba(0,0,0,0.75)]">
                <img
                  src="/images/vishnu-hero.jpg"
                  alt="Vishnu Vardhan Burri - XAVIRA Technologies CEO"
                  width={600}
                  height={800}
                  fetchPriority="high"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.78)_100%)]" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-400">
                        XAVIRA Technologies
                      </div>
                      <div className="mt-1 text-sm font-bold text-white">
                        Vishnu Vardhan Burri
                      </div>
                      <div className="font-mono text-[9px] text-zinc-400">
                        Director &amp; CEO — Security Systems Engineer
                      </div>
                    </div>
                    <Award className="h-6 w-6 text-amber-400" />
                  </div>
                </div>
              </div>

              {/* Status Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: <Award size={16} className="text-amber-400" />, label: 'OpenSSF', value: 'GOLD 300%' },
                  { icon: <Shield size={16} className="text-emerald-400" />, label: 'Security', value: 'Default Deny' },
                  { icon: <Cpu size={16} className="text-blue-400" />, label: 'Engine', value: 'ZK Proofs' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/5 bg-black/40 p-4">
                    <div className="flex items-center justify-between gap-2">
                      {item.icon}
                      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">{item.label}</div>
                    </div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-tight text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 1: OPEN SOURCE SECURITY ENGINEERING */}
      <OpenSourceSecuritySection />

      {/* SECTION 2: OPENSSF SECURITY TRACK RECORD */}
      <OpenSSFTrackRecord />

      {/* SECTION 3: XAVIRA TECHNOLOGIES & LEADERSHIP */}
      <CompanyLeadershipSection />


      {/* SECTION 5: TRUST & VERIFIABILITY */}
      <TrustSection />

      {/* SECTION 5: SYSTEMS & ARCHITECTURE HIGHLIGHTS */}
      <section className="border-b border-white/5 bg-black px-5 py-20 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-zinc-500">Case Studies</div>
              <h2 className="mt-6 text-3xl font-bold italic tracking-tighter text-white md:text-5xl">
                Production Engineering Practice.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-zinc-400">
                Detailed notes on real production constraints, API performance tuning, transactional integrity, and data security.
              </p>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 transition-colors hover:text-white"
            >
              See all case studies <ChevronRight size={14} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featured.map((study, idx) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              >
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.32em] text-zinc-600">
                    {study.client?.industry || 'Engineering work'}
                  </div>
                  <h3 className="mt-4 text-xl font-bold uppercase italic tracking-tight text-white">{study.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">{study.description}</p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {study.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="rounded-2xl border border-white/5 bg-black/40 p-4">
                        <div className="text-base font-bold italic tracking-tight text-white">{m.value}</div>
                        <div className="mt-1 font-mono text-[8px] uppercase tracking-widest text-zinc-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link
                    to={`/case-studies/${study.id}`}
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:text-white"
                  >
                    Read case study <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT / DISCUSS A PROJECT CTA */}
      <ContactCtaSection />
    </div>
  );
}
