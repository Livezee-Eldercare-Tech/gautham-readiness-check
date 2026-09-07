import assert from 'node:assert';
import {
  calculateNeedScore,
  calculateReadinessScore,
  checkHardTriggers,
  checkHardExclusions,
  evaluateSubmission,
  TIERS
} from '../src/js/engine/scoringEngine.js';

console.log('--- Running Scoring Engine Unit Tests ---');

// Test 1: Hard Trigger T1 (Raised Hand)
{
  const answers = {
    q15: 'Yes',
    q6: 'No',
    q7: ['None'],
    q8: 'Independent',
    q9: 'No',
    q10: ['None yet'],
    q11: 'Spouse only',
    q12: 'No',
    q13: 'Patient',
    q14: 'No'
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.triggerId, 'T1');
  assert.strictEqual(result.tier, TIERS.URGENT_SUPPORT);
  console.log('✓ Trigger T1 passed');
}

// Test 2: Hard Trigger T2 (Revolving Door)
{
  const answers = {
    q6: 'Yes, within 6 months',
    q11: 'Spouse only',
    q12: 'Yes: Gulf',
    q15: 'No',
    q7: ['Diabetes'],
    q8: 'Independent',
    q9: 'No',
    q10: ['None yet'],
    q13: 'Child in India',
    q14: 'No'
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.triggerId, 'T2');
  assert.strictEqual(result.tier, TIERS.URGENT_SUPPORT);
  console.log('✓ Trigger T2 passed');
}

// Test 3: Hard Trigger T3 (Home Alone)
{
  const answers = {
    q6: 'No',
    q11: 'Nobody for parts of the day',
    q10: ['Physio', 'Review visit'],
    q15: 'No',
    q7: ['BP'],
    q8: 'Needs some help',
    q9: 'No',
    q12: 'No',
    q13: 'Patient',
    q14: 'No'
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.triggerId, 'T3');
  assert.strictEqual(result.tier, TIERS.URGENT_SUPPORT);
  console.log('✓ Trigger T3 passed');
}

// Test 4: Hard Trigger T4 (Needs Hands)
{
  const answers = {
    q6: 'No',
    q8: 'Needs full help',
    q11: 'Adult child at home',
    q10: ['None yet'],
    q15: 'No',
    q7: ['None'],
    q9: 'No',
    q12: 'No',
    q13: 'Patient',
    q14: 'No'
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.triggerId, 'T4');
  assert.strictEqual(result.tier, TIERS.URGENT_SUPPORT);
  console.log('✓ Trigger T4 passed');
}

// Test 5: Hard Trigger T5 (Two Patients)
{
  const answers = {
    q6: 'No',
    q7: ['Memory or confusion', 'BP'],
    q11: 'Spouse only',
    q8: 'Needs some help',
    q10: ['None yet'],
    q15: 'No',
    q9: 'No',
    q12: 'No',
    q13: 'Patient',
    q14: 'No'
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.triggerId, 'T5');
  assert.strictEqual(result.tier, TIERS.URGENT_SUPPORT);
  console.log('✓ Trigger T5 passed');
}

// Test 6: Hard Exclusion X1
{
  const answers = {
    q8: 'Independent',
    q6: 'No',
    q7: ['None'],
    q15: 'No',
    q9: 'No',
    q10: ['None yet'],
    q11: 'Adult child at home',
    q12: 'No',
    q13: 'Patient',
    q14: 'No'
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.triggerId, 'X1');
  assert.strictEqual(result.tier, TIERS.NO_ACTION);
  console.log('✓ Exclusion X1 passed');
}

// Test 7: Hard Exclusion X2 (Need score <= 2)
{
  const answers = {
    q6: 'Yes, earlier', // +1
    q7: ['BP'], // +1 -> Need = 2
    q8: 'Independent',
    q9: 'No',
    q10: ['None yet'],
    q14: 'No',
    q15: 'No',
    q11: 'Adult child at home',
    q12: 'No',
    q13: 'Patient'
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.needScore, 2);
  assert.strictEqual(result.triggerId, 'X2');
  assert.strictEqual(result.tier, TIERS.NO_ACTION);
  console.log('✓ Exclusion X2 passed');
}

// Test 8: Matrix Classification: Follow Up (Need >= 6, Readiness 2-4)
{
  const answers = {
    q3: 'General',
    q6: 'Yes, within 6 months', // +3
    q7: ['Diabetes', 'BP'], // +2 (total 5)
    q8: 'Needs some help', // +2 (total 7)
    q9: 'No',
    q10: ['None yet'],
    q14: 'No',
    q11: 'Adult child at home', // 0
    q12: 'No', // 0
    q13: 'Child in India', // +1
    q15: 'Maybe' // +1 -> Readiness = 2
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.needScore, 7);
  assert.strictEqual(result.readinessScore, 2);
  assert.strictEqual(result.triggerId, 'matrix');
  assert.strictEqual(result.tier, TIERS.FOLLOW_UP);
  console.log('✓ Matrix FOLLOW UP passed');
}

// Test 9: Matrix Classification: Inform (Need 3-5, Readiness >= 5)
{
  const answers = {
    q3: 'Deluxe', // +2
    q6: 'Yes, earlier', // +1
    q7: ['Diabetes'], // +1
    q8: 'Needs some help', // +2 -> Need = 4
    q9: 'No',
    q10: ['None yet'],
    q14: 'No',
    q11: 'Adult child at home', // 0
    q12: 'Yes: US–UK–Europe', // +2
    q13: 'Child abroad', // +2 (capped at +3 combined with q12)
    q15: 'Maybe' // +1 -> Readiness = 2 + 3 + 1 = 6
  };
  const result = evaluateSubmission(answers);
  assert.strictEqual(result.needScore, 4);
  assert.strictEqual(result.readinessScore, 6);
  assert.strictEqual(result.triggerId, 'matrix');
  assert.strictEqual(result.tier, TIERS.INFORM);
  console.log('✓ Matrix INFORM passed');
}

console.log('All scoring engine tests passed successfully!');
