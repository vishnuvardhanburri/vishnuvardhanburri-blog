import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, ChevronRight } from 'lucide-react';
import { BLOG_POSTS, type BlogBlock } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';
import { ConversionCtas } from '@/src/components/ConversionCtas';

export function Blog() {
  usePageMeta({
    title: 'Founder Notes | Backend, Reliability, Architecture | Vishnu Vardhan Burri',
    description:
      'Short notes for founders: backend reliability, platform architecture, migrations, observability, and how to reduce production risk as you scale.',
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-32 lg:px-12">
      <header className="mb-24 text-center">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">Blog // Founder Notes</span>
        <h1 className="mb-8 text-5xl font-bold italic tracking-tighter md:text-8xl">How I think under pressure.</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-500">
          Short notes for founders and teams: how I think about backend risk, reliability, architecture, and the kind of engineering that helps products move faster.
        </p>
      </header>

      <div className="space-y-8">
        {BLOG_POSTS.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group overflow-hidden rounded-3xl border border-white/5 bg-zinc-950/50"
          >
            <Link to={`/blog/${post.id}`} className="block">
              <div className="grid gap-px bg-white/5 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative bg-black p-8 sm:p-10">
                  <div className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-600">
                    <BookOpen size={14} className="text-blue-500" />
                    {post.date} // {post.readTime}
                  </div>

                  <h2 className="text-2xl font-bold uppercase italic tracking-tight text-white transition-colors group-hover:text-blue-400 md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-6 text-sm leading-relaxed text-zinc-500">{post.excerpt}</p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                    Read note <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <div className="relative bg-black p-8 sm:p-10">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black">
                    {post.cover ? (
                      <>
                        <img
                          src={post.cover.src}
                          alt={post.cover.alt}
                          className="h-full w-full object-contain opacity-95 transition-transform duration-700 group-hover:scale-[1.01]"
                          style={{ objectPosition: post.cover.focus ?? '50% 45%' }}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.06)_52%,rgba(0,0,0,0.72)_100%)]" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-700">
                        <span className="font-mono text-[10px] uppercase tracking-[0.32em]">Founder Note</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-4">
                    {post.blocks
                      .filter((b): b is Extract<BlogBlock, { type: 'p' }> => b.type === 'p')
                      .slice(0, 2)
                      .map((b) => (
                        <p key={b.text} className="text-sm leading-relaxed text-zinc-400">
                          {b.text}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <section className="mt-24 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
        <ArrowUpRight className="mx-auto mb-6 text-blue-500" />
        <h2 className="mb-4 text-2xl font-bold uppercase italic tracking-tight">Want to talk through your real backend?</h2>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-zinc-500">
          I like conversations that start with the actual founder problem: what is slow, what is breaking, what is hard to maintain, and what needs to become simpler before growth gets expensive.
        </p>
        <ConversionCtas align="center" />
      </section>
    </div>
  );
}
