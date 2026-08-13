import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ChevronLeft } from 'lucide-react';
import { BLOG_POSTS, type BlogBlock } from '@/src/constants';
import { usePageMeta } from '@/src/lib/seo';
import { ConversionCtas } from '@/src/components/ConversionCtas';

function Block({ block }: { block: BlogBlock }) {
  if (block.type === 'p') {
    return <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">{block.text}</p>;
  }

  if (block.type === 'image') {
    return (
      <figure className="rounded-3xl border border-white/10 bg-black/60 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.55)] sm:p-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <img
            src={block.src}
            alt={block.alt}
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
        {block.caption ? (
          <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === 'code') {
    return (
      <figure className="rounded-3xl border border-white/10 bg-black/60 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.55)] sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            {block.language ? block.language : 'code'}
          </div>
          {block.caption ? (
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 sm:block">
              {block.caption}
            </div>
          ) : null}
        </div>
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black p-4 text-sm leading-relaxed text-zinc-200">
          <code>{block.code}</code>
        </pre>
        {block.caption ? (
          <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:hidden">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return null;
}

export function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) return <Navigate to="/blog" />;

  usePageMeta({
    title: `${post.title} | Founder Notes | Vishnu Vardhan Burri`,
    description: post.excerpt,
    image: post.cover?.src,
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-28 lg:px-12">
      <Link
        to="/blog"
        className="mb-16 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500 transition-colors hover:text-white"
      >
        <ChevronLeft size={14} />
        Back to Blog
      </Link>

      <header className="mb-16">
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-600">
          <BookOpen size={14} className="text-blue-500" />
          <span>
            {post.date} // {post.readTime}
          </span>
        </div>
        <h1 className="text-4xl font-bold italic tracking-tighter text-white sm:text-6xl">{post.title}</h1>
        <p className="mt-6 text-base leading-relaxed text-zinc-500 sm:text-lg">{post.excerpt}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {post.cover ? (
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_24px_90px_rgba(0,0,0,0.75)]">
          <div className="aspect-[16/9] w-full">
            <img
              src={post.cover.src}
              alt={post.cover.alt}
              className="h-full w-full object-contain opacity-95"
              style={{ objectPosition: post.cover.focus ?? '50% 45%' }}
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(59,130,246,0.14),transparent_58%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.78)_100%)]" />
        </div>
      ) : null}

      <div className="space-y-8">
        {post.blocks.map((block, idx) => (
          <motion.div
            key={`${post.id}-${block.type}-${idx}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.55, ease: [0.21, 1, 0.36, 1] }}
          >
            <Block block={block} />
          </motion.div>
        ))}
      </div>

      <section className="mt-20 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-10 text-center">
        <h2 className="text-2xl font-bold uppercase italic tracking-tight text-white">Want this applied to your product?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
          Share what is breaking, what is slow, and what you need to become predictable. I will map the real risks, quick wins, and the fastest path to calmer production.
        </p>
        <div className="mt-8 flex justify-center">
          <ConversionCtas align="center" />
        </div>
      </section>
    </div>
  );
}
