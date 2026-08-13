import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { X, MapPin, ArrowLeft, ZoomIn } from 'lucide-react';
import { usePageMeta } from '@/src/lib/seo';

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  location: string;
}

// 4 unique real portraits uploaded today — no duplicates
const PHOTOS: GalleryPhoto[] = [
  {
    src: '/images/gallery/vishnu/media_1786612562943.jpg',
    alt: 'Vishnu Vardhan Burri — Bangalore Electronic City IT Tech Center',
    caption: 'Electronic City IT Tech Center',
    location: 'Bangalore, KA',
  },
  {
    src: '/images/gallery/vishnu/media_1786612568431.jpg',
    alt: 'Vishnu Vardhan Burri — Technical Leadership, Bangalore',
    caption: 'Technical Leadership',
    location: 'Bangalore, KA',
  },
  {
    src: '/images/gallery/vishnu/media_1786612574004.jpg',
    alt: 'Vishnu Vardhan Burri — Delhi Cybersecurity & AI Governance Summit',
    caption: 'Delhi Cybersecurity & AI Summit',
    location: 'New Delhi, DL',
  },
  {
    src: '/images/gallery/vishnu/media_1786612587512.jpg',
    alt: 'Vishnu Vardhan Burri — Delhi Technical Leadership Forum',
    caption: 'Delhi Technical Leadership Forum',
    location: 'New Delhi, DL',
  },
];

export function GalleryPage() {
  usePageMeta({
    title: 'Gallery | Vishnu Vardhan Burri | XAVIRA Technologies',
    description:
      'Executive presence — company meetings, technical discussions and security conferences at Bangalore Electronic City IT Tech Center and Delhi. Vishnu Vardhan Burri, Director & CEO of XAVIRA Technologies.',
    image: '/images/gallery/vishnu/media_1786612574004.jpg',
  });

  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="px-5 pt-28 pb-10 sm:px-6 lg:px-12 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={12} /> Back
        </Link>
        <h1 className="text-3xl font-bold italic tracking-tighter text-white sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-3 text-sm text-zinc-500 max-w-xl">
          Bangalore Electronic City IT Tech Center &amp; New Delhi — company meetings and technical discussions.
        </p>
      </div>

      {/* 2×2 Photo Grid */}
      <div className="px-5 pb-24 sm:px-6 lg:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 aspect-[3/4]"
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay — just location + short title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <div className="flex items-center gap-1 mb-0.5">
                  <MapPin size={9} className="text-blue-400 shrink-0" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-blue-300">
                    {photo.location}
                  </span>
                </div>
                <p className="font-mono text-[10px] font-bold text-white leading-snug">
                  {photo.caption}
                </p>
              </div>

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="rounded-full bg-black/60 p-1.5 backdrop-blur-sm">
                  <ZoomIn size={11} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-9 right-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                <X size={13} /> Close
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full rounded-2xl object-contain max-h-[82vh]"
              />
              <div className="mt-3 flex items-center gap-2">
                <MapPin size={11} className="text-blue-400 shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400">
                  {lightbox.location}
                </span>
                <span className="text-zinc-600">·</span>
                <p className="font-mono text-xs text-zinc-300">{lightbox.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
