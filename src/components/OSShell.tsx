import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import { Terminal, Shield, Cpu, Network, Activity, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTopLink,
  NavigationMenuTrigger,
  NavigationMenuLinkAsChild,
} from './NavigationMenu';

export function OSShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const latency = 24.16;

  const navItems = [
    { name: 'Root', path: '/' },
    { name: 'Open Source', path: '/#open-source' },
    { name: 'Systems', path: '/systems' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Xavira Tech', path: '/xavira' },
    { name: 'Experience', path: '/experience' },
    { name: 'Blog', path: '/blog' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isFocusActive = ['/systems', '/architecture', '/philosophy'].includes(location.pathname);
  const isWorkActive =
    location.pathname === '/experience' ||
    location.pathname === '/process' ||
    location.pathname.startsWith('/case-studies') ||
    location.pathname.startsWith('/case-studies/');
  const isInsightsActive = location.pathname === '/blog' || location.pathname.startsWith('/blog/');

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Matrix Sync */}
      <div className="fixed inset-0 grid-pattern opacity-[0.03] pointer-events-none z-0" />
      
      {/* Global Telemetry Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-zinc-900 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20" />
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-[70] flex items-center justify-between border-b px-5 py-4 transition-all duration-300 ease-out sm:px-6 lg:px-10",
          isMenuOpen
            ? "border-white/10 bg-black/95 shadow-[0_16px_60px_rgba(0,0,0,0.45)]"
            : "border-white/5 bg-black/80"
        )}
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm group-hover:bg-blue-500 transition-colors duration-300">
              <Terminal size={18} className="text-black group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold leading-none tracking-tight uppercase">VISHNU</span>
              <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-zinc-500 sm:tracking-widest">Vardhan Burri</span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-3 lg:flex">
          <NavigationMenu
            delayDuration={80}
            skipDelayDuration={120}
            className="flex-none"
          >
            <NavigationMenuList className="flex-none justify-start gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 shadow-[0_12px_40px_rgba(0,0,0,0.22)]">
              <NavigationMenuItem>
                <NavigationMenuTopLink asChild active={location.pathname === '/'} className={cn(location.pathname === '/' && 'border-blue-500/30 bg-blue-500/10 text-white')}>
                  <Link to="/">Root</Link>
                </NavigationMenuTopLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(isFocusActive && 'border-blue-500/30 bg-blue-500/10 text-white')}>
                  Focus
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-1 md:w-[460px] md:grid-cols-2">
                    <NavigationMenuLinkAsChild>
                      <Link to="/systems">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">Systems</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          Scale boundaries, observability, deterministic behavior.
                        </span>
                      </Link>
                    </NavigationMenuLinkAsChild>
                    <NavigationMenuLinkAsChild>
                      <Link to="/architecture">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">Architecture</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          How decisions get made when the product is under load.
                        </span>
                      </Link>
                    </NavigationMenuLinkAsChild>
                    <NavigationMenuLinkAsChild className="md:col-span-2">
                      <Link to="/philosophy">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">Philosophy</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          Production-first engineering, correctness over cleverness.
                        </span>
                      </Link>
                    </NavigationMenuLinkAsChild>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(isWorkActive && 'border-blue-500/30 bg-blue-500/10 text-white')}>
                  Work
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-1 md:w-[520px] md:grid-cols-2">
                    <NavigationMenuLinkAsChild className="md:col-span-2">
                      <Link to="/case-studies">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">Case Studies</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          10 builds. Real constraints. Clear outcomes and what changed.
                        </span>
                      </Link>
                    </NavigationMenuLinkAsChild>
                    <NavigationMenuLinkAsChild>
                      <Link to="/experience">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">Experience</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          Years, roles, and the kind of problems solved in production.
                        </span>
                      </Link>
                    </NavigationMenuLinkAsChild>
                    <NavigationMenuLinkAsChild>
                      <Link to="/process">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">How I Work</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          Audit → ship → stabilize. Founder-friendly delivery.
                        </span>
                      </Link>
                    </NavigationMenuLinkAsChild>
                    <NavigationMenuLinkAsChild>
                      <a href="https://www.xaviratechlabs.com/" target="_blank" rel="noreferrer">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">XAVIRA Tech</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          Official enterprise company site &amp; products.
                        </span>
                      </a>
                    </NavigationMenuLinkAsChild>
                    <NavigationMenuLinkAsChild>
                      <Link to="/contact">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">Contact</span>
                        <span className="text-[11px] leading-relaxed text-zinc-500">
                          Share the product + symptoms. Get a clear next step fast.
                        </span>
                      </Link>
                    </NavigationMenuLinkAsChild>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTopLink
                  asChild
                  active={isInsightsActive}
                  className={cn(isInsightsActive && 'border-blue-500/30 bg-blue-500/10 text-white')}
                >
                  <Link to="/blog">Blog</Link>
                </NavigationMenuTopLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTopLink
                  asChild
                  active={location.pathname === '/xavira'}
                  className={cn(location.pathname === '/xavira' && 'border-blue-500/30 bg-blue-500/10 text-white')}
                >
                  <Link to="/xavira">Xavira</Link>
                </NavigationMenuTopLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTopLink
                  asChild
                  active={location.pathname === '/pricing'}
                  className={cn(location.pathname === '/pricing' && 'border-blue-500/30 bg-blue-500/10 text-white')}
                >
                  <Link to="/pricing">Pricing</Link>
                </NavigationMenuTopLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTopLink
                  asChild
                  active={location.pathname === '/contact'}
                  className={cn(location.pathname === '/contact' && 'border-blue-500/30 bg-blue-500/10 text-white')}
                >
                  <Link to="/contact">Contact</Link>
                </NavigationMenuTopLink>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuIndicator />
          </NavigationMenu>
          <Link 
            to="/contact" 
            className="relative overflow-hidden rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 transition-all duration-300 hover:border-white/40 hover:bg-white hover:text-black"
          >
            Work With Me
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-[70] flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 ease-out hover:border-white/30 hover:bg-white/10 hover:text-white lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <motion.span
            animate={{ rotate: isMenuOpen ? 90 : 0, scale: isMenuOpen ? 0.92 : 1 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </motion.span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-[55] bg-black/90 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={event => event.stopPropagation()}
              className="absolute inset-x-4 top-20 max-h-[calc(100svh-7rem)] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950/95 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.85)]"
            >
              <div className="mb-3 border-b border-white/5 px-2 pb-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-blue-400">Navigation</p>
                <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-zinc-600">Vishnu Vardhan Burri</p>
              </div>
              <div className="flex flex-col">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035, duration: 0.24 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "group flex items-center justify-between border-b border-white/5 px-2 py-4 text-base font-bold uppercase tracking-[0.08em] transition-all duration-300",
                          isActive ? "text-white" : "text-zinc-400 hover:text-white"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full transition-colors",
                              isActive ? "bg-blue-500" : "bg-zinc-700 group-hover:bg-blue-500/70"
                            )}
                          />
                          {item.name}
                        </span>
                        <ChevronRight size={15} className="text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:text-blue-400" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent HUD Elements */}
      <div className="fixed bottom-8 left-8 z-40 hidden xl:flex flex-col gap-4 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-3">
          <Network className="w-3 h-3 text-blue-500" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Latency: {latency.toFixed(2)}ms</span>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-3 h-3 text-emerald-500" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Security: Hardened</span>
        </div>
        <div className="flex items-center gap-3">
          <Activity className="w-3 h-3 text-orange-500" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Telemetry: Streaming</span>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-40 hidden xl:block opacity-40">
        <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 text-right">
          Build v1.4.2 // Production Ready <br />
          Deterministic System Core 
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Command Footer */}
      <footer className="relative z-10 bg-[#050505] border-t border-white/5 py-12 px-6 lg:px-12 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/contact"
              className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Available for backend and platform work
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/book"
              className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Book a call
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/presence"
              className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              Official presence
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="text-center text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-700 sm:tracking-[0.4em]">
            © 2026 Vishnu Vardhan Burri — Backend & Platform Engineer
          </div>
        </div>
      </footer>
    </div>
  );
}
