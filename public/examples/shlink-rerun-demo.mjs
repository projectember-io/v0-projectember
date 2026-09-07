// Synthetic planning demonstration. No network requests or external writes.
import assert from 'node:assert/strict';

function missingExactSlugs(expectedSlugs, existingSlugs) {
  const existing = new Set(existingSlugs);
  return expectedSlugs.filter((slug) => !existing.has(slug));
}

const expected = [
  'ExampleEpisodeYT', 'ExampleEpisodeYT-SLP',
  'ExampleEpisodeSpotify', 'ExampleEpisodeSpotify-SLP',
  'ExampleEpisodeApple', 'ExampleEpisodeApple-SLP',
];
const cases = [
  ['New episode', [], expected],
  ['Partially complete episode', expected.slice(0, 5), expected.slice(5)],
  ['Completed episode rerun', expected, []],
];
for (const [label, existing, want] of cases) {
  const missing = missingExactSlugs(expected, existing);
  assert.deepEqual(missing, want);
  console.log(`${label}: ${missing.length} ${missing.length === 1 ? 'link' : 'links'} to create`);
}
console.log('All planning checks passed.');
