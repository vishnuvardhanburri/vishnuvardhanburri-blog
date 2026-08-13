/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OSShell } from './components/OSShell';
import { SeoSync } from './components/SeoSync';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Architecture = lazy(() => import('./pages/Architecture').then(module => ({ default: module.Architecture })));
const Systems = lazy(() => import('./pages/Systems').then(module => ({ default: module.Systems })));
const CaseStudies = lazy(() => import('./pages/CaseStudies').then(module => ({ default: module.CaseStudies })));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail').then(module => ({ default: module.CaseStudyDetail })));
const Philosophy = lazy(() => import('./pages/Philosophy').then(module => ({ default: module.Philosophy })));
const Experience = lazy(() => import('./pages/Experience').then(module => ({ default: module.Experience })));
const Process = lazy(() => import('./pages/Process').then(module => ({ default: module.Process })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(module => ({ default: module.BlogPost })));
const Xavira = lazy(() => import('./pages/Xavira').then(module => ({ default: module.Xavira })));
const XaviraBooking = lazy(() => import('./pages/XaviraBooking').then(module => ({ default: module.XaviraBooking })));
const Book = lazy(() => import('./pages/Book').then(module => ({ default: module.Book })));
const Presence = lazy(() => import('./pages/Presence').then(module => ({ default: module.Presence })));
const AboutVishnu = lazy(() => import('./pages/AboutVishnu').then(module => ({ default: module.AboutVishnu })));
const BackendSystemsEngineer = lazy(() => import('./pages/BackendSystemsEngineer').then(module => ({ default: module.BackendSystemsEngineer })));
const AiInfrastructureEngineer = lazy(() => import('./pages/AiInfrastructureEngineer').then(module => ({ default: module.AiInfrastructureEngineer })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Pricing = lazy(() => import('./pages/Pricing').then(module => ({ default: module.Pricing })));
const PortfolioAssistant = lazy(() =>
  import('./components/PortfolioAssistant').then(module => ({ default: module.PortfolioAssistant }))
);

function RouteFallback() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
        Loading XAVIRA Technologies workspace
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/process" element={<Process />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/xavira" element={<Xavira />} />
        <Route path="/xavira/book" element={<XaviraBooking />} />
        <Route path="/book" element={<Book />} />
        <Route path="/presence" element={<Presence />} />
        <Route path="/about-vishnu-vardhan-burri" element={<AboutVishnu />} />
        <Route path="/backend-systems-engineer" element={<BackendSystemsEngineer />} />
        <Route path="/ai-infrastructure-engineer" element={<AiInfrastructureEngineer />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <SeoSync />
      <OSShell>
        <AppRoutes />
      </OSShell>
      <Suspense fallback={null}>
        <PortfolioAssistant />
      </Suspense>
    </Router>
  );
}
