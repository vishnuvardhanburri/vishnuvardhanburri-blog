export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string[];
  modules: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  image: {
    src: string;
    alt: string;
    focus?: string;
  };
  client: {
    name: string;
    location?: string;
    industry?: string;
    confidentiality?: 'public' | 'nda';
  };
  review?: {
    quote: string;
    author: string;
    role?: string;
    company?: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "business-web-platform",
    title: "Production-Ready Business Platform",
    subtitle: "RBAC + payments + reliability, built for real users",
    description:
      "A production SaaS back end built around strict access control, transaction safety for payments, and release discipline so founders can ship without fear.",
    challenge:
      "The platform had business-critical workflows (auth, data writes, payments). The risk was silent corruption: duplicate executions, unclear boundaries, and releases that could break production.",
    solution:
      "I rebuilt the foundations: default-deny RBAC, idempotent payment flows (Stripe/PayPal), transaction-safe writes, and observability so failures become diagnosable instead of mysterious.",
    impact: [
      "Duplicate payment execution risk removed via idempotency",
      "Back-end response latency reduced by ~40% under concurrent load",
      "Release reliability improved with clearer checks + rollback discipline"
    ],
    modules: [
      "Default-deny authentication + RBAC boundaries",
      "Transaction-safe Stripe/PayPal workflows with idempotency keys",
      "PostgreSQL schema + indexing strategy and migration discipline",
      "Structured logging + health diagnostics for faster recovery"
    ],
    tech: ["FastAPI", "Node.js", "PostgreSQL", "Stripe", "PayPal", "RBAC", "AWS", "Observability"],
    metrics: [
      { label: "Latency", value: "-40%" },
      { label: "Duplicate Charges", value: "Eliminated" },
      { label: "Service Availability", value: "99.9%" },
      { label: "Delivery Window", value: "4-8 wks" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1762163516269-3c143e04175c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Server rack with status lights",
      focus: "50% 45%",
    },
    client: {
      name: "Pro Client",
      industry: "SaaS / Payments",
      confidentiality: "nda"
    },
    review: {
      quote:
        "Clear foundations. Fewer surprises. Payments became predictable and releases stopped feeling risky.",
      author: "Founder",
      role: "Product / SaaS",
      company: "Client (NDA)"
    }
  },
  {
    id: "ai-voice-booking",
    title: "Secure Voice + Real-Time Booking Pipeline",
    subtitle: "Low-latency voice events with production-safe state",
    description:
      "A real-time voice workflow with encryption-safe session handling and a booking pipeline that converts voice intent into deterministic scheduling actions.",
    challenge:
      "Real-time voice systems break under concurrency: session state drifts, encryption lifecycles fail, and downstream writes become inconsistent when the system is stressed.",
    solution:
      "I engineered a reliability-first voice pipeline: key exchange + encryption lifecycle management, stable session synchronization, and booking-state control with idempotent writes and validation.",
    impact: [
      "Encryption-related communication failures reduced by ~35%",
      "Synchronization delays reduced by ~30% for real-time events",
      "Stable booking writes via validation + idempotency"
    ],
    modules: [
      "Key exchange + encryption lifecycle management (MLS-style patterns)",
      "RTP packet encryption workflows + backward-compatible rollout",
      "Session synchronization and member-state transitions under concurrency",
      "Idempotent booking pipeline + audit-friendly event logs"
    ],
    tech: ["Go", "Distributed Systems", "Encryption", "Voice Systems", "Event Handling", "Observability"],
    metrics: [
      { label: "Voice Failures", value: "-35%" },
      { label: "Sync Delay", value: "-30%" },
      { label: "Delivery Window", value: "6 wks" },
      { label: "Workload", value: "High concurrency" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1712159018726-4564d92f3ec2?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Customer support agent with a headset",
      focus: "50% 40%",
    },
    client: {
      name: "S1 LLC",
      industry: "Secure Voice / Real-Time Systems",
      confidentiality: "public"
    },
    review: {
      quote:
        "He didn’t just add features. He made the voice system predictable under pressure, and rollout felt safe.",
      author: "Engineering Manager",
      role: "Real-time systems",
      company: "S1 LLC"
    }
  },
  {
    id: "stealth-vault",
    title: "Stealth Vault",
    subtitle: "Localized data protection engine",
    description: "A localized data protection concept for organizations that want sensitive customer metadata to avoid unnecessary third-party cloud exposure.",
    challenge: "Some products cannot treat privacy as a settings page. They need data handling designed into the runtime itself.",
    solution: "I leaned into local processing, encryption boundaries, metadata isolation, and private operational control.",
    impact: [
      "Local-first processing model",
      "Sensitive metadata isolation",
      "Reduced third-party exposure"
    ],
    modules: [
      "Encryption-at-rest boundaries and key handling model",
      "Local-first processing nodes (offline-safe)",
      "Metadata isolation and access control rules",
      "Operational runbook for incident recovery"
    ],
    tech: ["Encryption", "Local Nodes", "Security", "Metadata", "Access Control"],
    metrics: [
      { label: "Data Model", value: "Local" },
      { label: "Privacy", value: "Guarded" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1765568183720-a8a5e50b6086?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Silver padlock close-up",
      focus: "50% 45%",
    },
    client: {
      name: "Client (NDA)",
      industry: "Security / Privacy",
      location: "India",
      confidentiality: "nda"
    },
    review: {
      quote:
        "Security wasn’t an afterthought. The architecture made privacy a default behavior, not a feature toggle.",
      author: "CTO",
      company: "Client (NDA)"
    }
  },
  {
    id: "legal-intake-engine",
    title: "Legal Intake & Workflow Automation",
    subtitle: "OCR, PDF, and ETL processing",
    description: "A document-processing pipeline for turning legal intake material into structured data that teams can review and act on.",
    challenge: "Legal intake is messy: scanned documents, PDFs, inconsistent formats, and manual categorization slow the business down.",
    solution: "I focused on OCR, PDF parsing, ETL routines, categorization logic, and structured output objects.",
    impact: [
      "Reduced manual intake friction",
      "Structured document extraction",
      "Repeatable workflow automation"
    ],
    modules: [
      "OCR + PDF parsing pipeline with validation checkpoints",
      "ETL categorization and structured output objects",
      "Failure handling for low-quality scans",
      "Queue-based processing for throughput control"
    ],
    tech: ["OCR", "PDF Parsing", "ETL", "Automation", "Data Modeling"],
    metrics: [
      { label: "Input", value: "Messy docs" },
      { label: "Output", value: "Structured" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=1600&q=85",
      alt: "Case files and documents on a desk",
      focus: "50% 40%",
    },
    client: {
      name: "Client (NDA)",
      industry: "Legal Ops",
      location: "India",
      confidentiality: "nda"
    },
    review: {
      quote:
        "We went from manual intake chaos to a repeatable pipeline the team could actually rely on.",
      author: "Ops Lead",
      company: "Client (NDA)"
    }
  },
  {
    id: "incident-response-hardening",
    title: "Production Incident Response Hardening",
    subtitle: "Observability, alerts, and calmer on-call",
    description:
      "A reliability pass that turned production into a debuggable system: better logs, clear alerts, and repeatable incident playbooks.",
    challenge:
      "The product wasn’t failing because engineers weren’t smart. It was failing because nobody had clear signals, ownership boundaries, or a reliable way to recover quickly.",
    solution:
      "I added structured logs, meaningful dashboards, alert thresholds tied to user impact, and a small set of runbooks that actually get used during pressure.",
    impact: [
      "Mean time to recovery (MTTR) reduced by ~40%",
      "Failure detection + troubleshooting time reduced by ~50%",
      "Incidents became repeatable to diagnose and recover"
    ],
    modules: [
      "Structured logging + request correlation IDs",
      "Core dashboards (latency, errors, saturation)",
      "Actionable alert rules tied to user impact",
      "Incident runbooks + postmortem template"
    ],
    tech: ["Observability", "Logging", "Metrics", "Tracing", "Dashboards", "SRE", "Python", "Azure"],
    metrics: [
      { label: "MTTR", value: "-40%" },
      { label: "Troubleshooting", value: "-50%" },
      { label: "Availability", value: "99.9%" },
      { label: "Delivery Window", value: "2-4 wks" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Monitoring dashboard on a screen",
      focus: "50% 45%",
    },
    client: {
      name: "Microsoft",
      industry: "Enterprise SaaS",
      confidentiality: "public"
    },
    review: {
      quote:
        "We stopped guessing in production. The dashboards told the truth, and incidents became recoverable.",
      author: "Engineering Lead",
      company: "Enterprise team"
    }
  },
  {
    id: "high-risk-migration",
    title: "High-Risk Data Migration (Zero Drama)",
    subtitle: "Schema cleanup + safe cutover plan",
    description:
      "A migration strategy for messy production data: cleaning schema boundaries, backfilling safely, and cutting over without losing integrity.",
    challenge:
      "Migrations are where startups lose trust. Old columns, inconsistent writes, and unclear ownership can turn a release into downtime or data corruption.",
    solution:
      "I designed dual-write boundaries, backfill jobs with validation, verification queries, and a staged cutover plan with rollback paths.",
    impact: [
      "Deployment rollback incidents reduced by ~45%",
      "Cutover steps became visible, reversible, and auditable",
      "Lower corruption risk via validation + verification queries"
    ],
    modules: [
      "Dual-write / backfill pattern with validation",
      "Verification queries + data integrity checks",
      "Staged cutover checklist + rollback plan",
      "Data ownership rules for services"
    ],
    tech: ["PostgreSQL", "Migrations", "Kubernetes", "CI/CD", "Validation", "Observability"],
    metrics: [
      { label: "Rollback Incidents", value: "-45%" },
      { label: "Availability", value: "99.9%" },
      { label: "Cutover", value: "Staged" },
      { label: "Delivery Window", value: "2-6 wks" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1667264501379-c1537934c7ab?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Network cables and switches",
      focus: "50% 45%",
    },
    client: {
      name: "Mattijs-IT",
      industry: "Fintech / Banking (BaaS)",
      confidentiality: "public"
    },
    review: {
      quote:
        "This was the first migration where the team didn’t panic. Every step was visible and reversible.",
      author: "Founder",
      company: "Fintech Client"
    }
  },
  {
    id: "cost-latency-reduction",
    title: "Cloud Cost + Latency Reduction Sprint",
    subtitle: "Faster APIs, fewer bills",
    description:
      "A focused sprint to reduce cloud waste and improve API performance by simplifying the hot paths and tightening caching boundaries.",
    challenge:
      "Teams often accept slow endpoints and expensive infrastructure as “normal.” For founders, that becomes a growth tax and a hiring tax.",
    solution:
      "I traced the hot paths, reduced unnecessary calls, introduced safe caching, and made performance regressions visible before they hit customers.",
    impact: [
      "Hot paths simplified for consistent performance",
      "Caching boundaries with safe invalidation",
      "Cost pressure reduced through fewer wasteful calls"
    ],
    modules: [
      "Performance tracing + hot path mapping",
      "Caching strategy + invalidation rules",
      "Query tuning + N+1 elimination",
      "Regression dashboards + performance budget"
    ],
    tech: ["Cloud", "Caching", "PostgreSQL", "Performance", "Tracing", "Dashboards"],
    metrics: [
      { label: "Latency", value: "-40%" },
      { label: "Cloud Waste", value: "Down" },
      { label: "Delivery Window", value: "1-2 wks" },
      { label: "Regression Risk", value: "Visible" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Performance analytics dashboard",
      focus: "50% 45%",
    },
    client: {
      name: "Client (NDA)",
      industry: "B2B SaaS",
      confidentiality: "nda"
    }
  },
  {
    id: "queue-based-workflows",
    title: "Queue-Based Automation Workflows",
    subtitle: "Backpressure, retries, and deterministic processing",
    description:
      "Introduced durable background processing for workflows that can’t live inside request-response: retries, idempotency, and backpressure.",
    challenge:
      "When everything runs in the API request, products get fragile: timeouts, partial failures, and inconsistent data writes under load.",
    solution:
      "I moved heavy work into queues with retry rules, idempotent handlers, and observability around throughput and failure reasons.",
    impact: [
      "Throughput control with backpressure",
      "Repeatable retries without duplicate writes",
      "Cleaner separation between API and background work"
    ],
    modules: [
      "Queue consumers with idempotent handlers",
      "Retry + dead-letter policies",
      "Job visibility (metrics + logs + tracing)",
      "Backpressure strategy for peak load"
    ],
    tech: ["Queues", "Node", "Workers", "Observability", "Reliability"],
    metrics: [
      { label: "Workload", value: "Durable" },
      { label: "Retries", value: "Safe" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1701328778019-e95dedbf5346?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Conveyor belt moving cargo in an industrial setting",
      focus: "50% 45%",
    },
    client: {
      name: "Client (NDA)",
      industry: "Automation",
      confidentiality: "nda"
    }
  },
  {
    id: "security-access-revamp",
    title: "Security + Access Control Revamp",
    subtitle: "Trust boundaries that make audits easier",
    description:
      "Reworked access control and data boundaries for a product that needed safer defaults: clean roles, explicit permissions, and auditable behavior.",
    challenge:
      "Most access control systems are glued together. That becomes dangerous when the product grows, teams change, and data becomes sensitive.",
    solution:
      "I introduced a permission model the team could explain, test, and audit, plus validation that prevented silent privilege creep.",
    impact: [
      "Clear permission boundaries",
      "Auditable access control behavior",
      "Safer defaults for sensitive actions"
    ],
    modules: [
      "Role + permission model with tests",
      "Authorization middleware boundaries",
      "Audit log events for sensitive actions",
      "Threat-model checklist for new features"
    ],
    tech: ["Auth", "Security", "Backend", "Validation", "Audit"],
    metrics: [
      { label: "Security", value: "Default-deny" },
      { label: "Auditability", value: "Improved" },
      { label: "Delivery Window", value: "1-3 wks" },
      { label: "Risk", value: "Lower" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1703237570688-551586d89ad3?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Padlocks attached to a chain",
      focus: "50% 45%",
    },
    client: {
      name: "Client (NDA)",
      industry: "B2B SaaS",
      confidentiality: "nda"
    }
  },
  {
    id: "founder-delivery-acceleration",
    title: "Founder Delivery Acceleration",
    subtitle: "From slow releases to repeatable shipping",
    description:
      "A delivery upgrade that improved how the team shipped: smaller releases, clearer ownership, and fewer regressions.",
    challenge:
      "When releases are slow, founders feel it as lost momentum. Often the cause is unclear ownership, missing checks, and changes that keep breaking production.",
    solution:
      "I tightened the dev loop with CI checks, better environments, smaller release steps, and conventions the team could actually follow.",
    impact: [
      "Deployment rollback incidents reduced by ~35-45%",
      "Failure detection and troubleshooting time improved by ~50%",
      "Faster shipping from smaller releases and clearer checks"
    ],
    modules: [
      "CI checks for type safety + basic quality gates",
      "Environment parity and deploy checklist",
      "Release slicing strategy (smaller changes)",
      "Lightweight engineering conventions"
    ],
    tech: ["CI/CD", "TypeScript", "Backend", "Process", "Release Discipline"],
    metrics: [
      { label: "Rollbacks", value: "-35%" },
      { label: "Troubleshooting", value: "-50%" },
      { label: "Delivery Window", value: "2-4 wks" },
      { label: "Shipping", value: "Faster" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Team collaborating around laptops",
      focus: "50% 45%",
    },
    client: {
      name: "Client (NDA)",
      industry: "Startup",
      confidentiality: "nda"
    }
  }
];

export interface ClientReview {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  relatedWorkId?: string;
}

// NOTE: Replace NDA placeholders with real names/permissioned testimonials when available.
export const CLIENT_REVIEWS: ClientReview[] = CASE_STUDIES
  .filter((s) => s.review)
  .map((s) => ({
    quote: s.review!.quote,
    author: s.review!.author,
    role: s.review!.role,
    company: s.review!.company,
    relatedWorkId: s.id,
  }));

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  bestFor: string;
  outcomes: string[];
  notes: string;
}

// NOTE: These are starter numbers/copy. Adjust to match your real pricing before shipping publicly.
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'signal-audit',
    name: 'System Signal Audit',
    price: '$1.5k+',
    duration: '2-3 days',
    bestFor:
      'Founders who need clarity: what is actually breaking, why it’s slow, and where the real risk is hiding.',
    outcomes: [
      'Architecture map: boundaries, ownership, and failure points',
      'Top risks list: what can break under scale and why',
      'A 7-14 day execution plan with priorities and tradeoffs',
    ],
    notes:
      'Best starting point when the system feels messy. If the codebase is large, pricing can move based on access and scope.',
  },
  {
    id: 'stabilization-sprint',
    name: 'Stabilization Sprint',
    price: '$4k+',
    duration: '1-2 weeks',
    bestFor:
      'When production is noisy: incidents, flaky releases, unclear ownership, or “we’re scared to deploy.”',
    outcomes: [
      'Stability fixes: remove fragile hot spots and tighten contracts',
      'Observability: logs/metrics that reduce debugging time',
      'Release safety: smaller changes, clearer rollback paths',
    ],
    notes:
      'You’ll get visible progress quickly. I’ll target the pressure points first, then lock the system into calmer behavior.',
  },
  {
    id: 'build-under-pressure',
    name: 'Build Under Pressure',
    price: '$6k+',
    duration: '2-4 weeks',
    bestFor:
      'Founders who need backend delivery that ships: new modules, refactors, integrations, and production-readiness.',
    outcomes: [
      'Modules shipped end-to-end with acceptance criteria',
      'Validation + guardrails so the system stays clean as it grows',
      'Deployment discipline and predictable release loop',
    ],
    notes:
      'This is delivery-focused. If the product has unknowns, we’ll start with a short audit first.',
  },
  {
    id: 'retainer',
    name: 'Founder Retainer',
    price: '$3k/mo+',
    duration: 'Monthly',
    bestFor:
      'Teams who want a senior backend partner close to the product: ongoing system decisions, shipping, and reliability.',
    outcomes: [
      'Weekly delivery cadence + direct founder communication',
      'Architecture decisions + guardrails as the product evolves',
      'Stability + performance improvements that compound over time',
    ],
    notes:
      'Retainers are best when the product is moving fast and the team needs senior judgment without hiring overhead.',
  },
];

export const CREDIBILITY_SIGNALS = [
  {
    label: "Toptal",
    value: "Verified Expert",
    detail: "Toptal Verified Expert in Engineering (member since Dec 29, 2025).",
    href: "https://www.toptal.com/developers/resume/vishnu-vardhan-burri"
  },
  {
    label: "Academic Base",
    value: "B.Tech CSE Cybersecurity",
    detail: "Security-first engineering grounding at The Apollo University, Andhra Pradesh.",
    href: "https://apollouniversity.edu.in/wp-content/uploads/2026/03/February-2026-21.pdf"
  },
  {
    label: "Founder Track",
    value: "Xavira Tech Labs",
    detail: "A lean engineering firm focused on stabilization, cloud-native systems, automation, and AI guardrails.",
    href: "https://in.linkedin.com/company/xaviratech"
  },
  {
    label: "Public Engineering Identity",
    value: "LinkedIn / GitHub",
    detail: "Public proof of professional presence, private-repo heavy client work, and production-first engineering language.",
    href: "https://www.linkedin.com/in/vishnuvardhanburri/"
  }
];

export const XAVIRA_PRINCIPLES = [
  "Correctness over cleverness",
  "Deep observability before failure",
  "Boring systems that keep running",
  "Security and validation by default"
];

export const AI_DELIVERY_PRINCIPLES = [
  "AI is a tool, not the product",
  "Validation + deterministic fallbacks are non-negotiable",
  "If the model is wrong, the system must stay correct",
  "Observability beats guessing",
  "Ship outcomes, not demos",
];

export const AI_TOOLKIT = [
  {
    title: "LLMs & Reasoning",
    items: ["GPT-class models", "Claude-class models", "Structured outputs", "Prompt + tool design"],
  },
  {
    title: "RAG & Retrieval",
    items: ["Postgres + vector search", "Chunking + evaluation", "Caching + guardrails", "Audit-friendly traces"],
  },
  {
    title: "Automation",
    items: ["Workflow orchestration", "Document/OCR pipelines", "Integrations (payments, CRM, comms)", "Queue-backed jobs"],
  },
  {
    title: "Production Safety",
    items: ["RBAC + auth boundaries", "Rate limits + abuse controls", "Observability (logs/metrics/traces)", "Rollback-first releases"],
  },
] as const;

export const NAV_LINKS = [
  { name: "Systems", href: "/systems" },
  { name: "Architecture", href: "/architecture" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Xavira Tech", href: "/xavira" },
  { name: "Contact", href: "/contact" },
];

export const GALLERY_IMAGES = [
  {
    src: '/images/gallery/vishnu/recent-photograph.png',
    thumb: '/images/gallery/vishnu/thumbs/recent-photograph.jpg',
    alt: 'Vishnu Vardhan Burri - simple lifestyle portrait of a high-tech leader',
  },
  {
    src: '/images/gallery/vishnu/vishnu.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu.jpg',
    alt: 'Vishnu Vardhan Burri - simple lifestyle, calm high-tech leadership',
  },
  {
    src: '/images/gallery/vishnu/mine.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/mine.jpg',
    alt: 'Vishnu Vardhan Burri - founder lifestyle with a simple high-tech presence',
  },
  // Removed duplicates / AI-lookalikes for a cleaner, more authentic set.
  {
    src: '/images/gallery/vishnu/whatsapp-2026-01-10.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/whatsapp-2026-01-10.jpg',
    alt: 'Vishnu Vardhan Burri - simple lifestyle moment with focused engineering energy',
  },
  {
    src: '/images/gallery/vishnu/whatsapp-2026-03-05.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/whatsapp-2026-03-05.jpg',
    alt: 'Vishnu Vardhan Burri - clean professional portrait of a high-tech leader',
  },
  {
    src: '/images/gallery/vishnu/whatsapp-2026-05-06-005541.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/whatsapp-2026-05-06-005541.jpg',
    alt: 'Vishnu Vardhan Burri - simple outdoor lifestyle and quiet leadership',
  },
  {
    src: '/images/gallery/vishnu/whatsapp-2026-05-06-005541-1.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/whatsapp-2026-05-06-005541-1.jpg',
    alt: 'Vishnu Vardhan Burri - simple work lifestyle as a backend systems engineer',
  },
  {
    src: '/images/gallery/vishnu/whatsapp-2026-05-06-005541-2.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/whatsapp-2026-05-06-005541-2.jpg',
    alt: 'Vishnu Vardhan Burri - candid simple lifestyle with high-tech founder presence',
  },
  {
    src: '/images/gallery/vishnu/whatsapp-2026-05-06-005542.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/whatsapp-2026-05-06-005542.jpg',
    alt: 'Vishnu Vardhan Burri - simple leadership moment speaking with confidence',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-01.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-01.jpg',
    alt: 'Vishnu Vardhan Burri - official simple lifestyle photo of a high-tech leader',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-02.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-02.jpg',
    alt: 'Vishnu Vardhan Burri - official personal portrait with simple lifestyle presence',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-03.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-03.jpg',
    alt: 'Vishnu Vardhan Burri - official candid portrait showing calm high-tech leadership',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-04.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-04.jpg',
    alt: 'Vishnu Vardhan Burri - official outdoor portrait with simple founder lifestyle',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-05.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-05.jpg',
    alt: 'Vishnu Vardhan Burri - official personal image with focused engineering presence',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-06.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-06.jpg',
    alt: 'Vishnu Vardhan Burri - official founder portrait with simple high-tech style',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-07.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-07.jpg',
    alt: 'Vishnu Vardhan Burri - official lifestyle portrait of a high-tech systems leader',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-08.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-08.jpg',
    alt: 'Vishnu Vardhan Burri - official candid lifestyle image with calm technical focus',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-09.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-09.jpg',
    alt: 'Vishnu Vardhan Burri - official outdoor candid image with simple leadership energy',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-10.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-10.jpg',
    alt: 'Vishnu Vardhan Burri - official travel lifestyle portrait with high-tech founder presence',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-11.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-11.jpg',
    alt: 'Vishnu Vardhan Burri - official personal travel image with simple lifestyle clarity',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-12.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-12.jpg',
    alt: 'Vishnu Vardhan Burri - official casual portrait with calm technical leadership',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-13.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-13.jpg',
    alt: 'Vishnu Vardhan Burri - official professional candid of a high-tech leader',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-14.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-14.jpg',
    alt: 'Vishnu Vardhan Burri - official personal portrait image with simple founder presence',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-15.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-15.jpg',
    alt: 'Vishnu Vardhan Burri - official outdoor personal portrait with focused leadership',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-16.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-16.jpg',
    alt: 'Vishnu Vardhan Burri - official square profile image with simple high-tech identity',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-17.jpeg',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-17.jpg',
    alt: 'Vishnu Vardhan Burri - official profile portrait of a backend systems leader',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-18.png',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-18.jpg',
    alt: 'Vishnu Vardhan Burri - official formal profile image with high-tech leadership presence',
  },
  {
    src: '/images/gallery/vishnu/vishnu-vardhan-burri-official-photo-2026-19.png',
    thumb: '/images/gallery/vishnu/thumbs/vishnu-vardhan-burri-official-photo-2026-19.jpg',
    alt: 'Vishnu Vardhan Burri - official studio style portrait with simple high-tech confidence',
  },
] as const;

export interface StoryMoment {
  id: string;
  title: string;
  date: string;
  image: { src: string; alt: string };
  tags: string[];
  lines: string[];
}

// Short, founder-friendly “moments” that pair images with story context.
// Edit these anytime to reflect the real story behind each photo.
export const STORY_MOMENTS: StoryMoment[] = [
  {
    id: 'moment-portrait',
    title: 'A Clean Headshot Day',
    date: 'May 2026',
    image: { src: '/images/gallery/vishnu/recent-photograph.png', alt: 'Vishnu Vardhan Burri - professional portrait' },
    tags: ['Profile', 'Clarity'],
    lines: [
      'A clean photo is a small thing, but it changes how people read your work.',
      'I like simple, sharp signals: clear identity, clear systems, clear outcomes.',
    ],
  },
  {
    id: 'moment-night',
    title: 'After A Late Release',
    date: 'May 2026',
    image: { src: '/images/gallery/vishnu/vishnu.jpeg', alt: 'Vishnu Vardhan Burri - night portrait under street lights' },
    tags: ['Shipping', 'Production'],
    lines: [
      'Shipping feels good when the backend is calm.',
      'The goal is not heroics. It is a system that keeps running without drama.',
    ],
  },
  {
    id: 'moment-founder-mode',
    title: 'Founder-Mode',
    date: 'May 2026',
    image: { src: '/images/gallery/vishnu/mine.jpeg', alt: 'Vishnu Vardhan Burri - suit portrait outdoors' },
    tags: ['Founder', 'Positioning'],
    lines: [
      'When a founder talks to customers, the backend has to keep its promises.',
      'I build foundations that make delivery feel predictable.',
    ],
  },
  {
    id: 'moment-01',
    title: 'A Quiet Reset',
    date: 'Jan 2026',
    image: { src: '/images/gallery/vishnu/whatsapp-2026-01-10.jpeg', alt: 'Vishnu Vardhan Burri - candid portrait holding coffee' },
    tags: ['Reset', 'Focus'],
    lines: [
      'Some days are for stepping back and thinking clearly.',
      'Good architecture is often decided before any code is written.',
    ],
  },
  {
    id: 'moment-02',
    title: 'A Simple Workday',
    date: 'Mar 2026',
    image: { src: '/images/gallery/vishnu/whatsapp-2026-03-05.jpeg', alt: 'Vishnu Vardhan Burri - headshot in a suit' },
    tags: ['Work', 'Consistency'],
    lines: [
      'Progress is usually quiet: one module, one boundary, one release at a time.',
      'Consistency beats intensity when you are building for real users.',
    ],
  },
  {
    id: 'moment-03',
    title: 'Building In The Real World',
    date: 'May 2026',
    image: { src: '/images/gallery/vishnu/whatsapp-2026-05-06-005541.jpeg', alt: 'Vishnu Vardhan Burri - outdoor candid sitting on a curb' },
    tags: ['Learning', 'Systems'],
    lines: [
      'I like learning in production conditions.',
      'That is where systems reveal what is real and what is fragile.',
    ],
  },
];

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  cover?: { src: string; alt: string; focus?: string };
  blocks: BlogBlock[];
}

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'code'; language?: string; code: string; caption?: string };

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "reliability-is-calm",
    title: "Reliability should feel calm",
    date: "May 2026",
    readTime: "3 min read",
    excerpt:
      "Founders should feel the backend getting calmer as the product grows, not louder. The best systems give teams fewer surprises, clearer signals, and simpler recovery paths.",
    tags: ["Reliability", "Backend", "Production"],
    cover: {
      src: "/images/gallery/vishnu/vishnu.jpeg",
      alt: "Vishnu Vardhan Burri after a late-night release",
      focus: "50% 35%",
    },
    blocks: [
      {
        type: 'p',
        text:
          "Founders usually feel backend pain as lost speed: releases slow down, bugs repeat, and nobody is fully sure what will happen under load. Reliability is not just an uptime number; it is confidence inside the team.",
      },
      {
        type: 'p',
        text:
          "My preference is to design simple service boundaries, clear logs, useful metrics, and fallback behavior before the system is under pressure. That work does not always look flashy, but it changes how teams respond when traffic spikes or something fails.",
      },
      {
        type: 'image',
        src: "/images/gallery/vishnu/whatsapp-2026-05-06-005541-1.jpeg",
        alt: "Vishnu working on a laptop in a classroom setup",
        caption: "Most stability work is quiet: one boundary, one release, one debug loop at a time.",
      },
      {
        type: 'p',
        text:
          "The real change I look for is simple: fewer unknowns, faster debugging, and production behavior that matches what the architecture promised.",
      },
    ],
  },
  {
    id: "simple-architecture-wins",
    title: "Why I prefer simple architecture",
    date: "May 2026",
    readTime: "2 min read",
    excerpt:
      "Founders do not win because the backend diagram looks clever. They win when the system is simple enough for the team to ship, debug, and scale.",
    tags: ["Architecture", "System Design", "Engineering"],
    cover: {
      src: "/images/gallery/vishnu/whatsapp-2026-01-10.jpeg",
      alt: "Vishnu Vardhan Burri taking a quiet reset with coffee",
      focus: "50% 30%",
    },
    blocks: [
      {
        type: 'p',
        text:
          "A complex design can look impressive in a diagram and still become a problem in production. I prefer proven patterns when the risk is high: queues with clear retry rules, databases with explicit ownership, and APIs that fail in known ways.",
      },
      {
        type: 'p',
        text:
          "That does not mean avoiding ambition. It means keeping the core easy to reason about so the system can grow without turning every change into a hidden dependency hunt.",
      },
      {
        type: 'code',
        language: 'text',
        caption: 'The question I use to filter architecture choices:',
        code:
          "Can the next engineer explain this failure mode in 30 seconds?\nIf not, the system will become expensive under pressure.",
      },
      {
        type: 'p',
        text:
          "What actually changes is delivery speed over time. Teams stop fighting the architecture and start using it as leverage.",
      },
    ],
  },
  {
    id: "experience-that-changed-my-work",
    title: "What experience changed in my work",
    date: "May 2026",
    readTime: "4 min read",
    excerpt:
      "My work since 2024 has pushed me toward stronger validation, better observability, and cleaner handoffs between founder goals and engineering reality.",
    tags: ["Experience", "Career", "Process"],
    cover: {
      src: "/images/gallery/vishnu/whatsapp-2026-03-05.jpeg",
      alt: "Vishnu Vardhan Burri headshot in a suit",
      focus: "50% 35%",
    },
    blocks: [
      {
        type: 'p',
        text:
          "Across internships, engineering roles, and founder work, the biggest lesson has been that code is only one part of the job. The deeper work is understanding what must not break for the business and then shaping the system around that truth.",
      },
      {
        type: 'p',
        text:
          "I now ask different questions at the beginning: What happens when this queue backs up? How will we know latency is getting worse? Which data must never be mixed? Who needs to debug this after me?",
      },
      {
        type: 'p',
        text:
          "That changed how I build. I prefer smaller releases, stronger contracts, better dashboards, and decisions that can be explained clearly to both technical and business teams.",
      },
    ],
  },
  {
    id: "postgres-slow-queries",
    title: "PostgreSQL slow queries: the founder-friendly fix",
    date: "May 2026",
    readTime: "4 min read",
    excerpt:
      "Slow queries are not just “database tuning.” They are a product tax: slower pages, slower releases, and higher cloud bills. The fix is a repeatable diagnosis loop.",
    tags: ["PostgreSQL", "Performance", "Databases"],
    cover: {
      src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Terminal output on a dark screen (database performance work)",
      focus: "50% 45%",
    },
    blocks: [
      {
        type: 'p',
        text:
          "The mistake I see most is guessing. The real approach is simple: measure the slow endpoints, capture the query shape, run EXPLAIN (ANALYZE, BUFFERS), and identify what is actually expensive: missing indexes, bad joins, N+1 patterns, or high lock contention.",
      },
      {
        type: 'code',
        language: 'sql',
        caption: 'The repeatable loop:',
        code:
          "EXPLAIN (ANALYZE, BUFFERS)\nSELECT ...\n\n-- then:\n-- 1) fix query shape\n-- 2) add the right index\n-- 3) verify again\n-- 4) only then consider caching",
      },
      {
        type: 'p',
        text:
          "Once you find the hot path, you fix it in order: query shape first, indexes second, and caching only when you can invalidate safely. If the schema ownership is unclear, performance will keep regressing, so I also put lightweight rules around who owns writes and what patterns are allowed.",
      },
      {
        type: 'p',
        text:
          "The founder outcome is not “a faster query.” It is a calmer system where performance stays predictable as usage grows.",
      },
    ],
  },
  {
    id: "zero-downtime-migrations",
    title: "Zero-downtime migrations without drama",
    date: "May 2026",
    readTime: "5 min read",
    excerpt:
      "Migrations are where startups lose trust. The safest migrations are staged, reversible, and validated with real checks before cutover.",
    tags: ["Migrations", "PostgreSQL", "Reliability"],
    cover: {
      src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1600",
      alt: "Engineer working during a migration window (server room)",
      focus: "50% 45%",
    },
    blocks: [
      {
        type: 'p',
        text:
          "I prefer a staged pattern: add new schema, dual-write when needed, backfill in controlled jobs, verify with queries, then cut over behind a flag. The key is to assume reality: production data is messy and traffic is unpredictable.",
      },
      {
        type: 'code',
        language: 'text',
        caption: 'Staged migration checklist:',
        code:
          "1) Add new schema (no cutover yet)\n2) Dual-write behind a flag (if needed)\n3) Backfill in idempotent jobs\n4) Verify with queries + counts\n5) Cut over\n6) Keep rollback path until stable",
      },
      {
        type: 'p',
        text:
          "The second key is rollback. Every step should have a way back that does not corrupt data. That means idempotent backfills, validation checkpoints, and explicit ownership rules for the new schema so the team doesn’t accidentally re-introduce the old behavior.",
      },
      {
        type: 'p',
        text:
          "The founder outcome is simple: releases stop being scary. You can evolve the data model without downtime and without praying on deploy day.",
      },
    ],
  },
  {
    id: "observability-that-works",
    title: "Observability that actually helps in production",
    date: "May 2026",
    readTime: "4 min read",
    excerpt:
      "Logs are not observability. Real observability is: you can answer “what is broken, why, and how bad” in minutes, not hours.",
    tags: ["Observability", "Reliability", "Production"],
    cover: {
      src: "/images/gallery/vishnu/whatsapp-2026-05-06-005542.jpeg",
      alt: "Vishnu Vardhan Burri speaking at a podium",
      focus: "50% 35%",
    },
    blocks: [
      {
        type: 'p',
        text:
          "My baseline is structured logs (not strings), correlation IDs across requests, a small set of dashboards that match user pain (latency, errors, saturation), and alert thresholds tied to impact rather than vanity metrics.",
      },
      {
        type: 'code',
        language: 'json',
        caption: 'A log that helps during an incident:',
        code:
          '{\n  \"event\": \"order_checkout_failed\",\n  \"request_id\": \"req_...\",\n  \"user_id\": \"u_...\",\n  \"latency_ms\": 842,\n  \"downstream\": \"payments\",\n  \"error\": \"timeout\",\n  \"retry\": true\n}',
      },
      {
        type: 'p',
        text:
          "If tracing exists, it should be actionable: show the slow span, show the downstream dependency, show the query that blew up. Otherwise, it becomes expensive noise that nobody trusts during an incident.",
      },
      {
        type: 'p',
        text:
          "The founder outcome is calmer production: fewer surprises, faster recovery, and confidence that the system is telling the truth.",
      },
    ],
  },
  {
    id: "api-contracts-that-scale",
    title: "API contracts that scale with the product",
    date: "May 2026",
    readTime: "4 min read",
    excerpt:
      "Most backend pain comes from unclear contracts. When APIs are explicit, validated, and idempotent, the team ships faster and breaks less.",
    tags: ["API Design", "System Design", "Backend"],
    cover: {
      src: "/images/gallery/vishnu/whatsapp-2026-05-06-005541.jpeg",
      alt: "Vishnu Vardhan Burri sitting outdoors (building in the real world)",
      focus: "50% 35%",
    },
    blocks: [
      {
        type: 'p',
        text:
          "The rules I like are boring: validate input at the boundary, return predictable error shapes, treat idempotency as default for write paths, and keep ownership clear so two services aren’t fighting over the same data.",
      },
      {
        type: 'code',
        language: 'http',
        caption: 'A founder-friendly contract:',
        code:
          "POST /v1/invoices\nIdempotency-Key: 9d8d...\n\n{ \"customer_id\": \"cus_...\", \"amount\": 19900 }\n\n# Response\n201 Created\n{ \"invoice_id\": \"inv_...\", \"status\": \"created\" }",
      },
      {
        type: 'p',
        text:
          "For founders, API work is leverage: it reduces regressions, reduces support load, and makes new features cheaper. It also makes onboarding faster because engineers can understand how the system behaves without reading every code path.",
      },
      {
        type: 'p',
        text:
          "The founder outcome is speed without chaos: you can scale features and traffic without the back end turning into a fragile maze.",
      },
    ],
  }
];
