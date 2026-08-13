import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Award, Briefcase, CheckCircle2, Clock3, Terminal, TrendingUp } from 'lucide-react';
import { BLOG_POSTS, CREDIBILITY_SIGNALS } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';
import { ConversionCtas } from '@/src/components/ConversionCtas';

export function Experience() {
  usePageMeta({
    title: 'Experience | Timeline | Vishnu Vardhan Burri',
    description:
      'Experience timeline: backend, platform, security, and founder work. What changed, what shipped, and what it taught Vishnu about production systems.',
  });

  const experiences = [
    {
      role: 'Back-end Software Engineer (Verified Expert)',
      company: 'Toptal (Global Network)',
      period: 'Dec 29, 2025 - Present',
      duration: 'Active',
      focus: 'Production back-end systems for founders and teams',
      did: 'I work through the Toptal network as a verified back-end engineer. The focus is not a badge. It is the bar: clear thinking, production discipline, and shipping outcomes you can trust.',
      changed: 'It sharpened my default behavior: smaller reliable changes, stronger validation, safer releases, and communication that founders can act on fast.',
      result: 'If you prefer hiring through a vetted network, you can review my Toptal profile and engage me directly via Toptal.',
      skills: ['Toptal Verified', 'Back-end Engineering', 'System Design'],
    },
    {
      role: 'Founder & CEO',
      company: 'Xavira Tech Labs',
      period: 'Oct 2025 - Present',
      duration: 'Active',
      focus: 'Product and platform building',
      did: 'I build Xavira around fragile foundations I kept seeing in the market: shallow AI wrappers, weak validation, brittle codebases, and systems that collapse under load.',
      changed: 'The firm is shaped for stabilization, legacy refactoring, cloud-native deployment, AI guardrails, and automation workflows.',
      result: 'It sharpened how I connect founder goals with engineering decisions that actually ship and survive production.',
      skills: ['System Stabilization', 'AI Guardrails', 'Cloud Native'],
    },
    {
      role: 'Software Engineer',
      company: 'Microsoft',
      period: '2024 - 2026',
      duration: '2 yrs',
      focus: 'Enterprise back-end + reliability discipline',
      did: 'I worked on back-end services and AI-enabled workflows where validation, observability, and operational safety mattered more than “shipping fast once.”',
      changed: 'Enterprise pressure teaches discipline: structured logging, safer releases, code review quality, and reliability habits that hold under load.',
      result: 'Founders get the benefit: calmer architecture, predictable failure modes, and systems that are easier to debug and evolve.',
      skills: ['Python', 'Observability', 'Reliability'],
    },
    {
      role: 'Security Research Engineer',
      company: 'I4C (Ministry of Home Affairs)',
      period: '2024',
      duration: 'R&D',
      focus: 'Trust boundaries + failure scenarios',
      did: 'I worked on security-first thinking: how systems fail, where trust breaks, and how to design auditability and safer defaults.',
      changed: 'It made my back-end decisions more defensive: default-deny access, validation, logs that can be audited, and “unhappy paths” treated as first-class.',
      result: 'For founders, it means less risk debt later. Security becomes a design constraint, not a patch sprint after launch.',
      skills: ['Security', 'Auditability', 'Validation'],
    },
    {
      role: 'B.Tech CSE Cybersecurity',
      company: 'The Apollo University',
      period: 'Academic Base',
      duration: 'Active',
      focus: 'Security-first grounding',
      did: 'I study Computer Science Engineering with a cybersecurity specialization, which shapes how I think about backend trust.',
      changed: 'Security is not a later layer in my work. It affects data boundaries, access control, logs, validation, and failure behavior from the start.',
      result: 'Founders get backend thinking with a stronger trust and risk lens.',
      skills: ['Cybersecurity', 'Backend Trust', 'Validation'],
    },
  ];

  const depth = [
    { label: 'Software Engineering', value: '6 years' },
    { label: 'Distributed Systems', value: '5 years' },
    { label: 'FastAPI', value: '5 years' },
    { label: 'PostgreSQL', value: '5 years' },
    { label: 'Kubernetes (EKS/GKE)', value: '5 years' },
    { label: 'System Design', value: '4 years' },
    { label: 'Python', value: '4 years' },
    { label: 'API Design', value: '3 years' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-32 lg:px-12">
      <header className="mb-28 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">Experience // Founder-Ready Timeline</span>
          <h1 className="text-5xl font-bold italic leading-[0.9] tracking-tighter md:text-8xl">Built for product pressure.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
            Founders need engineers who understand that backend problems become business problems. Since 2024, my work across backend, platform, security, and product systems has trained me to build for speed, clarity, debugging, and trust from day one.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid w-full max-w-sm grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:w-80"
        >
          <div className="border-r border-white/5 bg-black p-6">
            <Clock3 className="mb-5 text-blue-500" />
            <div className="text-4xl font-bold italic tracking-tighter">6+ yrs</div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">Working Experience</div>
          </div>
          <div className="bg-black p-6">
            <TrendingUp className="mb-5 text-emerald-500" />
            <div className="text-4xl font-bold italic tracking-tighter">4</div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">Major Work Tracks</div>
          </div>
        </motion.div>
      </header>

      <section className="mb-28 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
        {CREDIBILITY_SIGNALS.map(signal => (
          <a key={signal.label} href={signal.href} target="_blank" rel="noreferrer" className="bg-black p-6 transition-colors hover:bg-zinc-950">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-600">{signal.label}</div>
            <div className="mb-4 text-2xl font-bold uppercase italic tracking-tight text-white">{signal.value}</div>
            <p className="text-xs leading-relaxed text-zinc-500">{signal.detail}</p>
          </a>
        ))}
      </section>

      <section className="mb-32 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-white/5 bg-zinc-950/50 p-10 shadow-[0_24px_90px_rgba(0,0,0,0.55)] sm:p-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">Resume snapshot</div>
          <h2 className="mt-6 text-3xl font-bold italic tracking-tighter text-white md:text-5xl">Depth that shows up in production.</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-500">
            These are the areas I operate in most: distributed back ends, reliability, data integrity, security boundaries, and delivery under pressure.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2">
            {depth.map((d) => (
              <div key={d.label} className="bg-black p-6">
                <div className="text-2xl font-bold italic tracking-tight text-white">{d.value}</div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.32em] text-zinc-600">{d.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
            <a
              href="https://www.toptal.com/developers/resume/vishnu-vardhan-burri"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              View Toptal Resume
            </a>
            <span className="h-1 w-1 rounded-full bg-zinc-800" aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/vishnuvardhanburri/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              View LinkedIn
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 sm:p-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-blue-400">Engage</div>
          <h3 className="mt-6 text-2xl font-bold uppercase italic tracking-tight text-white">Need a senior back end fix?</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            Bring the symptom and context. I will reply with the simplest next step: audit, sprint, delivery, or retainer.
          </p>
          <ConversionCtas align="left" className="mt-8" />
        </div>
      </section>

      <div className="relative space-y-28 border-l border-white/5 pl-8 md:pl-20">
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="group relative"
          >
            <div className="absolute -left-[41px] top-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black transition-colors group-hover:border-blue-500 md:-left-[101px] md:h-10 md:w-10">
              <Terminal size={14} className="transition-colors group-hover:text-blue-500" />
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-600">{exp.period} // {exp.duration}</div>
                <h2 className="text-2xl font-bold uppercase italic">{exp.role}</h2>
                <div className="mt-1 text-lg font-bold uppercase tracking-tight text-blue-500">{exp.company}</div>
                <div className="mt-4 w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">{exp.focus}</span>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  ['What I did', exp.did],
                  ['What changed', exp.changed],
                  ['What it taught me', exp.result],
                ].map(([label, text]) => (
                  <div key={label} className="rounded-2xl border border-white/5 bg-zinc-950/60 p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-blue-500" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">{label}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-400">{text}</p>
                  </div>
                ))}

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.skills.map(skill => (
                    <span key={skill} className="border border-white/5 bg-black px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600 transition-all group-hover:border-white/10 group-hover:text-zinc-400">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-blue-500 via-blue-500/10 to-transparent" />
      </div>

      <section className="mt-40 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-2">
        <div className="flex flex-col gap-6 bg-black p-10 sm:p-12">
          <Award className="text-blue-500" />
          <h3 className="text-lg font-bold uppercase italic tracking-widest">How founders should use me</h3>
          <p className="text-sm leading-relaxed text-zinc-500">
            Bring the messy backend, unclear service boundaries, slow releases, reliability questions, or scale anxiety. I will help make the system understandable, shippable, and safer.
          </p>
        </div>
        <div className="flex flex-col gap-6 bg-black p-10 sm:p-12">
          <Briefcase className="text-emerald-500" />
          <h3 className="text-lg font-bold uppercase italic tracking-widest">What visitors should remember</h3>
          <p className="text-sm leading-relaxed text-zinc-500">
            Vishnu is not only a backend developer. He is a builder who understands product pressure, production risk, and the engineering discipline needed to make teams move faster.
          </p>
        </div>
      </section>

      <section className="mt-32">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">Field Notes</span>
            <h2 className="text-3xl font-bold italic tracking-tighter md:text-5xl">Small blog posts from the work.</h2>
          </div>
          <Link to="/blog" className="text-[10px] font-bold uppercase tracking-widest text-blue-500 transition-colors hover:text-white">
            Read all notes
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BLOG_POSTS.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="rounded-2xl border border-white/5 bg-zinc-950/50 p-6 transition-colors hover:border-blue-500/30 hover:bg-zinc-900">
              <div className="mb-4 font-mono text-[8px] uppercase tracking-[0.24em] text-zinc-600">{post.date} // {post.readTime}</div>
              <h3 className="mb-4 text-lg font-bold uppercase italic tracking-tight text-white">{post.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-500">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
