import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Github, ExternalLink, Globe, MapPin, Network, ShieldCheck, Activity, Send, CheckCircle2 } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';
import { consumeContactPrefill } from '@/src/lib/intakePrefill';

export function Contact() {
  usePageMeta({
    title: 'Contact | Project Intake | Vishnu Vardhan Burri',
    description:
      'Project intake for founders and teams: share the backend symptoms, stack, urgency, and goals. Get a clear next step for audits, sprints, delivery, or retainer work.',
  });

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formLoadedAt] = useState(() => Date.now());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    productUrl: '',
    region: '',
    timeline: '',
    budget: '',
    stack: '',
    message: '',
    // Honeypot for bots (humans should never fill this).
    confirmEmail: '',
  });
  const [prefilledFromAssistant, setPrefilledFromAssistant] = useState(false);

  useEffect(() => {
    const prefill = consumeContactPrefill();
    if (!prefill) return;
    setFormData((prev) => ({
      ...prev,
      name: prefill.name ?? prev.name,
      email: prefill.email ?? prev.email,
      company: prefill.company ?? prev.company,
      productUrl: prefill.productUrl ?? prev.productUrl,
      region: prefill.region ?? prev.region,
      timeline: prefill.timeline ?? prev.timeline,
      budget: prefill.budget ?? prev.budget,
      stack: prefill.stack ?? prev.stack,
      message: prefill.message ?? prev.message,
    }));
    setPrefilledFromAssistant(true);
  }, []);

  const social = [
    { name: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/vishnuvardhanburri/', detail: 'Professional profile' },
    { name: 'GitHub', icon: <Github size={18} />, href: 'https://github.com/vishnuvardhanburri', detail: 'Code and projects' },
    { name: 'Toptal', icon: <Activity size={18} />, href: 'https://www.toptal.com/developers/resume/vishnu-vardhan-burri', detail: 'Engineering network' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          meta: { loadedAt: formLoadedAt, submittedAt: Date.now() },
        }),
      });

      if (response.ok) {
        setFormState('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          productUrl: '',
          region: '',
          timeline: '',
          budget: '',
          stack: '',
          message: '',
          confirmEmail: '',
        });
      } else {
        setFormState('error');
      }
    } catch (err) {
      console.error(err);
      setFormState('error');
    }
  };

  return (
    <div className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <header className="mb-24">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em] mb-6 block">Contact // For Founders & Teams</span>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 italic">Bring the backend <br /> problem.</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-500">
          If your product is growing but the backend feels slow, fragile, expensive, or hard to reason about, send the context. I work best when founders need clear diagnosis, calm execution, and production-safe delivery. Remote-friendly worldwide across time zones.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-20">
        <div className="space-y-12">
           <section className="p-10 lg:p-16 border border-white/5 bg-zinc-950/50 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
              <div className="relative z-10">
                 <h2 className="text-2xl font-bold mb-10 italic uppercase tracking-tighter text-blue-500">Give me the real context</h2>

                 {prefilledFromAssistant && (
                   <div className="mb-6 rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
                     <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-emerald-400">Prefilled</div>
                     <div className="mt-2 text-sm text-zinc-400">
                       VeeScout prepared this brief. Review and hit send.
                     </div>
                   </div>
                 )}
                 
                 <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                       <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="flex flex-col items-center justify-center py-20 text-center"
                       >
                          <CheckCircle2 size={48} className="text-emerald-500 mb-6" />
                          <h3 className="text-2xl font-bold mb-2 uppercase italic tracking-tight">Message Received</h3>
                          <p className="text-zinc-500 text-sm">I will review the context and reply soon.</p>
                          <button 
                            onClick={() => setFormState('idle')}
                            className="mt-8 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                          >
                             Send Another Message
                          </button>
                       </motion.div>
                    ) : (
                       <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                                <input 
                                  required
                                  type="text"
                                  value={formData.name}
                                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                                  placeholder="Your name"
                                  className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-800"
                                />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                                <input 
                                  required
                                  type="email"
                                  value={formData.email}
                                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                                  placeholder="you@example.com"
                                  className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-800"
                                />
                             </div>
                          </div>

                          {/* Honeypot */}
                          <div className="absolute left-[-5000px] top-auto h-px w-px overflow-hidden">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Confirm Email</label>
                            <input
                              type="text"
                              tabIndex={-1}
                              autoComplete="off"
                              value={formData.confirmEmail}
                              onChange={e => setFormData({ ...formData, confirmEmail: e.target.value })}
                              placeholder="Leave empty"
                            />
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Company / Project</label>
                             <input 
                               required
                               type="text"
                               value={formData.company}
                               onChange={e => setFormData({ ...formData, company: e.target.value })}
                               placeholder="Company or project name"
                               className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-800"
                             />
                          </div>

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Product URL (optional)</label>
                              <input
                                type="url"
                                value={formData.productUrl}
                                onChange={e => setFormData({ ...formData, productUrl: e.target.value })}
                                placeholder="https://..."
                                className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-800"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Region / Time Zone</label>
                              <select
                                value={formData.region}
                                onChange={e => setFormData({ ...formData, region: e.target.value })}
                                className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors"
                              >
                                <option value="" className="bg-black">Select</option>
                                <option value="Americas" className="bg-black">Americas</option>
                                <option value="Europe/UK" className="bg-black">Europe / UK</option>
                                <option value="Middle East" className="bg-black">Middle East</option>
                                <option value="APAC" className="bg-black">APAC</option>
                                <option value="Africa" className="bg-black">Africa</option>
                                <option value="Other" className="bg-black">Other</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Timeline</label>
                              <select
                                value={formData.timeline}
                                onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                                className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors"
                              >
                                <option value="" className="bg-black">Select</option>
                                <option value="ASAP" className="bg-black">ASAP</option>
                                <option value="1-2 weeks" className="bg-black">1-2 weeks</option>
                                <option value="2-4 weeks" className="bg-black">2-4 weeks</option>
                                <option value="1-3 months" className="bg-black">1-3 months</option>
                                <option value="Not sure" className="bg-black">Not sure</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Budget (optional)</label>
                              <select
                                value={formData.budget}
                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors"
                              >
                                <option value="" className="bg-black">Select</option>
                                <option value="$1k-$5k" className="bg-black">Under $5k (Audit only)</option>
                                <option value="$5k-$10k" className="bg-black">$5k-$10k</option>
                                <option value="$10k-$25k" className="bg-black">$10k-$25k</option>
                                <option value="$25k+" className="bg-black">$25k+</option>
                              </select>
                              <p className="text-[10px] leading-relaxed text-zinc-600">
                                Pricing is scope-based and kept firm (no discount negotiations). If budget is tight, start with the audit or a smaller staged plan.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Current stack (optional)</label>
                            <textarea
                              rows={3}
                              value={formData.stack}
                              onChange={e => setFormData({ ...formData, stack: e.target.value })}
                              placeholder="Example: Node/Next, Postgres, Redis, AWS, Kubernetes, queues..."
                              className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-800 resize-none"
                            />
                          </div>

                          <div className="space-y-2">
                             <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">What do you want to build or fix?</label>
                             <textarea 
                               required
                               rows={6}
                               value={formData.message}
                               onChange={e => setFormData({ ...formData, message: e.target.value })}
                               placeholder="What is breaking or slow? What is the risk? What should be true after we fix it?"
                               className="w-full bg-black border border-white/5 px-6 py-4 rounded-sm text-sm focus:border-blue-500 focus:outline-none transition-colors placeholder:text-zinc-800 resize-none"
                             />
                          </div>

                          {formState === 'error' && (
                             <p className="text-rose-500 text-[10px] font-mono">Message failed. Please try again later.</p>
                          )}

                          <button 
                            disabled={formState === 'submitting'}
                            className="group flex items-center justify-center gap-4 w-full py-5 bg-white text-black font-bold uppercase tracking-[0.3em] text-[11px] rounded-sm hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                             {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                             <Send size={16} className={formState === 'submitting' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'} />
                          </button>
                       </form>
                    )}
                 </AnimatePresence>
              </div>
           </section>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-white/5 glass rounded-2xl flex items-center gap-6">
                 <MapPin className="text-zinc-600" />
                 <div>
                    <div className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Location Strategy</div>
                    <div className="text-sm font-bold uppercase tracking-tight">Remote // Worldwide time zones</div>
                 </div>
              </div>
              <div className="p-8 border border-white/5 glass rounded-2xl flex items-center gap-6">
                 <Globe className="text-zinc-600" />
                 <div>
                    <div className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Best Fit</div>
                    <div className="text-sm font-bold uppercase tracking-tight">Founders / Backend</div>
                 </div>
              </div>
           </div>
        </div>

        <aside className="space-y-8">
           <div className="p-12 border border-white/5 glass rounded-3xl">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-12 border-b border-white/5 pb-6">Where to find me</h3>
              <div className="space-y-6">
                 {social.map(s => (
                   <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="text-zinc-600 group-hover:text-blue-500 transition-colors">{s.icon}</div>
                         <div>
                            <div className="text-xs font-bold uppercase tracking-tighter">{s.name}</div>
                            <div className="text-[8px] uppercase tracking-widest text-zinc-600 font-mono">{s.detail}</div>
                         </div>
                      </div>
                      <ExternalLink size={12} className="text-zinc-800 group-hover:text-white transition-colors" />
                   </a>
                 ))}
                 <a href="https://cal.com/vishnuvardhanburri/30min" target="_blank" rel="noreferrer" className="flex items-center justify-between group pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="text-zinc-600 group-hover:text-blue-500 transition-colors"><Activity size={18} /></div>
                       <div>
                          <div className="text-xs font-bold uppercase tracking-tighter">Cal.com</div>
                          <div className="text-[8px] uppercase tracking-widest text-zinc-600 font-mono">Book a call</div>
                       </div>
                    </div>
                    <ExternalLink size={12} className="text-zinc-800 group-hover:text-white transition-colors" />
                 </a>
              </div>
           </div>

           <div className="p-12 border border-blue-500/10 bg-blue-500/5 flex flex-col gap-6 rounded-3xl">
              <ShieldCheck className="text-blue-500" />
              <div>
                 <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-2">Direct Email</h4>
                 <p className="text-zinc-500 text-[10px] leading-relaxed mb-6 italic">
                    Use email if you already have a product brief, backend issue, or founder-level context ready.
                 </p>
                 <div className="space-y-4">
                    <a href="mailto:hello@vishnulabs.com" className="flex items-center gap-3 text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                       <Mail size={14} /> hello@vishnulabs.com
                    </a>
                 </div>
              </div>
           </div>
        </aside>
      </div>

      <div className="mt-32 flex justify-center opacity-30">
         <div className="flex items-center gap-12 text-[9px] font-mono uppercase tracking-[0.4em] text-zinc-600">
            <span>Remote: Ready</span>
            <span>Focus: Backend</span>
            <span>Reply: Soon</span>
         </div>
      </div>
    </div>
  );
}
