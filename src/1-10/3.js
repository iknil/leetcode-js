/**
 * https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 */

/**
 * Sliding Window + Map (char -> last index)
 * When a duplicate is found, jump left pointer directly to the position after
 * the previous occurrence — no need to shrink one step at a time.
 * Time: O(n)  Space: O(min(n, m)) where m is the charset size
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
	const map = new Map(); // char -> last seen index
	let max = 0;
	let l = 0;

	for (let r = 0; r < s.length; r += 1) {
		const c = s[r];
		if (map.has(c) && map.get(c) >= l) {
			l = map.get(c) + 1;
		}
		map.set(c, r);
		if (r - l + 1 > max) {
			max = r - l + 1;
		}
	}

	return max;
};

/**
 * Sliding Window + Set
 * Shrinks the window one step at a time from the left until the duplicate is
 * removed. Conceptually simpler but does more iterations in worst case.
 * Time: O(2n) = O(n)  Space: O(min(n, m))
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring2 = function (s) {
	const set = new Set();
	let max = 0;
	let l = 0;

	for (let r = 0; r < s.length; r += 1) {
		while (set.has(s[r])) {
			set.delete(s[l]);
			l += 1;
		}
		set.add(s[r]);
		if (r - l + 1 > max) {
			max = r - l + 1;
		}
	}

	return max;
};

// --- Local Tests (only run when executed directly, not on LeetCode judge) ---
if (require.main === module) {
const tests = [
	{ s: 'abcabcbb', expected: 3 },
	{ s: 'bbbbb', expected: 1 },
	{ s: 'pwwkew', expected: 3 },
	{ s: '', expected: 0 },
	{ s: ' ', expected: 1 },
	{ s: 'au', expected: 2 },
	{ s: 'dvdf', expected: 3 },
];

console.log('--- Functional Tests ---');
tests.forEach(({ s, expected }) => {
	const r1 = lengthOfLongestSubstring(s);
	const r2 = lengthOfLongestSubstring2(s);
	const ok1 = r1 === expected ? '✓' : `✗(expected ${expected})`;
	const ok2 = r2 === expected ? '✓' : `✗(expected ${expected})`;
	console.log(`"${s}" -> v1: ${r1} ${ok1}  v2: ${r2} ${ok2}`);
});

console.log('\n--- Performance Comparison (1,000,000 iterations) ---');
const perfStr = 'abcdefghijklmnopqrstuvwxyzabcdefghijk'; // moderate length with repeats
const iterations = 1000000;

console.time('lengthOfLongestSubstring (Map)');
for (let i = 0; i < iterations; i += 1) {
	lengthOfLongestSubstring(perfStr);
}
console.timeEnd('lengthOfLongestSubstring (Map)');

console.time('lengthOfLongestSubstring2 (Set)');
for (let i = 0; i < iterations; i += 1) {
	lengthOfLongestSubstring2(perfStr);
}
console.timeEnd('lengthOfLongestSubstring2 (Set)');
}
