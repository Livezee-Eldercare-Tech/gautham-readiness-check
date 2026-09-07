/**
 * Scoring and Decision Logic Engine
 * Gautham Hospital - Post-Discharge Readiness Check Pilot
 *
 * Rules:
 * - Step 1: Hard Triggers (T1-T5) -> URGENT SUPPORT (first match wins)
 * - Step 2: Hard Exclusions (X1-X2) -> NO ACTION (if no trigger fired)
 * - Step 3: Compute Need Score (max 14) and Readiness Score (max 12)
 * - Step 4: Matrix Classification (if undecided in Steps 1-2)
 * - Step 5: Queue Ranking Priority (Need + Readiness descending)
 */

export const TIERS = {
  URGENT_SUPPORT: 'URGENT SUPPORT',
  FOLLOW_UP: 'FOLLOW UP',
  INFORM: 'INFORM',
  NO_ACTION: 'NO ACTION',
};

/**
 * Calculates Need Score (max 14)
 * @param {Object} answers
 * @returns {number}
 */
export function calculateNeedScore(answers) {
  let score = 0;

  // Q6: Prior admission
  // within 6 months: +3, earlier: +1
  if (answers.q6 === 'Yes, within 6 months') {
    score += 3;
  } else if (answers.q6 === 'Yes, earlier') {
    score += 1;
  }

  // Q7: Ongoing conditions (array)
  // one condition: +1; two or more: +2; memory/confusion ticked: +2 in addition
  const q7Conditions = Array.isArray(answers.q7) ? answers.q7 : [];
  const validConditions = q7Conditions.filter(c => c && c !== 'None');
  if (validConditions.length === 1) {
    score += 1;
  } else if (validConditions.length >= 2) {
    score += 2;
  }
  if (validConditions.includes('Memory or confusion')) {
    score += 2;
  }

  // Q8: Mobility
  // needs some help: +2; needs full help: +3
  if (answers.q8 === 'Needs some help') {
    score += 2;
  } else if (answers.q8 === 'Needs full help') {
    score += 3;
  }

  // Q9: Falls or noticeable decline in last 6 months
  // yes: +2; not sure: +1
  if (answers.q9 === 'Yes') {
    score += 2;
  } else if (answers.q9 === 'Not sure') {
    score += 1;
  }

  // Q10: Doctor's post-discharge instructions (array)
  // any instruction: +1; three or more: +2
  const q10Instructions = Array.isArray(answers.q10) ? answers.q10 : [];
  const validInstructions = q10Instructions.filter(i => i && i !== 'None yet');
  if (validInstructions.length >= 3) {
    score += 2;
  } else if (validInstructions.length >= 1) {
    score += 1;
  }

  // Q14: Expected difficulty managing care at home
  // yes: +2; somewhat: +1
  if (answers.q14 === 'Yes') {
    score += 2;
  } else if (answers.q14 === 'Somewhat') {
    score += 1;
  }

  return score;
}

/**
 * Calculates Readiness Score (max 12)
 * @param {Object} answers
 * @returns {number}
 */
export function calculateReadinessScore(answers) {
  let score = 0;

  // Q3: Room category
  // Private: +1; Deluxe: +2
  if (answers.q3 === 'Private') {
    score += 1;
  } else if (answers.q3 === 'Deluxe') {
    score += 2;
  }

  // Q11: Who will be at home during the day
  // nobody for parts of the day: +2; paid caretaker–nurse: +2
  if (answers.q11 === 'Nobody for parts of the day') {
    score += 2;
  } else if (answers.q11 === 'Paid caretaker–nurse') {
    score += 2;
  }

  // Q12 & Q13 together (capped at +3 combined)
  // kin abroad: +2; decision-maker child abroad: +2; decision-maker child in India or joint: +1
  let abroadFamilyScore = 0;
  const isKinAbroad = answers.q12 && answers.q12 !== 'No';
  if (isKinAbroad) {
    abroadFamilyScore += 2;
  }

  if (answers.q13 === 'Child abroad') {
    abroadFamilyScore += 2;
  } else if (answers.q13 === 'Child in India' || answers.q13 === 'Joint') {
    abroadFamilyScore += 1;
  }

  score += Math.min(3, abroadFamilyScore);

  // Q15: Information request
  // yes: +3; maybe: +1
  if (answers.q15 === 'Yes') {
    score += 3;
  } else if (answers.q15 === 'Maybe') {
    score += 1;
  }

  return score;
}

/**
 * Evaluates Hard Triggers (Step 1)
 * @param {Object} answers
 * @returns {string|null} triggerId (T1-T5) or null
 */
