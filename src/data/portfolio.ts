import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Vishnu Vardhan Burri',
        title: 'Security Software Engineer & Backend SDE',
        subtitle: 'Designing High-Scale Backend Architecture & Production-AI Infrastructure',
        bio: 'Director & Principal Architect at Xavira Technologies | Designing High-Scale Backend Architecture & Production-AI Infrastructure for Venture-Backed Startups. I engineer high-throughput backend infrastructure, cryptographic verification engines, and zero-trust security layers for production environments.',
        avatar: '/about/vishnu-headshot-new.jpg',
        location: 'Global',
        email: 'vishnuvardhanburri@gmail.com',
        website: 'https://www.vishnuvardhanburri.in/',
        calLink: 'https://cal.com/vishnuvardhanburri/15min',
        languages: [
            { name: 'English', level: 'Fluent' },
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: 'https://github.com/vishnuvardhanburri',
                icon: 'github',
                username: 'vishnuvardhanburri',
            },
            {
                platform: 'LinkedIn',
                url: 'https://www.linkedin.com/in/vishnuvardhanburri/',
                icon: 'linkedin',
                username: 'Vishnu Vardhan Burri',
            },
            {
                platform: 'Portfolio',
                url: 'https://vishnuvardhanburri.info/',
                icon: 'globe',
                username: 'vishnuvardhanburri.info',
            }
        ]
    },
    projects: [
        {
            id: 'zk-proof-engine',
            slug: 'zk-proof-engine',
            title: 'zk-proof-engine',
            description: 'Zero-knowledge proof infrastructure and cryptographic verification engine designed for software supply-chain security and CI/CD security enforcement.',
            category: 'software',
            techStack: ['Zero-Knowledge', 'Cryptography', 'Supply Chain', 'TypeScript'],
            tools: ['ZKP', 'CI/CD'],
            thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri/zk-proof-engine',
            demoUrl: 'https://www.bestpractices.dev/en/users/54504',
            highlights: ['OpenSSF Best Practices GOLD Criteria', '300% Score']
        },
        {
            id: 'pywaf',
            slug: 'pywaf',
            title: 'PyWAF',
            description: 'Lightweight, high-performance Web Application Firewall and Flask middleware providing real-time threat detection and automated mitigation.',
            category: 'backend',
            techStack: ['WAF', 'Flask', 'Security', 'Python'],
            tools: ['Python', 'Web Firewall'],
            thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri/Waf',
            demoUrl: 'https://www.bestpractices.dev/en/users/54504',
            highlights: ['OpenSSF Best Practices GOLD Criteria', 'Low-Latency Inspection']
        },
        {
            id: 'quantum-security-fabric',
            slug: 'quantum-security-fabric',
            title: 'Quantum-Security-Fabric',
            description: 'Security governance framework and control layer for private AI deployments, ensuring human oversight and compliance boundaries.',
            category: 'AI Infrastructure',
            techStack: ['AI Security', 'Governance', 'DLP'],
            tools: ['Python', 'AI'],
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri/Quantum-Security-Fabric',
            demoUrl: 'https://www.bestpractices.dev/en/users/54504',
            highlights: ['OpenSSF Best Practices SILVER Criteria']
        },
        {
            id: 'log-based-threat-detection',
            slug: 'log-based-threat-detection',
            title: 'Log-Based Threat Detection System',
            description: 'A Python pipeline to process system logs and detect anomalous patterns, scaling to handle >5,000 system logs efficiently.',
            category: 'backend',
            techStack: ['Python', 'Pipeline', 'Threat Detection', 'Data Processing'],
            tools: ['Python'],
            thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri'
        },
        {
            id: 'cloud-monitoring-service',
            slug: 'cloud-monitoring-service',
            title: 'Cloud Monitoring Service',
            description: 'A containerized backend service to collect and expose application metrics via APIs for seamless observability.',
            category: 'cloud',
            techStack: ['Docker', 'APIs', 'Monitoring', 'Observability'],
            tools: ['Docker', 'Metrics'],
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri'
        },
        {
            id: 'geospatial-ai',
            slug: 'geospatial-ai',
            title: 'Geospatial AI Analysis Pipeline',
            description: 'AI-powered geospatial analysis platform. Detects and segments features from static Earth imagery, computes accurate areas and distances, and visualizes results on interactive maps using SAM and PostGIS.',
            category: 'AI Infrastructure',
            techStack: ['Python', 'PostGIS', 'Geospatial AI', 'SAM'],
            tools: ['PostGIS', 'AI'],
            thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri/Geospatial-AI-Analysis-Pipeline-SAM-PostGIS'
        },
        {
            id: 'weather-prediction',
            slug: 'weather-prediction',
            title: 'Live AIML Weather Prediction',
            description: 'Live Python AIML weather prediction app with forecasts, alerts, model confidence, explainability, mobile PWA, Docker, and Render deployment.',
            category: 'backend',
            techStack: ['Python', 'Docker', 'Machine Learning', 'PWA'],
            tools: ['Python', 'Docker'],
            thumbnail: 'https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri/Wheather-prediction'
        },
        {
            id: 'vardhan-quantum',
            slug: 'vardhan-quantum',
            title: 'Vardhan Quantum',
            description: 'High-performance quantum architecture and cryptographic primitives engineered in Rust.',
            category: 'software',
            techStack: ['Rust', 'Cryptography', 'Quantum'],
            tools: ['Rust'],
            thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop',
            status: 'completed',
            startDate: '2026-01-01',
            repoUrl: 'https://github.com/vishnuvardhanburri/vardhan-quantum'
        }
    ],
    experiences: [
        {
            id: 'xavira-technologies',
            company: 'XAVIRA Technologies',
            position: 'Founder, CEO & Principal Architect',
            description: 'Founded and lead XAVIRA Technologies — a premier Engineering Intelligence & Systems Architecture firm. Deliver production-grade distributed systems, independent technical audits, high-performance API architecture, and database scaling for venture-backed startups. Designed the Sovereign-Shield private AI governance framework and PyWAF open-source security tooling. Driving high-scale backend architecture and production-AI infrastructure across enterprise clients.',
            skills: ['Systems Architecture', 'Distributed Systems', 'AI Infrastructure', 'Security Engineering', 'Technical Audits', 'Database Scaling', 'API Design'],
            startDate: '2024',
            isOngoing: true,
            type: 'full-time',
            companyUrl: 'https://xaviratechlabs.com'
        },
        {
            id: 'toptal-sde',
            company: 'Toptal',
            position: 'Senior Software/Machine Learning Engineer (Freelance)',
            description: 'Top 3% Global Talent. Built and operated production ML systems and custom software solutions for clients with end-to-end ownership. Implemented evaluation frameworks and scalable Python backend services.',
            skills: ['Backend Systems', 'Python', 'ML Pipelines', 'RAG'],
            startDate: '2026',
            isOngoing: true,
            type: 'freelance'
        },
        {
            id: 'microsoft-mentorship',
            company: 'Microsoft',
            position: 'Machine Learning / Software Engineering Intern',
            description: 'Implemented Python-based software components with structured logging and metrics. Debugged issues by analyzing logs, stack traces, and performance indicators on cloud infrastructure.',
            skills: ['Python', 'Cloud Infrastructure', 'Production Engineering', 'Metrics'],
            startDate: '2025',
            endDate: '2025',
            isOngoing: false,
            type: 'internship'
        },
        {
            id: 'ripan-technologies',
            company: 'Ripan Technologies',
            position: 'Software Developer Intern',
            description: 'Implemented software services and optimized database queries and API logic, improving response time by 30%. Maintained backend services and resolved production issues during Agile sprints.',
            skills: ['API Development', 'Database Optimization', 'Agile', 'Backend Services'],
            startDate: '2024',
            endDate: '2024',
            isOngoing: false,
            type: 'internship'
        },
        {
            id: 'iiit-allahabad',
            company: 'IIIT Allahabad',
            position: 'Cybersecurity Intern (Faculty-Guided)',
            description: 'Conducted vulnerability assessment and penetration testing on web and Linux-based applications. Identified security flaws by intentionally breaking application flows and reported reproducible steps.',
            skills: ['Penetration Testing', 'Linux', 'Vulnerability Assessment'],
            startDate: '2023',
            endDate: '2024',
            isOngoing: false,
            type: 'internship'
        },
        {
            id: 'i4c',
            company: 'I4C, Ministry of Home Affairs',
            position: 'Research & Engineering Contributor',
            description: 'Contributed to applied ML and data-driven systems in a research-backed engineering environment focusing on cybersecurity and cyberforensics.',
            skills: ['Applied ML', 'Cybersecurity', 'Generative AI', 'Cyberforensics'],
            startDate: '2024',
            endDate: '2024',
            isOngoing: false,
            type: 'internship'
        }
    ],
    education: [],
    achievements: [
        {
            id: 'openssf-gold-zk',
            title: 'OpenSSF GOLD 300% - zk-proof-engine',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504',
            image: '/certificates/vishnu-cert-1.jpg'
        },
        {
            id: 'openssf-gold-pywaf',
            title: 'OpenSSF GOLD 300% - PyWAF',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504',
            image: '/certificates/vishnu-cert-2.jpg'
        },
        {
            id: 'openssf-silver-qsf',
            title: 'OpenSSF SILVER 283% - Quantum-Security-Fabric',
            issuer: 'Linux Foundation',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.bestpractices.dev/en/users/54504',
            image: '/certificates/vishnu-cert-3.jpg'
        },
        {
            id: 'toptal-sde',
            title: 'Toptal Verified SDE/ML Engineer (Top 3%)',
            issuer: 'Toptal',
            date: '2026',
            category: 'certification',
            credentialUrl: 'https://www.toptal.com',
            image: '/certificates/vishnu-cert-4.jpg'
        },
        {
            id: 'microsoft-ai',
            title: 'Microsoft AI Cloud Certified',
            issuer: 'Microsoft',
            date: '2025',
            category: 'certification',
            credentialUrl: 'https://microsoft.com',
            image: '/certificates/vishnu-cert-5.jpg'
        },
        {
            id: 'cybersecurity-vapt',
            title: 'Advanced Web & Linux VAPT',
            issuer: 'IIIT Allahabad',
            date: '2024',
            category: 'certification',
            credentialUrl: 'https://iiita.ac.in',
            image: '/certificates/vishnu-cert-6.jpg'
        }
    ],
    techStack: [],
    hardSkills: [
        { name: 'Python', category: 'backend', level: 'expert' },
        { name: 'Core Java', category: 'backend', level: 'expert' },
        { name: 'JavaScript', category: 'backend', level: 'advanced' },
        { name: 'Data Structures & Algorithms', category: 'backend', level: 'expert' },
        { name: 'Object-Oriented Design', category: 'backend', level: 'expert' },
        { name: 'Linux OS', category: 'software', level: 'advanced' },
        { name: 'Vulnerability Assessment', category: 'software', level: 'advanced' },
        { name: 'Penetration Testing', category: 'software', level: 'advanced' },
        { name: 'Ethical Hacking', category: 'software', level: 'intermediate' },
        { name: 'Cryptography', category: 'software', level: 'expert' },
        { name: 'MongoDB', category: 'cloud', level: 'expert' },
        { name: 'SQL & Indexing', category: 'cloud', level: 'advanced' },
        { name: 'Microsoft Azure', category: 'cloud', level: 'intermediate' },
        { name: 'Docker', category: 'cloud', level: 'advanced' },
        { name: 'CI/CD Pipelines', category: 'cloud', level: 'advanced' }
    ],
    softSkills: [],
    tools: [],
    faqs: [],
    blogs: [
        {
            id: '1',
            slug: 'zero-trust-architecture',
            title: 'Implementing Zero-Trust Architecture in High-Concurrency Systems',
            excerpt: 'How to build secure boundaries in Tier-1 infrastructure without sacrificing throughput.',
            content: '',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
            date: 'September 10, 2026',
            category: 'software',
            tags: ['Zero-Trust', 'Architecture', 'Backend'],
            author: { name: 'Vishnu Vardhan Burri', avatar: '/about/vishnu-headshot-new.jpg' },
            readTime: '5 min read'
        },
        {
            id: '2',
            slug: 'cryptographic-supply-chain',
            title: 'Securing the Software Supply Chain with Cryptographic Proofs',
            excerpt: 'Exploring the mechanics behind zk-proof-engine and deterministic verification.',
            content: '',
            image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop',
            date: 'August 24, 2026',
            category: 'Cryptography',
            tags: ['Zero-Knowledge', 'Supply Chain', 'OpenSSF'],
            author: { name: 'Vishnu Vardhan Burri', avatar: '/about/vishnu-headshot-new.jpg' },
            readTime: '8 min read'
        },
        {
            id: '3',
            slug: 'high-performance-waf',
            title: 'Building a High-Performance WAF in Python',
            excerpt: 'Lessons learned optimizing WSGI inspection loops for sub-millisecond latency.',
            content: '',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
            date: 'July 15, 2026',
            category: 'Engineering',
            tags: ['Python', 'WAF', 'Performance'],
            author: { name: 'Vishnu Vardhan Burri', avatar: '/about/vishnu-headshot-new.jpg' },
            readTime: '6 min read'
        }
    ],
    gallery: [
        {
            id: 'gallery-1',
            title: 'Vishnu Vardhan Burri',
            description: 'Security Software Engineer',
            date: '2026',
            type: 'image',
            url: '/gallery/vishnu-gallery-1.jpg',
            category: 'Personal'
        },
        {
            id: 'gallery-2',
            title: 'Vishnu Vardhan Burri',
            description: 'Backend Systems Architect',
            date: '2026',
            type: 'image',
            url: '/gallery/vishnu-gallery-2.jpg',
            category: 'Personal'
        }
    ]

};
