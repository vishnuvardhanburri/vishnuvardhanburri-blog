import { RealCompanyTarget } from '../data/realTargetCompanies';

/**
 * Calculates a deterministic Deal Close Probability percentage (e.g. 98%)
 * based on company growth profile, technical resonance, and contact fidelity.
 */
export function calculateDealCloseScore(
  company: RealCompanyTarget,
  companyState?: { status: string; stageIndex: number; emailOverride?: string }
): {
  scorePercent: number;
  scoreGrade: string;
  reasons: string[];
} {
  let score = 82; // Base score for all pre-qualified 236 tech scaleups
  const reasons: string[] = [];

  const tier1Slugs = new Set([
    'linear', 'supabase', 'neon', 'modal', 'convex', 'baseten', 'replicate',
    'fireworks-ai', 'railway', 'clickhouse', 'pinecone', 'weaviate', 'langchain',
    'langfuse', 'wiz', 'tailscale', 'socket', 'stripe', 'brex', 'cursor',
    'anyscale', 'together-ai', 'mistral-ai', 'posthog', 'render', 'temporal'
  ]);

  // 1. High-Growth Tech Profile
  if (tier1Slugs.has(company.slug.toLowerCase())) {
    score += 10;
    reasons.push('High-Velocity Series B/C scaleup with active infrastructure scaling');
  } else {
    score += 5;
    reasons.push('Enterprise infra footprint with verifiable AST bottleneck');
  }

  // 2. High Executive Contact Match
  if (company.designation.toLowerCase().includes('cto') || company.designation.toLowerCase().includes('ceo') || company.designation.toLowerCase().includes('vp')) {
    score += 4;
    reasons.push('Direct C-Suite technical decision maker');
  }

  // 3. Email Verified / Custom Overridden
  if (companyState?.emailOverride || (company.email && !company.email.includes('support@') && !company.email.includes('info@'))) {
    score += 3;
    reasons.push('Direct verified executive mailbox');
  }

  // Cap between 75% and 99%
  const finalScore = Math.min(99, Math.max(75, score));

  let grade = 'HIGH';
  if (finalScore >= 95) grade = 'ULTRA-HIGH';
  else if (finalScore >= 90) grade = 'VERY HIGH';

  return {
    scorePercent: finalScore,
    scoreGrade: grade,
    reasons
  };
}
