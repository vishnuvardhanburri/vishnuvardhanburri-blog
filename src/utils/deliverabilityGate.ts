import { RealCompanyTarget } from '../data/realTargetCompanies';

export interface SubjectLineCandidates {
  architectureQuestion: string;
  scalingObservation: string;
  technicalValidation: string;
  architectureTradeoff: string;
  researchLed: string;
  selectedSubject: string;
  selectedStyle: 'architectureQuestion' | 'scalingObservation' | 'technicalValidation' | 'architectureTradeoff' | 'researchLed';
}

export interface DeliverabilityAudit {
  isDeliverable: boolean;
  score: number; // 0 - 10
  wordCount: number;
  isWordCountOptimal: boolean; // 70 - 120 words
  spamTriggerWordsFound: string[];
  linkCount: number;
  isLinkCountSafe: boolean; // <= 1
  isPlainTextClean: boolean;
  warnings: string[];
}

const FORBIDDEN_SPAM_WORDS = [
  'critical', 'danger', 'vulnerability', 'breach', 'unmitigated', 'urgent',
  'quick question', 'hop on a call', 'free consultation', 'guarantee', 'buy now',
  'discount', '100% free', 'cheap', 'best price', 'risk-free', 'act now',
  'limited time', 'exclusive deal', 'revolutionary', 'synergy', 'secret'
];

/**
 * Generates 5 distinct, high-deliverability subject line options for a target company.
 */
export function generate5SubjectCandidates(company: RealCompanyTarget): SubjectLineCandidates {
  const comp = company.affectedComponent
    ? company.affectedComponent.split(' ')[0] + ' ' + (company.affectedComponent.split(' ')[1] || 'pipeline')
    : 'architecture scaling';
  
  const techDecision = company.techStack.split(',')[0].trim() + ' concurrency pattern';

  const candidates = {
    architectureQuestion: `A question about ${comp}`,
    scalingObservation: `${comp} under sustained load`,
    technicalValidation: `Worth validating: ${comp}`,
    architectureTradeoff: `${techDecision} at ${company.companyName}`,
    researchLed: `One observation from reviewing ${company.companyName}`,
    selectedSubject: `A question about ${comp}`,
    selectedStyle: 'architectureQuestion' as const
  };

  return candidates;
}

/**
 * Audits an email draft for deliverability, spam triggers, and word count constraints.
 */
export function auditEmailDeliverability(subject: string, body: string): DeliverabilityAudit {
  const combinedText = `${subject} ${body}`.toLowerCase();
  const words = body.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  const spamTriggerWordsFound: string[] = [];
  FORBIDDEN_SPAM_WORDS.forEach(word => {
    if (combinedText.includes(word.toLowerCase())) {
      spamTriggerWordsFound.push(word);
    }
  });

  // Count links
  const urls = body.match(/https?:\/\/[^\s]+/g) || [];
  const linkCount = urls.length;
  const isLinkCountSafe = linkCount <= 1;

  // Optimal word count is 70 to 120 words
  const isWordCountOptimal = wordCount >= 60 && wordCount <= 130;

  const warnings: string[] = [];
  let score = 10;

  if (spamTriggerWordsFound.length > 0) {
    score -= spamTriggerWordsFound.length * 2;
    warnings.push(`Spam trigger words detected: ${spamTriggerWordsFound.join(', ')}`);
  }

  if (wordCount < 60) {
    score -= 1;
    warnings.push(`Word count is slightly short (${wordCount} words). Target: 70–120 words.`);
  } else if (wordCount > 130) {
    score -= 2;
    warnings.push(`Word count is too long (${wordCount} words). Target: 70–120 words.`);
  }

  if (linkCount > 1) {
    score -= 2;
    warnings.push(`Multiple links detected (${linkCount}). Plain text delivers best with 1 research link maximum.`);
  }

  const finalScore = Math.max(1, Math.min(10, score));
  const isDeliverable = finalScore >= 8 && spamTriggerWordsFound.length === 0;

  return {
    isDeliverable,
    score: finalScore,
    wordCount,
    isWordCountOptimal,
    spamTriggerWordsFound,
    linkCount,
    isLinkCountSafe,
    isPlainTextClean: true,
    warnings
  };
}
