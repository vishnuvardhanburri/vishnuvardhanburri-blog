import React from 'react';
import { ShieldCheck, Eye, Lock, Code2, RefreshCw } from 'lucide-react';

export function TrustSection() {
  return (
    <section className="border-b border-white/5 bg-black px-5 py-20 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
              <ShieldCheck size={14} /> Open Architecture &amp; Verifiability
            </div>

            <h2 className="mt-6 text-3xl font-bold italic tracking-tighter text-white sm:text-4xl md:text-5xl">
              Built to be inspected, verified, and improved.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
              We believe security software should earn trust through transparency, rigorous peer inspection, open standards, and verifiable code. All XAVIRA open-source security projects are publicly available on GitHub to allow developers, security researchers, and enterprise engineering teams to inspect the codebase, verify security controls, submit improvements, and build with confidence.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <Eye size={20} className="text-blue-400" />
                <h3 className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Public Code Inspection
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Every line of cryptography, WAF middleware, and governance code is published for audit and verification.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <RefreshCw size={20} className="text-emerald-400" />
                <h3 className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-white">
                  OpenSSF Verified
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Built according to OpenSSF Best Practices standards for CI/CD testing, vulnerability reporting, and release hygiene.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <Lock size={20} className="text-purple-400" />
                <h3 className="mt-3 font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Default-Deny Controls
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Designed around strict boundary validation, zero-trust permissions, and deterministic rollback discipline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
