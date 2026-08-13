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
  span?: 'normal' | 'wide' | 'tall';
}

const PHOTOS: GalleryPhoto[] = [
  // User-uploaded conference & portrait images (Bangalore + Delhi)
  {
    src: '/images/gallery/vishnu/media_1786612562943.jpg',
    alt: 'Vishnu Vardhan Burri — Bangalore Electronic City IT Tech Center',
    caption: 'Bangalore Electronic City IT Tech Center',
    location: 'Bangalore, KA',
    span: 'tall',
  },
  {
    src: '/images/gallery/vishnu/media_1786612568431.jpg',
    alt: 'Vishnu Vardhan Burri — Company technical discussion, Bangalore',
    caption: 'Technical Discussion — XAVIRA Technologies',
    location: 'Bangalore, KA',
  },
  {
    src: '/images/gallery/vishnu/media_1786612574004.jpg',
    alt: 'Vishnu Vardhan Burri — Engineering leadership, Bangalore',
    caption: 'Engineering Leadership Meeting',
    location: 'Bangalore, KA',
  },
  {
    src: '/images/gallery/vishnu/media_1786612587512.jpg',
    alt: 'Vishnu Vardhan Burri — Delhi Security Summit',
    caption: 'Delhi Cybersecurity Summit',
    location: 'New Delhi, DL',
    span: 'tall',
  },
  {
    src: '/images/gallery/vishnu/media_1786612049470.jpg',
    alt: 'Vishnu Vardhan Burri — Executive portrait, Delhi Tech Forum',
    caption: 'Delhi Technical Leadership Forum',
    location: 'New Delhi, DL',
  },
  {
    src: '/images/gallery/vishnu/media_1786612056207.jpg',
    alt: 'Vishnu Vardhan Burri — Professional portrait',
    caption: 'XAVIRA Technologies — Executive Portrait',
    location: 'Bangalore, KA',
  },
  {
    src: '/images/gallery/vishnu/media_1786612062921.jpg',
    alt: 'Vishnu Vardhan Burri — Professional portrait, blue suit',
    caption: 'Professional Portrait 2026',
    location: 'Bangalore, KA',
    span: 'wide',
  },
  // Executive portraits from public/images/executive
  {
    src: '/images/executive/electronic-city-conference-vishnu-vardhan-burri.jpg',
    alt: 'Vishnu Vardhan Burri — Electronic City Conference, Bangalore',
    caption: 'Electronic City IT Tech Center',
    location: 'Bangalore, KA',
  },
  {
    src: '/images/executive/bangalore-tech-summit-vishnu-vardhan-burri.jpg',
    alt: 'Vishnu Vardhan Burri — Bangalore Tech Summit',
    caption: 'Bangalore Tech Company Meeting',
    location: 'Bangalore, KA',
  },
  {
    src: '/images/executive/delhi-security-summit-vishnu-vardhan-burri.jpg',
    alt: 'Vishnu Vardhan Burri — Delhi AI & Security Summit',
    caption: 'AI Governance & Security Summit',
    location: 'New Delhi, DL',
    span: 'tall',
  },
  {
    src: '/images/executive/delhi-tech-conference-vishnu-vardhan-burri.jpg',
    alt: 'Vishnu Vardhan Burri — Delhi Tech Conference',
    caption: 'Delhi Technical Leadership Panel',
    location: 'New Delhi, DL',
  },
];

export function GalleryPage() {
  usePageMeta({
    title: 'Gallery | Vishnu Vardhan Burri | XAVIRA Technologies',
    description:
      'Executive presence gallery — company meetings, technical discussions and security conferences at Bangalore Electronic City IT Tech Center and Delhi. Vishnu Vardhan Burri, Director & CEO of XAVIRA Technologies.',
    image: '/images/gallery/vishnu/media_1786612562943.jpg',
  });

  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Page Header */}
      <div className="px-5 pt-28 pb-10 sm:px-6 lg:px-12 max-w-7xl mx-auto">
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
          Company meetings, technical discussions and conferences — Bangalore Electronic City IT Tech Center &amp; New Delhi.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="px-5 pb-24 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className={`group relative break-inside-avoid cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 ${
                photo.span === 'tall' ? 'row-span-2' : ''
              }`}
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay with minimal caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={10} className="text-blue-400 shrink-0" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-blue-300">
                    {photo.location}
                  </span>
                </div>
                <p className="font-mono text-[11px] font-bold text-white leading-snug">
                  {photo.caption}
                </p>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="rounded-full bg-black/60 p-1.5 backdrop-blur-sm">
                  <ZoomIn size={12} className="text-white" />
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
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                <X size={14} /> Close
              </button>

              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full rounded-2xl object-contain max-h-[80vh]"
              />

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-blue-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400">
                    {lightbox.location}
                  </span>
                </div>
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
