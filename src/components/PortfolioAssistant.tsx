import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BriefcaseBusiness, Command, ExternalLink, MessageSquare, Send, Sparkles, Terminal, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS, CASE_STUDIES, CREDIBILITY_SIGNALS, XAVIRA_PRINCIPLES } from '@/src/constants';
import {
  applyEmailAnswer,
  applyProductAnswer,
  applyStackAnswer,
  applySymptomsAnswer,
  applyTimelineBudgetAnswer,
  buildContactPayload,
  buildSummaryText,
  createEmptyIntake,
  getStepLabel,
  getStepPrompt,
  shouldTriggerIntake,
  type IntakeBudget,
  type IntakeState,
  type IntakeTimeline,
} from '@/src/components/assistant/intake';
import { saveContactPrefill } from '@/src/lib/intakePrefill';

type Message = {
  role: 'visitor' | 'assistant';
  content: string;
};

type Topic = {
  id: string;
  keywords: string[];
  reply: string;
};

const ASSISTANT_NAME = 'VeeScout';
const ASSISTANT_TAGLINE = "Vishnu's site guide + product problem scout";

const SUGGESTIONS = [
  'Who is Vishnu?',
  'AI vs Vishnu',
  'What is Xavira Control Stack?',
  'Am I a fit for Xavira?',
  'Find my product problem',
  'Pricing policy',
  'What info should I share?',
  'How can Xavira help me?',
];

const founderProof = CASE_STUDIES.map(study => `${study.title}: ${study.description}`).join(' ');
const blogSummary = BLOG_POSTS.map(post => `${post.title}: ${post.excerpt}`).join(' ');
const credibilitySummary = CREDIBILITY_SIGNALS.map(signal => `${signal.label}: ${signal.value}`).join('. ');
const xaviraSummary = XAVIRA_PRINCIPLES.join(', ');

