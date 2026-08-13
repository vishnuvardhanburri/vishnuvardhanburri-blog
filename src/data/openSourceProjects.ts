export interface OpenSourceProject {
  id: string;
  name: string;
  securityDomain: string;
  badgeLevel: string;
  badgePercentage: string;
  badgeType: 'GOLD' | 'SILVER';
  description: string;
  tags: string[];
  githubUrl: string;
  openSsfUrl: string;
  problem: string;
  whatItDoes: string;
  securityModel: string;
  architectureOverview: string;
  keyCapabilities: string[];
  openSourceStatus: string;
  openSsfAchievement: string;
  futureDirection: string;
  architectureHighlights: string[];
}

export const OPEN_SOURCE_PROJECTS: OpenSourceProject[] = [
  {
    id: 'zk-proof-engine',
    name: 'zk-proof-engine',
    securityDomain: 'Zero-Knowledge Cryptography & Supply Chain Security',
    badgeLevel: 'GOLD',
    badgePercentage: '300%',
    badgeType: 'GOLD',
    description:
      'Zero-knowledge proof infrastructure and cryptographic verification engine designed for software supply-chain security, artifact integrity, on-chain registration, and CI/CD security enforcement.',
    tags: [
      'Zero-Knowledge Proofs',
      'Cryptographic Verification',
      'Software Supply-Chain Security',
      'Artifact Integrity',
      'On-Chain Verification',
      'CI/CD Enforcement',
    ],
    githubUrl: 'https://github.com/vishnuvardhanburri/zk-proof-engine',
    openSsfUrl: 'https://www.bestpractices.dev/en/projects/14033/passing',
    problem:
      'Modern software supply chains are highly vulnerable to artifact tampering, compromised build environments, unauthorized CI/CD pipeline modifications, and untrusted third-party release binaries.',
    whatItDoes:
      'Generates cryptographic zero-knowledge proofs certifying that binaries, containers, and build artifacts were produced cleanly by authorized pipelines without revealing internal build environment secrets or proprietary source code.',
    securityModel:
      'Cryptographic proof verification with default-deny security enforcement, zero-knowledge secret isolation, deterministic artifact hashing, and public verifiable attestations.',
    architectureOverview:
      'A modular, high-performance proof engine combining ZK circuit compilation, proof generation CLI tools, a lightweight verification gateway, and optional smart contract interfaces for on-chain registry verification.',
    keyCapabilities: [
      'ZK-SNARK build attestation generation',
      'Deterministic artifact SHA-256 hash binding',
      'Automated CI/CD security policy enforcement hooks',
      'On-chain smart contract verification gateway',
      'Tamper-proof audit logging for release builds',
    ],
    openSourceStatus: 'Fully open-source under Apache-2.0 / MIT license on GitHub.',
    openSsfAchievement:
      'Achieved OpenSSF Best Practices GOLD Badge with a 300% tiered score (100% Passing, 100% Silver, and 100% Gold criteria fulfilled).',
    futureDirection:
      'Expanding support for recursive ZK proofs, multi-cloud CI/CD pipeline integrations (GitHub Actions, GitLab CI), and hardware-bound attestation key support (HSM / TPM).',
    architectureHighlights: [
      'Zero-Knowledge Circuit Proof Generation',
      'On-Chain Registry & Attestation Contracts',
      'Deterministic CI/CD Pipeline Enforcement',
    ],
  },
  {
    id: 'PyWAF',
    name: 'PyWAF',
    securityDomain: 'Web Application Firewall & Application Security',
    badgeLevel: 'GOLD',
    badgePercentage: '300%',
    badgeType: 'GOLD',
    description:
      'Lightweight, high-performance Web Application Firewall and Flask middleware providing real-time threat detection, anomaly scoring, and automated mitigation for OWASP Top 10 web vulnerabilities.',
    tags: [
      'Web Application Firewall',
      'Flask Middleware',
      'Real-Time Threat Detection',
      'Application Security',
      'OWASP Protection',
      'Python Security',
    ],
    githubUrl: 'https://github.com/vishnuvardhanburri/Waf',
    openSsfUrl: 'https://www.bestpractices.dev/en/projects/14045',
    problem:
      'Web applications face continuous automated scanning, SQL injection attempts, cross-site scripting (XSS), command injection, and payload tampering that bypass default application framework controls.',
    whatItDoes:
      'Operates as low-latency Flask/Python WSGI middleware intercepting HTTP requests, inspecting payloads, computing anomaly scores, and blocking malicious traffic before it reaches business logic.',
    securityModel:
      'Layered inspection engine combining regex signature matching, payload sanitization, anomaly scoring, IP reputation tracking, rate-limiting, and adaptive threshold blocking.',
    architectureOverview:
      'Modular Python middleware with stream-based payload inspection, memory-efficient pattern matching engines, customizable security policy rules, and structured JSON security event telemetry.',
    keyCapabilities: [
      'Real-time SQLi, XSS, RCE, and Path Traversal filtering',
      'Adaptive request rate limiting & IP blacklisting/whitelisting',
      'Automated bot scanner pattern identification',
      'Structured JSON security event logging & metrics',
      'Zero-dependency runtime option for low latency',
    ],
    openSourceStatus: 'Fully open-source on GitHub.',
    openSsfAchievement:
      'Achieved OpenSSF Best Practices GOLD Badge with a 300% tiered score (100% Passing, 100% Silver, and 100% Gold criteria fulfilled).',
    futureDirection:
      'Adding ASGI / FastAPI async support, eBPF network-level packet filtering, and automated threat rule updates from threat intelligence feeds.',
    architectureHighlights: [
      'Low-Latency WSGI/Flask Threat Inspection',
      'Real-Time Anomaly Scoring Engine',
      'Structured JSON Security Event Telemetry',
    ],
  },
  {
    id: 'Sovereign-Shield',
    name: 'Sovereign-Shield',
    securityDomain: 'Human-Governed AI Security & Private AI Governance',
    badgeLevel: 'SILVER',
    badgePercentage: '283%',
    badgeType: 'SILVER',
    description:
      'Security governance framework and control layer for private AI deployments, ensuring human oversight, input/output sanitization, and strict compliance boundaries in regulated environments.',
    tags: [
      'Human-Governed AI',
      'Private AI Governance',
      'Regulated Security Controls',
      'Human Oversight',
      'AI Threat Hardening',
      'DevSecOps',
    ],
    githubUrl: 'https://github.com/vishnuvardhanburri/Sovereign-Shield',
    openSsfUrl: 'https://www.bestpractices.dev/en/projects/14046',
    problem:
      'Organizations deploying AI models in regulated enterprise domains face privacy leaks, prompt injection attacks, unmonitored decision-making, and lack of compliance audit trails.',
    whatItDoes:
      'Establishes a security control proxy for AI workloads featuring human-in-the-loop approval gates, data anonymization filters, prompt injection defenses, and auditable governance logs.',
    securityModel:
      'Policy-enforced security proxy requiring explicit human approval for high-risk AI decisions, data loss prevention (DLP) sanitization, and Zero-Trust model access controls.',
    architectureOverview:
      'Decoupled governance proxy routing LLM and model traffic through sanitization pipelines, policy evaluation engines, cryptographic audit loggers, and human intervention queues.',
    keyCapabilities: [
      'Human-in-the-loop approval workflows for sensitive AI actions',
      'Real-time prompt injection detection & response',
      'Automatic PII masking and data loss prevention (DLP)',
      'Role-based model access control and policy enforcement',
      'Compliance reporting metrics for SOC 2 and ISO 27001',
    ],
    openSourceStatus: 'Fully open-source framework on GitHub.',
    openSsfAchievement:
      'Achieved OpenSSF Best Practices SILVER Badge with a 283% tiered score (100% Passing and 100% Silver criteria fulfilled).',
    futureDirection:
      'Expanding automated compliance rule packs (SOC 2, ISO 27001, HIPAA), real-time output verification filters, and air-gapped enterprise deployment tooling.',
    architectureHighlights: [
      'Human-in-the-Loop AI Oversight Queue',
      'Prompt Injection & PII Data Loss Prevention',
      'Cryptographic Audit Logging & Compliance Metrics',
    ],
  },
];