export function checkHardTriggers(answers) {
  // T1 · Raised Hand: Q15 = Yes
  if (answers.q15 === 'Yes') {
    return 'T1';
  }

  // T2 · Revolving Door: Q6 = repeat <= 6 months AND (Q12 = any yes OR Q11 = paid caretaker-nurse)
  const isRepeat6m = answers.q6 === 'Yes, within 6 months';
  const hasKinAbroad = answers.q12 && answers.q12 !== 'No';
  const hasPaidCaretaker = answers.q11 === 'Paid caretaker–nurse';
  if (isRepeat6m && (hasKinAbroad || hasPaidCaretaker)) {
    return 'T2';
  }

  // T3 · Home Alone: Q11 = nobody for parts of the day AND Q10 = any instruction ticked
  const isHomeAlone = answers.q11 === 'Nobody for parts of the day';
  const q10Instructions = Array.isArray(answers.q10) ? answers.q10 : [];
  const hasAnyInstruction = q10Instructions.some(i => i && i !== 'None yet');
  if (isHomeAlone && hasAnyInstruction) {
    return 'T3';
  }

  // T4 · Needs Hands: Q8 = needs full help AND Q11 != paid caretaker-nurse
  const needsFullHelp = answers.q8 === 'Needs full help';
  if (needsFullHelp && !hasPaidCaretaker) {
    return 'T4';
  }

  // T5 · Two Patients: Q7 includes memory/confusion AND Q11 = spouse only
  const q7Conditions = Array.isArray(answers.q7) ? answers.q7 : [];
  const hasMemoryIssue = q7Conditions.includes('Memory or confusion');
  const spouseOnly = answers.q11 === 'Spouse only';
  if (hasMemoryIssue && spouseOnly) {
    return 'T5';
  }

  return null;
}

/**
 * Evaluates Hard Exclusions (Step 2)
 * @param {Object} answers
 * @param {number} needScore
 * @returns {string|null} exclusionId (X1-X2) or null
 */
export function checkHardExclusions(answers, needScore) {
  // X1: Q8 = independent AND Q6 = no AND Q7 = none
  const isIndependent = answers.q8 === 'Independent';
  const noPriorAdmission = answers.q6 === 'No';
  const q7Conditions = Array.isArray(answers.q7) ? answers.q7 : [];
  const noConditions = q7Conditions.length === 0 || q7Conditions.includes('None');
  if (isIndependent && noPriorAdmission && noConditions) {
    return 'X1';
  }

  // X2: Need score <= 2
  if (needScore <= 2) {
    return 'X2';
  }

  return null;
}

/**
 * Evaluates Decision Matrix (Step 4)
 * @param {number} needScore
 * @param {number} readinessScore
 * @returns {string} Tier
 */
export function evaluateMatrix(needScore, readinessScore) {
  if (needScore >= 6 && readinessScore >= 5) {
    return TIERS.URGENT_SUPPORT;
  }
  if (needScore >= 6 && readinessScore >= 2 && readinessScore <= 4) {
    return TIERS.FOLLOW_UP;
  }
  if (needScore >= 3 && needScore <= 5 && readinessScore >= 5) {
    return TIERS.INFORM;
  }
  return TIERS.NO_ACTION;
}

/**
 * Main Evaluation Pipeline
 * Evaluates record strictly according to Section 6 of the brief
 * @param {Object} answers
 * @returns {{needScore: number, readinessScore: number, triggerId: string, tier: string, rankScore: number}}
 */
export function evaluateSubmission(answers) {
  // STEP 3 scores are computed for every record
  const needScore = calculateNeedScore(answers);
  const readinessScore = calculateReadinessScore(answers);
  const rankScore = needScore + readinessScore;

  // STEP 1: Hard triggers -> URGENT SUPPORT
  const trigger = checkHardTriggers(answers);
  if (trigger) {
    return {
      needScore,
      readinessScore,
      triggerId: trigger,
      tier: TIERS.URGENT_SUPPORT,
      rankScore,
    };
  }

  // STEP 2: Hard exclusions -> NO ACTION
  const exclusion = checkHardExclusions(answers, needScore);
  if (exclusion) {
    return {
      needScore,
      readinessScore,
      triggerId: exclusion,
      tier: TIERS.NO_ACTION,
      rankScore,
    };
  }

  // STEP 4: Matrix
  const matrixTier = evaluateMatrix(needScore, readinessScore);
  return {
    needScore,
    readinessScore,
    triggerId: 'matrix',
    tier: matrixTier,
    rankScore,
  };
}
