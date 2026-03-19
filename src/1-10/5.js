/**
 * https://leetcode.cn/problems/longest-palindromic-substring/
 */

/**
 * Expand Around Center — O(n²) time, O(1) space
 * For every center (character or gap between characters), expand outward
 * as long as both sides match. Track the longest found.
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function (s) {
	let start = 0;
	let maxLen = 1;

	function expand(l, r) {
		while (l >= 0 && r < s.length && s[l] === s[r]) {
			if (r - l + 1 > maxLen) {
				maxLen = r - l + 1;
				start = l;
			}
			l -= 1;
			r += 1;
		}
	}

	for (let i = 0; i < s.length; i += 1) {
		expand(i, i);     // odd length
		expand(i, i + 1); // even length
	}

	return s.slice(start, start + maxLen);
};

/**
 * Dynamic Programming — O(n²) time, O(n²) space
 * dp[i][j] = true if s[i..j] is a palindrome.
 * Base: single chars and adjacent equal chars.
 * Transition: dp[i][j] = dp[i+1][j-1] && s[i] === s[j]
 * @param {string} s
 * @return {string}
 */
const longestPalindrome2 = function (s) {
	const n = s.length;
	const dp = Array.from({ length: n }, () => new Array(n).fill(false));
	let start = 0;
	let maxLen = 1;

	// All single characters are palindromes
	for (let i = 0; i < n; i += 1) dp[i][i] = true;

	// Check length 2
	for (let i = 0; i < n - 1; i += 1) {
		if (s[i] === s[i + 1]) {
			dp[i][i + 1] = true;
			start = i;
			maxLen = 2;
		}
	}

	// Check lengths 3 and above
	for (let len = 3; len <= n; len += 1) {
		for (let i = 0; i <= n - len; i += 1) {
			const j = i + len - 1;
			if (s[i] === s[j] && dp[i + 1][j - 1]) {
				dp[i][j] = true;
				if (len > maxLen) {
					maxLen = len;
					start = i;
				}
			}
		}
	}

	return s.slice(start, start + maxLen);
};

// --- Local Tests ---
if (require.main === module) {
const tests = [
	{ s: 'babad', expected: new Set(['bab', 'aba']) },
	{ s: 'cbbd', expected: new Set(['bb']) },
	{ s: 'a', expected: new Set(['a']) },
	{ s: 'ac', expected: new Set(['a', 'c']) },
	{ s: 'racecar', expected: new Set(['racecar']) },
	{ s: 'aacabdkacaa', expected: new Set(['aca']) },
];

console.log('--- Functional Tests ---');
tests.forEach(({ s, expected }) => {
	const r1 = longestPalindrome(s);
	const r2 = longestPalindrome2(s);
	const ok1 = expected.has(r1) ? '✓' : `✗(got "${r1}")`;
	const ok2 = expected.has(r2) ? '✓' : `✗(got "${r2}")`;
	console.log(`"${s}" -> v1: "${r1}" ${ok1}  v2: "${r2}" ${ok2}`);
});

console.log('\n--- Performance Comparison (10,000 iterations) ---');
const perfStr = 'abcdefghijklmnopqrstuvwxyzzyxwvutsrqponmlkjihgfedcba'; // 52 chars with palindrome in middle
const iterations = 10000;

console.time('longestPalindrome (ExpandCenter)');
for (let i = 0; i < iterations; i += 1) longestPalindrome(perfStr);
console.timeEnd('longestPalindrome (ExpandCenter)');

console.time('longestPalindrome2 (DP)');
for (let i = 0; i < iterations; i += 1) longestPalindrome2(perfStr);
console.timeEnd('longestPalindrome2 (DP)');
}
