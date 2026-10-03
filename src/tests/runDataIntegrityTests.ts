/**
 * PUJAPATH - Standalone Data Integrity Test Runner
 * Command: npx tsx src/tests/runDataIntegrityTests.ts
 */

import { runDataIntegrityTestSuite } from './dataIntegrity.test';

function main() {
  console.log('===============================================================');
  console.log('PUJAPATH Phase 1: Domain Models, Mock Database & Data Validation');
  console.log('Running Data Integrity Test Suite...');
  console.log('===============================================================\n');

  const startTime = Date.now();
  const results = runDataIntegrityTestSuite();
  const elapsedMs = Date.now() - startTime;

  let passedCount = 0;
  let failedCount = 0;

  for (const res of results) {
    const statusTag = res.passed ? '[\x1b[32mPASS\x1b[0m]' : '[\x1b[31mFAIL\x1b[0m]';
    console.log(`${statusTag} ${res.id}: ${res.description}`);
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
    console.error('\nData integrity test suite failed.');
    process.exit(1);
  } else {
    console.log('\nAll domain and dataset integrity constraints satisfied.');
    process.exit(0);
  }
}

main();
