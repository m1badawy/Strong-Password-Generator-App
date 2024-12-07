const calculateBaseScore = (password) => {
  let score = 0;
  const length = password.length;

  if (length >= 8) score += 5;
  if (length >= 10) score += 5;
  if (length >= 12) score += 5;
  if (length >= 14) score += 5;
  if (length >= 16) score += 5;

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  
  if (hasUpper) score += 8;
  if (hasLower) score += 8;
  if (hasNumber) score += 9;
  if (hasSymbol) score += 10;

  return score;
};

const calculateDistributionScore = (password) => {
  const charCounts = new Map();
  for (const char of password) {
    charCounts.set(char, (charCounts.get(char) || 0) + 1);
  }
  
  const distribution = Array.from(charCounts.values());
  const maxCount = Math.max(...distribution);
  const distributionRatio = maxCount / password.length;
  
  const factor = password.length < 12 ? 0.4 : 1;
  return 20 * (1 - Math.pow(distributionRatio, factor));
};

const calculateEntropyScore = (password) => {
  const uniqueChars = new Set(password).size;
  const entropy = Math.log2(Math.pow(uniqueChars, password.length));
  
  const baseEntropy = password.length < 12 ? 40 : 80;
  return Math.min(entropy / baseEntropy, 1) * 20;
};

const applyPatternPenalties = (password) => {
  let penalties = 0;
  
  const patterns = {
    repeatingChars: /(.)\1{2,}/,
    simpleSequence: /(abc|bcd|cde|def|123|234|345|456)/i,
    keyboardPattern: /(qwer|asdf|zxcv|!@#\$)/i,
    commonWords: /(password|admin|user|login)/i,
    repeatingPattern: /(.{2,})\1{2,}/,
    consecutiveUpper: /[A-Z]{3,}/,
    consecutiveLower: /[a-z]{3,}/,
    consecutiveNumbers: /\d{3,}/,
    consecutiveSymbols: /[^A-Za-z0-9]{3,}/
  };

  const penaltyFactor = password.length < 12 ? 1.5 : 1;

  Object.entries(patterns).forEach(([type, pattern]) => {
    if (pattern.test(password)) {
      switch (type) {
        case 'repeatingChars':
        case 'repeatingPattern':
          penalties += 20 * penaltyFactor;
          break;
        case 'simpleSequence':
        case 'keyboardPattern':
          penalties += 15 * penaltyFactor;
          break;
        case 'commonWords':
          penalties += 25 * penaltyFactor;
          break;
        default:
          penalties += 10 * penaltyFactor;
      }
    }
  });

  if (password.length < 12) {
    const charTypes = [
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ].filter(Boolean).length;
    
    if (charTypes < 3) {
      penalties += (3 - charTypes) * 15;
    }
  }

  return penalties;
};

export const calculatePasswordStrength = (password) => {
  const baseScore = calculateBaseScore(password);
  const distributionScore = calculateDistributionScore(password);
  const entropyScore = calculateEntropyScore(password);
  const penalties = applyPatternPenalties(password);

  const totalScore = Math.max(0, baseScore + distributionScore + entropyScore - penalties);
  
  const thresholds = password.length < 12 
    ? [25, 40, 55, 70]
    : [30, 45, 60, 75];

  if (totalScore < thresholds[0]) return 'Very Weak';
  if (totalScore < thresholds[1]) return 'Weak';
  if (totalScore < thresholds[2]) return 'Medium';
  if (totalScore < thresholds[3]) return 'Strong';
  return 'Very Strong';
};