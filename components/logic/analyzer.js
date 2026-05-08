export const FLAGGED_KEYWORDS = [
  'urgent', 'breaking', 'forward this', 'share now', 'share immediately',
  'must read', 'viral', '100% confirmed', '100% real', 'unbelievable',
  'shocking', "you won't believe", 'act now', 'limited time', 'secret',
  "they don't want you to know", 'wake up'
];

export const SOURCE_SCORES = { verified: 40, unverified: 10, social: 5 };

export const RISK_MAP = {
  low:    { label: '🟢 Low Risk',    cls: 'low',    action: 'Appears reliable — cross-check before sharing.' },
  medium: { label: '🟡 Medium Risk', cls: 'medium', action: 'Verify with trusted sources before sharing.' },
  high:   { label: '🔴 High Risk',   cls: 'high',   action: 'Do NOT forward — likely misinformation.' }
};

export function analyze(text, source) {
  const sourceScore = SOURCE_SCORES[source] || 0;

  // Structure analysis
  const words = text.split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  let structureScore = 0;
  if (sentences.length >= 2 && words.length >= 10) {
    structureScore = 10;
  } else if (words.length < 5) {
    structureScore = -10;
  }
  // Uppercase penalty
  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 0) {
    const upperRatio = (text.replace(/[^A-Z]/g, '').length) / letters.length;
    if (upperRatio > 0.4) structureScore -= 10;
  }

  // Keyword detection
  const lowerText = text.toLowerCase();
  const found = [];
  FLAGGED_KEYWORDS.forEach(kw => {
    if (lowerText.includes(kw.toLowerCase())) found.push(kw);
  });
  const keywordPenalty = found.length * 10;

  let score = sourceScore + structureScore - keywordPenalty;
  score = Math.max(0, Math.min(100, score));

  let risk;
  if (score >= 70) risk = 'low';
  else if (score >= 30) risk = 'medium';
  else risk = 'high';

  return {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    text,
    source,
    score,
    risk,
    sourceScore,
    structureScore,
    keywordPenalty,
    flaggedKeywords: found,
    timestamp: new Date().toISOString()
  };
}
