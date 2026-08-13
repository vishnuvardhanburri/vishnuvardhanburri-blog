import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createEmptyIntake,
  shouldTriggerIntake,
  parseUrlMaybe,
  applyProductAnswer,
  applySymptomsAnswer,
  applyStackAnswer,
  applyTimelineBudgetAnswer,
  applyEmailAnswer,
  buildSummaryText,
} from './intake';

test('shouldTriggerIntake detects intent', () => {
  assert.equal(shouldTriggerIntake('Hi'), false);
  assert.equal(shouldTriggerIntake('Can you audit my backend?'), true);
  assert.equal(shouldTriggerIntake('Find my product problem'), true);
});

test('parseUrlMaybe normalizes URLs', () => {
  assert.equal(parseUrlMaybe(''), '');
  assert.ok(parseUrlMaybe('example.com').startsWith('https://'));
  assert.ok(parseUrlMaybe('https://example.com').startsWith('https://'));
  assert.equal(parseUrlMaybe('ftp://example.com'), '');
});

test('intake flow advances steps and stores answers', () => {
  let st = createEmptyIntake();
  st = applyProductAnswer(st, 'https://example.com');
  assert.equal(st.step, 'symptoms');
  assert.ok(st.data.productUrl.includes('https://'));

  st = applySymptomsAnswer(st, 'API 500s, slow queries');
  assert.equal(st.step, 'stack');
  assert.equal(st.data.symptoms, 'API 500s, slow queries');

  st = applyStackAnswer(st, 'Node, Postgres, AWS');
  assert.equal(st.step, 'timeline_budget');

  st = applyTimelineBudgetAnswer(st, { timeline: 'ASAP', budget: '$5k-$10k' });
  assert.equal(st.step, 'email');

  st = applyEmailAnswer(st, 'founder@example.com');
  assert.equal(st.step, 'summary');
  assert.equal(st.data.email, 'founder@example.com');

  const summary = buildSummaryText(st.data);
  assert.ok(summary.includes('Timeline: ASAP'));
  assert.ok(summary.includes('Budget: $5k-$10k'));
});

