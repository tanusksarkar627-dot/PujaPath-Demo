/**
 * PUJAPATH - Standalone Engine Test Runner
 * Command: npx tsx src/tests/runEngineTests.ts
 */

import { runEngineTestSuite } from './engine.test';

async function main() {
  console.log('===============================================================');
  console.log('PUJAPATH Phase 2: Deterministic Constraint-Based Engine');
  console.log('Running Itinerary Engine Test Suite...');
  console.log('===============================================================\n');

  const startTime = Date.now();
  const results = await runEngineTestSuite();
  const elapsedMs = Date.now() - startTime;

  let passedCount = 0;
  let failedCount = 0;

  for (const res of results) {
    const statusTag = res.passed ? '[\x1b[32mPASS\x1b[0m]' : '[\x1b[31mFAIL\x1b[0m]';
    console.log(`${statusTag} ${res.id}: ${res.name}`);
    console.log(`       Details: ${res.details}\n`);

    if (res.passed) {
      passedCount++;
    } else {
      failedCount++;
    }
  }

  console.log('---------------------------------------------------------------');
  console.log(`Results: ${passedCount} passed, ${failedCount} failed (${results.length} total) in ${elapsedMs}ms`);
  console.log('---------------------------------------------------------------');

  if (failedCount > 0) {
    console.error('\nEngine test suite failed.');
    process.exit(1);
  } else {
    console.log('\nAll 10 required deterministic engine constraints and test vectors satisfied.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