const TOPICS: Topic[] = [
  {
    id: 'assistant-identity',
    keywords: ['who are you', 'what are you', 'your name', 'assistant name', 'veescout', 'vee scout', 'vishnu assistant', 'vishnu trainer', 'vishnutariner', 'trainer assistant', 'problem solver assistant'],
    reply:
      `I am ${ASSISTANT_NAME}, ${ASSISTANT_TAGLINE}. I help visitors understand Vishnu better, suggest useful next questions, and collect the right client context so Vishnu or Xavira can find the real product, backend, automation, or AI workflow problem faster.`,
  },
  {
    id: 'identity',
    keywords: ['who is he', 'who is vishnu', 'tell me about him', 'tel me about him', 'about him', 'about vishnu', 'who vishnu', 'his profile'],
    reply:
      'Vishnu Vardhan Burri is a backend and systems-focused software engineer, founder of Xavira Tech Labs, and a B.Tech CSE Cybersecurity student at The Apollo University. His strongest story is simple: he helps founders turn fragile product infrastructure into cleaner APIs, safer data flows, observable systems, and backend foundations that can actually support growth. Next, ask me “Can he diagnose my product?” if you want the problem-solving angle.',
  },
  {
    id: 'product-diagnosis',
    keywords: ['find the problem', 'find problem', 'problem in my product', 'product problem', 'diagnose', 'audit', 'review my product', 'what is wrong', 'bugs', 'not working', 'unstable', 'breaking', 'failure', 'risk', 'solve my problem', 'problem solve', 'prorb', 'prob'],
    reply:
      'Yes. Vishnu can help find what is actually wrong in a product, not just patch symptoms. I can start by collecting your context: what the product does, what is breaking or slow, current stack, user volume, error patterns, urgency, and the business goal. Then Vishnu can turn it into a clear problem map: urgent fixes, architectural debt, quick wins, and deeper rebuild areas.',
  },
  {
    id: 'ai-vs-engineer',
    keywords: [
      'difference me and ai',
      'difference between you and ai',
      'ai vs you',
      'ai vs vishnu',
      'ai vs engineer',
      'difference ai and vishnu',
      'why not ai',
      'why hire you',
      'why hire a human',
    ],
    reply:
      'AI is a tool. Vishnu is the engineer accountable for the outcome.\n\nAI can: generate drafts, speed up iteration, and help with research.\n\nVishnu delivers what founders pay for:\n- Judgment: the right boundary, the right tradeoff, what not to ship.\n- Production safety: validation, idempotency, rollback paths, observability.\n- Security + trust boundaries: auth, RBAC, abuse controls, auditability.\n- Ownership: shipping end-to-end and standing behind the result.\n\nIf you share your stack + the pain, I can suggest the smallest engagement that gets you clarity fast.',
  },
  {
    id: 'client-intake',
    keywords: ['client info', 'take client info', 'take clients info', 'collect info', 'collect details', 'what info', 'what should i share', 'what details', 'requirements', 'requirement', 'brief', 'project details', 'approaching', 'visitor info', 'lead', 'client'],
    reply:
      'Share these details and I will help shape them into a clean problem brief: product name or link, what users do inside it, the main pain, what is slow or failing, current tech stack, deadline, budget range if comfortable, and what success should look like after Vishnu helps.',
  },
  {
    id: 'suggest-next',
    keywords: ['suggest', 'what next', 'next step', 'guide me', 'help me decide', 'where start', 'start', 'train', 'model'],
    reply:
      'Start with one of these: ask “Who is Vishnu?” if you are evaluating him, ask “Find my product problem” if you have a live issue, ask “What info should I share?” if you want to become a serious lead, or ask “How can Xavira help me?” if you want the company angle.',
  },
  {
    id: 'founder-fit',
    keywords: ['founder', 'startup', 'business', 'trust', 'why hire', 'why should', 'investor', 'product', 'credible', 'incredible'],
    reply:
      `For founders, Vishnu is useful because he thinks beyond tickets. He looks at the product pressure behind the backend: slow releases, fragile APIs, unclear ownership, scale risk, cloud cost, and production surprises. The trust signals are strong: ${credibilitySummary}. His strength is turning pressure into clean architecture, visible systems, and a backend that lets the product move faster. Next, share what is currently painful in your product and I will help frame it.`,
  },
  {
    id: 'scale',
    keywords: ['scale', 'traffic', 'growth', 'latency', 'performance', 'slow', 'bottleneck', 'requests', '50k'],
    reply:
      'Vishnu can help when growth starts exposing backend problems. He works around API design, service boundaries, cloud infrastructure, data flow, observability, and reliability habits. The goal is not just “make it faster”; it is making the system easier to reason about while it handles more users. Useful next info: current traffic, slow page/API, stack, and when the issue started.',
  },
  {
    id: 'proof',
    keywords: ['proof', 'case', 'study', 'project', 'work', 'portfolio', 'examples', 'built', 'linkedin', 'github', 'apollo'],
    reply: `Proof lives in four places: Apollo's public Toptal recognition, LinkedIn/GitHub presence, Xavira Tech Labs, and the selected project architecture. Project areas include: ${founderProof}`,
  },
  {
    id: 'experience',
    keywords: ['experience', 'years', 'microsoft', 'toptal', 'xavira', 'i4c', 'career', 'worked', 'apollo', 'student', 'university', 'education'],
    reply:
      'Vishnu has 2+ years across backend, platform, security, and product work. He is a B.Tech CSE Cybersecurity student at The Apollo University, was publicly recognized for entering Toptal’s Top 3% global network while still a student, founded Xavira Tech Labs, and has worked across large-team engineering and cyber-forensics contexts. That mix matters because founders need someone who understands both building and operational responsibility.',
  },
  {
    id: 'stack',
    keywords: ['stack', 'tech', 'technology', 'tools', 'language', 'go', 'java', 'kubernetes', 'aws', 'database'],
    reply:
      'His core stack is backend and platform heavy: Go, Java, Kubernetes, Docker, AWS, PostgreSQL, Redis, Kafka, Terraform, observability tooling, APIs, distributed services, and cloud delivery. He chooses tools for reliability and maintainability, not just trend value.',
  },
  {
    id: 'services',
    keywords: ['service', 'help', 'build', 'fix', 'mvp', 'api', 'backend', 'cloud', 'devops', 'saas'],
    reply:
      `Vishnu is strongest where founders need backend clarity: designing APIs, improving reliability, cleaning messy services, setting up cloud infrastructure, building SaaS backends, AI guardrail orchestration, automation workflows, observability, and preparing systems for scale. Xavira's principles are: ${xaviraSummary}.`,
  },
  {
    id: 'vishnu-vs-xavira',
    keywords: [
      'difference between vishnu and xavira',
      'difference vishnu and xavira',
      'differnce bettween vishnu and xavira',
      'vishnu and xavira',
      'vishnu vs xavira',
      'xavira vs vishnu',
      'vishnu vs xavira tech labs',
      'xavira tech labs vs vishnu',
    ],
    reply:
      'Vishnu is the engineer (the person) who does the thinking, architecture, and delivery.\n\nXavira Tech Labs is the firm he runs (the operating wrapper): it is how the work is packaged for founders as a clear engagement, scope, and delivery process. Most of the time, you are still working directly with Vishnu, but “Xavira” represents the way he executes: production-first, reliability-focused, and outcomes over demos.\n\nIf you tell me what you are building + what is breaking, I can recommend whether you need a quick audit with Vishnu, or a larger Xavira-style delivery sprint.',
  },
  {
    id: 'xavira',
    keywords: ['what is xavira', 'how xavira', 'xavira help', 'xavira tech labs', 'xavira', 'company', 'firm', 'agency', 'labs', 'legacy', 'stabilization', 'guardrails'],
    reply:
      'Xavira Tech Labs can help when your product has backend confusion, unstable features, weak automation, messy integrations, or AI workflows that need guardrails. The work usually starts by finding the real failure points, then stabilizing APIs, data flows, deployments, validations, observability, and automation. To move forward, share your product link, current stack, and the issue hurting users or growth.',
  },
  {
    id: 'xavira-control-stack',
    keywords: [
      'xavira control stack',
      'sovereign engine',
      'sovereign shield',
      'xavira ai assistant',
      'communication operations',
      'ai governance platform',
      'enterprise infrastructure',
      'license xavira',
      'white label',
      'internal license',
      'buyer guide',
      'for buyers',
    ],
    reply:
      'Xavira Control Stack is the enterprise product layer built by Vishnu through Xavira Tech Labs. It combines Sovereign Engine for communication operations, reputation intelligence, monitoring, and governance with Sovereign Shield for private AI governance, compliance controls, auditability, security, and operational visibility. It is built for outbound agencies, RevOps teams, AI/cybersecurity consultancies, SaaS companies, managed service providers, and enterprise operators who need infrastructure ownership instead of depending only on third-party SaaS tools. Commercial paths are internal license (£40,000), white label (£160,000), and maintenance (£3k/mo). The Xavira page has playable demos and an Executive Proof Brief PDF for buyer review. Best next step: book a call or request licensing information from the Xavira page.',
  },
  {
    id: 'xavira-fit',
    keywords: [
      'is xavira fit',
      'should we buy',
      'who is it for',
      'what problems solve',
      'deliverability governance',
      'reputation monitoring',
      'auditability',
      'compliance oversight',
      'workflow intelligence',
      'infrastructure control',
    ],
    reply:
      'Xavira Control Stack is likely relevant if you operate outbound communication systems, manage multiple domains/providers/channels, need governance and operational visibility, are exploring secure AI adoption, require auditability/compliance controls, or want to commercialize infrastructure services. It solves visibility, reputation monitoring, deliverability governance, AI governance, auditability, compliance oversight, workflow intelligence, and infrastructure control. If several of those match your organization, a call is worthwhile.',
  },
  {
    id: 'projects-real',
    keywords: ['voice', 'booking', 'receptionist', 'vault', 'stealth', 'legal', 'ocr', 'pdf', 'saas platform', 'deployment'],
    reply:
      'Selected project areas include a production-ready business web platform, AI voice receptionist and booking pipeline, Stealth Vault for localized data protection, and a legal intake workflow automation engine using OCR/PDF/ETL patterns. The common thread: unpredictable inputs, strong validation, structured outputs, and systems that founders can trust.',
  },
  {
    id: 'ai',
    keywords: ['ai', 'llm', 'chatbot', 'agent', 'agents', 'rag', 'retrieval', 'openai', 'gpt', 'claude', 'automation', 'ai tools', 'cursor'],
    reply:
      'Vishnu works with AI when it creates real leverage for the product: faster support, automation, document pipelines, search/RAG, voice workflows, and internal tooling. The difference is production safety. He does not ship “AI demos” that break. He ships systems with validation, auditability, observability, and deterministic fallback behavior so the product stays correct even when models are wrong.',
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'hire', 'call', 'book', 'cal', 'linkedin', 'github', 'toptal', 'reach'],
    reply:
      'Best next step: use the Book page if you want to schedule directly, or use the Contact page if you want to send context first. Share the product, current stack, what is breaking or slowing you down, timeline, and what success looks like. You can also use LinkedIn, GitHub, Toptal, Cal.com, or email: hello@vishnulabs.com.',
  },
  {
    id: 'official-presence',
    keywords: ['vishnu vardhan burri', 'vishnu vardhan', 'vishnu burri', 'burri vishnu', 'vishnu v burri', 'vishnuvardhanburri', 'official presence', 'photos', 'google images', 'search presence', 'online presence'],
    reply:
      'Officially, the identity to use is Vishnu Vardhan Burri. Search aliases include Vishnu, Vishnu Vardhan, Vishnu Burri, Burri Vishnu, Vishnu V Burri, and vishnuvardhanburri. The best source pages are /about-vishnu-vardhan-burri and /presence, which connect his website, LinkedIn, GitHub, Toptal profile, Xavira Tech Labs, and official photo gallery. For images, the Gallery and Presence pages contain the official photo set with SEO-friendly filenames, alt text, and sitemap entries.',
  },
  {
    id: 'backend-authority',
    keywords: ['backend systems engineer', 'backend engineer', 'api architect', 'api architecture consultant', 'distributed systems engineer', 'production systems consultant', 'cloud infrastructure consultant', 'reliability engineer'],
    reply:
      'Vishnu is positioned as a backend systems engineer for production-critical work: API architecture, PostgreSQL, migrations, payment safety, observability, cloud releases, rollback paths, and reliability under load. The dedicated page /backend-systems-engineer explains the work in a CTO-friendly way with outcomes and case-study links.',
  },
  {
    id: 'ai-infra-authority',
    keywords: ['ai infrastructure engineer', 'rag engineer', 'ai governance', 'llm infrastructure', 'ai guardrails', 'ai observability', 'production ai', 'ai workflow automation'],
    reply:
      'Vishnu treats AI as infrastructure, not decoration. His AI work focuses on RAG, retrieval, validation, guardrails, auditability, fallback behavior, workflow automation, and observability. The dedicated page /ai-infrastructure-engineer explains the difference between AI tools and accountable AI systems engineering.',
  },
  {
    id: 'blog',
    keywords: ['blog', 'notes', 'writing', 'belief', 'prefer', 'philosophy', 'think'],
    reply: `The blog explains how Vishnu thinks: reliability should feel calm, simple architecture wins, and experience changed how he builds. ${blogSummary}`,
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'rate', 'cost', 'budget', 'charge', 'expensive', 'why premium', 'why costly', 'tool cost', 'api cost'],
    reply:
      'Pricing stays premium because the buyer is paying for ownership, reliability, and accountable engineering, not just tool access. For Xavira Control Stack, the internal license is £40,000, white label is £160,000, and maintenance is £3k/mo. The reason is simple: many organizations spend serious money across separate tools, APIs, dashboards, monitoring, governance, and custom glue. Xavira is built as a controlled system that reduces scattered dependency and gives the buyer an infrastructure layer they can operate. Low-price bargaining is not accepted, but scope can be reduced if someone wants a smaller starting point.',
  },
  {
    id: 'pricing-policy',
    keywords: ['pricing policy', 'pricing rules', 'no bargain', 'no bargaining', 'no discount', 'no discounts', 'fixed price', 'firm price'],
    reply:
      'Pricing is scope-based and kept firm. Vishnu doesn’t negotiate discounts. If budget is tight, the right move is to reduce scope: start with a short audit, ship the highest-impact fix first, then stage the rest.',
  },
  {
    id: 'negotiation',
    keywords: [
      'discount',
      'negotiate',
      'negotiation',
      'bargain',
      'low price',
      'cheap',
      'reduce price',
      'lower price',
      'best price',
      'final price',
      'less money',
      'too expensive',
    ],
    reply:
      'Vishnu keeps rates firm and doesn’t negotiate discounts. Rates are scope-based and tied to responsibility: correctness, safety, and delivery under pressure. If you need a lower total cost, the move is to reduce scope or start with a short audit. Share your budget range and the pain, and I’ll suggest the smallest engagement that still produces real clarity.',
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'timezone', 'remote', 'location', 'india', 'utc'],
    reply:
      'Vishnu works remotely from UTC+5:30 and is open to backend, platform, SaaS, API, and reliability-focused work. The site is built for founders and teams who want serious engineering help without backend chaos.',
  },
  {
    id: 'personality',
    keywords: ['incredible', 'good', 'best', 'style', 'person', 'who is vishnu', 'about'],
    reply:
      'Vishnu comes across as a builder who cares about trust. The signal is not only “I can code”; it is “I can understand the pressure, simplify the system, and help the team move with confidence.” That is the story this website is designed to tell.',
  },
];

