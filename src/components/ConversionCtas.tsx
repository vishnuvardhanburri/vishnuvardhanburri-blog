import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function ConversionCtas({
  className,
  align = 'left',
}: {
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-6',
        align === 'left' ? 'md:justify-start' : 'md:justify-center',
        className,
      )}
    >
      <Link
        to="/contact"
        className="group flex w-full max-w-xs items-center justify-center gap-4 bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 sm:w-auto sm:max-w-none sm:px-10 sm:py-5 sm:text-[11px] sm:tracking-[0.3em]"
      >
        Start an Audit
        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>

      <Link
        to="/book"
        className="group flex w-full max-w-xs items-center justify-center gap-3 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-300 transition-all hover:border-white/40 active:scale-95 sm:w-auto sm:max-w-none sm:px-10 sm:py-5 sm:text-[11px] sm:tracking-[0.3em]"
      >
        Book a Call
        <Calendar size={16} className="text-blue-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