function normalize(input: string) {
  return input.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function isGreeting(text: string) {
  return ['hi', 'hello', 'hey', 'yo', 'namaste', 'sup'].some(word => text === word || text.startsWith(`${word} `));
}

function isThanks(text: string) {
  return ['thanks', 'thank you', 'ty', 'cool', 'great', 'nice'].some(word => text.includes(word));
}

function isFarewell(text: string) {
  return [
    'bye',
    'goodbye',
    'see you',
    'cya',
    'talk later',
    'catch you later',
    'ok bye',
    'gn',
    'good night',
    'goodnight',
  ].some(phrase => text === phrase || text.includes(phrase));
}

function isSoftAcknowledgement(text: string) {
  return ['hmm', 'hm', 'okay', 'ok', 'oh', 'alright', 'fine'].some(word => text === word);
}

function isWellBeingQuestion(text: string) {
  return [
    'how are you',
    'how r u',
    'how ru',
    'how are u',
    'how you',
    'hru',
    'how is it going',
    'whats up',
    'what up',
  ].some(phrase => text === phrase || text.includes(phrase));
}

function isLikelyClientContext(text: string) {
  return (
    text.length > 80 ||
    text.includes('http') ||
    text.includes('@') ||
    ['my app', 'my product', 'my startup', 'we have', 'we are building', 'users', 'customers', 'dashboard', 'api', 'backend', 'database'].some(phrase => text.includes(phrase))
  );
}

function isSharedClientContext(text: string) {
  return (
    text.includes('http') ||
    text.includes('@') ||
    ['my app', 'my product has', 'my startup has', 'we have', 'we are building', 'users are', 'customers are'].some(phrase => text.includes(phrase))
  );
}

function scoreTopic(text: string, topic: Topic) {
  return topic.keywords.reduce((score, keyword) => {
    if (text.includes(keyword)) return score + (keyword.includes(' ') ? 3 : 1);
    return score;
  }, 0);
}

function getPortfolioReply(input: string) {
  const text = normalize(input);

  if (!text) return 'Ask me about Vishnu, Xavira, product diagnosis, backend scale, proof of work, stack, experience, pricing, or contact.';
  if (isGreeting(text)) {
    return `Hey hi, I hope you are doing great and having a productive week. I am ${ASSISTANT_NAME}. I help visitors and people approaching Vishnu understand him in a better way, see his work clearly, and figure out how their product problem can be solved. Try asking “Who is Vishnu?”, “Find my product problem”, or “What info should I share?”`;
  }
  if (isWellBeingQuestion(text)) {
    return `I am doing well. Hope your week is productive too. I am here as ${ASSISTANT_NAME}, so you can ask me who Vishnu is, how Xavira can help, whether he can diagnose your product, what proof he has, or how to contact him.`;
  }
  if (isThanks(text)) {
    return 'Anytime. If you are evaluating Vishnu for work, the strongest next question is usually: what backend risk are you trying to remove?';
  }
  if (isFarewell(text)) {
    return 'Bye, have a good day. Whenever you come back, I can help you understand Vishnu, compare AI tools vs real engineering ownership, or turn your product issue into a clear brief for him.';
  }
  if (isSoftAcknowledgement(text)) {
    return 'No pressure. If you want to continue, the easiest next question is “Who is Vishnu?” or “Can Vishnu find the problem in my product?”';
  }
  if (isSharedClientContext(text)) {
    return 'Got it. This sounds like client/product context. I would prepare it for Vishnu like this: what the product does, what is hurting users or growth, where the system feels slow or unstable, what stack you use, what logs/errors you have, and what outcome you need. Next, add the product link, stack, deadline, and the one problem you want solved first.';
  }

  const ranked = TOPICS
    .map(topic => ({ topic, score: scoreTopic(text, topic) }))
    .sort((a, b) => b.score - a.score);

  if (ranked[0]?.score > 0) return ranked[0].topic.reply;

  if (isLikelyClientContext(text)) {
    return 'Got it. This sounds like client/product context. I would prepare it for Vishnu like this: what the product does, what is hurting users or growth, where the system feels slow or unstable, what stack you use, what logs/errors you have, and what outcome you need. Next, add the product link, stack, deadline, and the one problem you want solved first.';
  }

  return 'I can help you understand Vishnu, Xavira Tech Labs, founder fit, backend scale, architecture, stack, proof, pricing, contact paths, and product problems. Try asking: “Who is Vishnu?”, “Can he find the problem in my product?”, or “How can Xavira help me?”';
}

function shouldAskRemoteAssistant(input: string, localReply: string) {
  const text = normalize(input);
  if (!text || isGreeting(text) || isWellBeingQuestion(text) || isThanks(text) || isFarewell(text) || isSoftAcknowledgement(text)) return false;
  if (shouldTriggerIntake(text) || isSharedClientContext(text)) return false;

  return (
    localReply.startsWith('I can help you understand Vishnu') ||
    localReply.startsWith('Got it. This sounds like client/product context')
  );
}

async function getHybridReply(input: string) {
  const localReply = getPortfolioReply(input);
  if (!shouldAskRemoteAssistant(input, localReply)) return localReply;

  try {
    const resp = await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    if (!resp.ok) return localReply;
    const json = await resp.json();
    return String(json?.reply || localReply);
  } catch {
    return localReply;
  }
}

export function PortfolioAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const assistantLoadedAtRef = useRef(Date.now());
  const [intake, setIntake] = useState<IntakeState | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        `Hey hi, I hope you are doing great and having a productive week. I am ${ASSISTANT_NAME}. I help visitors and people approaching Vishnu get to know him in a better way, understand his work, and see how he can help solve the real problem inside their product, backend, automation, or AI workflow.`,
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentTime = useMemo(
    () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    [messages.length]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, intake?.step]);

  const sendMessage = async (value: string) => {
    const text = value.trim();
    if (!text) return;

    // Start intake if intent appears.
    if (!intake && (text === 'Find my product problem' || shouldTriggerIntake(text))) {
      const next = createEmptyIntake();
      setIntake(next);
      setMessages((prev) => {
        return [
          ...prev,
          { role: 'visitor', content: text },
          {
            role: 'assistant',
            content: `Got it. I’ll collect the 5 things Vishnu needs to spot the real issue. ${getStepPrompt(next.step)}`,
          },
        ];
      });
      setInput('');
      return;
    }

    // Intake step routing (text answers).
    if (intake && intake.step !== 'summary') {
      if (intake.step === 'timeline_budget') {
        setMessages((prev) => [
          ...prev,
          { role: 'visitor', content: text },
          { role: 'assistant', content: 'Use the timeline and budget controls below, then hit Continue.' },
        ]);
        setInput('');
        return;
      }

      let updated = intake;
      if (intake.step === 'product') updated = applyProductAnswer(intake, text);
      else if (intake.step === 'symptoms') updated = applySymptomsAnswer(intake, text);
      else if (intake.step === 'stack') updated = applyStackAnswer(intake, text);
      else if (intake.step === 'email') updated = applyEmailAnswer(intake, text);

      const assistantReply =
        updated.step === 'timeline_budget'
          ? getStepPrompt('timeline_budget')
          : updated.step === 'email'
            ? getStepPrompt('email')
            : updated.step === 'summary'
              ? `Summary ready.\n\n${buildSummaryText(updated.data)}\n\nUse “Send to Vishnu” below.`
              : getStepPrompt(updated.step);

      setIntake(updated);
      setMessages((prev) => [
        ...prev,
        { role: 'visitor', content: text },
        { role: 'assistant', content: assistantReply },
      ]);

      setInput('');
      return;
    }

    // Default chat behavior.
    setIsThinking(true);
    const assistantReply = await getHybridReply(text);
    setMessages((prev) => [
      ...prev,
      { role: 'visitor', content: text },
      { role: 'assistant', content: assistantReply },
    ]);
    setIsThinking(false);
    setInput('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    sendMessage(input);
  };

  const continueTimelineBudget = () => {
    if (!intake || intake.step !== 'timeline_budget') return;
    if (!intake.data.timeline) return;
    const next = applyTimelineBudgetAnswer(intake, {
      timeline: intake.data.timeline,
      budget: intake.data.budget,
    });
    setIntake(next);
    setMessages((prev) => [...prev, { role: 'assistant', content: getStepPrompt(next.step) }]);
  };

  const editIntake = () => {
    const next = createEmptyIntake();
    setIntake(next);
    setMessages((prev) => [...prev, { role: 'assistant', content: `No problem. ${getStepPrompt(next.step)}` }]);
  };

  const sendIntakeBrief = async () => {
    if (!intake || intake.step !== 'summary') return;

    const current = intake;
    setIntake({ ...current, sendState: 'sending' });

    try {
      const meta = { loadedAt: assistantLoadedAtRef.current, submittedAt: Date.now() };
      const payload = buildContactPayload(current.data, meta);
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) throw new Error('send_failed');

      setIntake((prev) => (prev ? { ...prev, sendState: 'sent' } : prev));
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sent. Vishnu will reply soon.' }]);
    } catch {
      saveContactPrefill({
        name: current.data.name || 'Visitor',
        email: current.data.email,
        company: current.data.company || 'Project',
        productUrl: current.data.productUrl,
        timeline: current.data.timeline,
        budget: current.data.budget,
        stack: current.data.stack,
        message: `VeeScout Intake Brief\n\n${buildSummaryText(current.data)}\n\n---\nRaw symptoms:\n${current.data.symptoms}`,
      });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Could not send automatically. Opening Contact with your brief prefilled.' },
      ]);
      navigate('/contact');
      setIntake((prev) => (prev ? { ...prev, sendState: 'error' } : prev));
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="group fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-blue-600 text-white shadow-[0_0_42px_rgba(37,99,235,0.38)] transition-colors hover:bg-blue-500 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16 sm:rounded-2xl"
        aria-label="Open founder assistant"
      >
        <div className="absolute inset-0 translate-y-full bg-gradient-to-br from-white/20 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
        <MessageSquare className="relative z-10" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-white sm:right-2 sm:top-2" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.98 }}
            className="fixed inset-x-3 bottom-[4.75rem] z-50 flex h-[650px] max-h-[calc(100vh-6rem)] min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_40px_100px_rgba(0,0,0,0.8)] sm:inset-x-auto sm:bottom-28 sm:right-8 sm:w-[450px] sm:max-w-[95vw] sm:rounded-3xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-zinc-900/40 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                  <BriefcaseBusiness size={20} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="max-w-[220px] text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-white sm:max-w-none sm:text-[11px]">
                    {ASSISTANT_NAME}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[9px] uppercase text-zinc-500">{ASSISTANT_TAGLINE}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition-all hover:bg-zinc-800 hover:text-white"
                aria-label="Close founder assistant"
              >
                <X size={20} />
              </button>
            </div>

            <div className="assistant-scroll-x flex shrink-0 gap-3 overflow-x-auto border-b border-white/5 bg-black/40 px-5 py-3">
              {SUGGESTIONS.map(suggestion => (
                <button
                  key={suggestion}
                onClick={() => sendMessage(suggestion)}
                  disabled={isThinking}
                  className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 transition-all hover:border-blue-500/50 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}

              {isThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-start"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="font-mono text-[8px] uppercase text-zinc-600">Assistant // {currentTime}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-none border border-white/10 bg-zinc-900/80 p-4 font-mono text-[12px] leading-relaxed text-zinc-400 shadow-xl">
                    Thinking through the site context...
                  </div>
                </motion.div>
              )}
            </div>

            <div
              ref={scrollRef}
              className="assistant-scroll min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain p-4 sm:p-6"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${message.role === 'visitor' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`mb-2 flex items-center gap-2 ${message.role === 'visitor' ? 'flex-row-reverse' : ''}`}>
                    <span className="font-mono text-[8px] uppercase text-zinc-600">
                      {message.role === 'visitor' ? 'Visitor' : 'Assistant'} // {currentTime}
                    </span>
                    <span className={`h-1.5 w-1.5 rounded-full ${message.role === 'visitor' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                  </div>
                  <div className={`max-w-[90%] rounded-2xl p-4 text-[12px] leading-relaxed shadow-xl ${
                    message.role === 'visitor'
                      ? 'rounded-tr-none bg-blue-600 text-white'
                      : 'rounded-tl-none border border-white/10 bg-zinc-900/80 font-mono text-zinc-200'
                  }`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {intake?.step === 'timeline_budget' && (
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500">
                    {getStepLabel('timeline_budget')}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <select
                      value={intake.data.timeline}
                      aria-label="Timeline"
                      onChange={(e) =>
                        setIntake((prev) =>
                          prev
                            ? { ...prev, data: { ...prev.data, timeline: e.target.value as IntakeTimeline } }
                            : prev,
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white"
                    >
                      <option value="">Timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="2-4 weeks">2-4 weeks</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="Not sure">Not sure</option>
                    </select>

                    <select
                      value={intake.data.budget}
                      aria-label="Budget (optional)"
                      onChange={(e) =>
                        setIntake((prev) =>
                          prev ? { ...prev, data: { ...prev.data, budget: e.target.value as IntakeBudget } } : prev,
                        )
                      }
                      className="w-full rounded-xl border border-white/10 bg-black px-3 py-2 text-sm text-white"
                    >
                      <option value="">Budget (optional)</option>
                      <option value="$1k-$5k">Under $5k (Audit only)</option>
                      <option value="$5k-$10k">$5k-$10k</option>
                      <option value="$10k-$25k">$10k-$25k</option>
                      <option value="$25k+">$25k+</option>
                      <option value="Not sure">Not sure</option>
                    </select>
                  </div>
                  <div className="mt-3 rounded-xl border border-white/10 bg-black/50 px-3 py-2 text-[10px] leading-relaxed text-zinc-500">
                    Pricing is scope-based and kept firm (no discount negotiations). If budget is tight, start with the audit and stage delivery.
                  </div>
                  <button
                    type="button"
                    className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white disabled:opacity-50"
                    onClick={continueTimelineBudget}
                    disabled={!intake.data.timeline}
                  >
                    Continue
                  </button>
                </div>
              )}

              {intake?.step === 'summary' && (
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500">Summary</div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600">
                      {intake.sendState === 'sent'
                        ? 'Sent'
                        : intake.sendState === 'sending'
                          ? 'Sending'
                          : intake.sendState === 'error'
                            ? 'Fallback'
                            : 'Ready'}
                    </div>
                  </div>

                  <pre className="whitespace-pre-wrap rounded-xl border border-white/10 bg-black p-3 text-[11px] text-zinc-300">
                    {buildSummaryText(intake.data)}
                  </pre>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={sendIntakeBrief}
                      className="rounded-xl bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black disabled:opacity-60"
                      disabled={intake.sendState === 'sending' || intake.sendState === 'sent'}
                    >
                      {intake.sendState === 'sending' ? 'Sending…' : intake.sendState === 'sent' ? 'Sent' : 'Send to Vishnu'}
                    </button>
                    <button
                      type="button"
                      onClick={editIntake}
                      className="rounded-xl border border-white/10 bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white disabled:opacity-60"
                      disabled={intake.sendState === 'sending'}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link to="/case-studies" onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-blue-500/50 hover:text-white">
                  Proof <ExternalLink size={12} />
                </Link>
                <Link to="/blog" onClick={() => setIsOpen(false)} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-blue-500/50 hover:text-white">
                  Notes <ExternalLink size={12} />
                </Link>
                <Link to="/xavira" onClick={() => setIsOpen(false)} className="col-span-2 flex items-center justify-between rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-200 transition-colors hover:border-blue-500/50 hover:text-white">
                  Xavira Control Stack <ExternalLink size={12} />
                </Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="col-span-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-300 transition-colors hover:border-blue-500/50 hover:text-white">
                  Contact Vishnu <ExternalLink size={12} />
                </Link>
              </div>
            </div>

            <div className="shrink-0 border-t border-white/10 bg-zinc-900/70 p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 transition-opacity group-focus-within:opacity-100" />
                <div className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-black px-4 py-3 transition-all group-focus-within:border-blue-500/50">
                  <Terminal size={14} className="text-zinc-600" />
                  <input
                    type="text"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    placeholder="Ask VeeScout or share product context..."
                    disabled={isThinking}
                    className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-white placeholder:text-zinc-700 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isThinking}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 transition-all hover:bg-blue-500/10 disabled:opacity-30"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
              <div className="mt-4 flex items-center justify-between gap-4 font-mono text-[8px] uppercase text-zinc-700">
                <span className="flex items-center gap-1.5"><Command size={10} /> Intake Ready</span>
                <span className="flex items-center gap-1.5"><Sparkles size={10} /> Suggests Next</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
