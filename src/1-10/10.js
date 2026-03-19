/**
 * https://leetcode.cn/problems/regular-expression-matching/
 */

/**
 * Dynamic Programming (Bottom-Up) — O(m*n) time, O(m*n) space
 *
 * dp[i][j] = true if s[0..i-1] is fully matched by p[0..j-1].
 *
 * Transitions:
 *   p[j-1] is a letter or '.':
 *     dp[i][j] = dp[i-1][j-1] && charMatch(s[i-1], p[j-1])
 *
 *   p[j-1] is '*':
 *     Case 1 — use '*' zero times (delete "x*"):
 *       dp[i][j] = dp[i][j-2]
 *     Case 2 — use '*' one-or-more times (extend match):
 *       if charMatch(s[i-1], p[j-2]):
 *         dp[i][j] |= dp[i-1][j]
 *
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
	const m = s.length;
	const n = p.length;

	// dp[i][j]: s[0..i-1] matches p[0..j-1]
	const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
	dp[0][0] = true;

	// Empty string vs pattern: patterns like a*b*c* can match empty string
	for (let j = 2; j <= n; j += 1) {
		if (p[j - 1] === '*') {
			dp[0][j] = dp[0][j - 2];
		}
	}

	for (let i = 1; i <= m; i += 1) {
		for (let j = 1; j <= n; j += 1) {
			const sc = s[i - 1];
			const pc = p[j - 1];

			if (pc === '*') {
				// Case 1: use '*' zero times
				dp[i][j] = dp[i][j - 2];
				// Case 2: use '*' one-or-more times
				if (p[j - 2] === '.' || p[j - 2] === sc) {
					dp[i][j] = dp[i][j] || dp[i - 1][j];
				}
			} else if (pc === '.' || pc === sc) {
				dp[i][j] = dp[i - 1][j - 1];
			}
		}
	}

	return dp[m][n];
};

/**
 * Recursion + Memoization (Top-Down DP) — O(m*n) time, O(m*n) space
 * Easier to reason about: match from left, decide what to do with '*' lazily.
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch2 = function (s, p) {
	const memo = new Map();

	function dp(i, j) {
		const key = `${i},${j}`;
		if (memo.has(key)) return memo.get(key);

		if (j === p.length) {
			memo.set(key, i === s.length);
			return i === s.length;
		}

		const firstMatch = i < s.length && (p[j] === '.' || p[j] === s[i]);

		let res;
		if (j + 1 < p.length && p[j + 1] === '*') {
			// Either skip "x*" entirely, or consume one char and stay at j
			res = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
		} else {
			res = firstMatch && dp(i + 1, j + 1);
		}

		memo.set(key, res);
		return res;
	}

	return dp(0, 0);
};

// --- Local Tests ---
if (require.main === module) {
const tests = [
	{ s: 'aa', p: 'a', expected: false },
	{ s: 'aa', p: 'a*', expected: true },
	{ s: 'ab', p: '.*', expected: true },
	{ s: 'aab', p: 'c*a*b', expected: true },
	{ s: 'mississippi', p: 'mis*is*p*.', expected: false },
	{ s: '', p: '.*', expected: true },
	{ s: 'a', p: '.*..a*', expected: false },
	{ s: 'aaa', p: 'a*a', expected: true },
	{ s: 'aaa', p: 'ab*a*c*a', expected: true },
];

console.log('--- Functional Tests ---');
tests.forEach(({ s, p, expected }) => {
	const r1 = isMatch(s, p);
	const r2 = isMatch2(s, p);
	const ok1 = r1 === expected ? '✓' : `✗(expected ${expected})`;
	const ok2 = r2 === expected ? '✓' : `✗(expected ${expected})`;
	console.log(`s="${s}" p="${p}" -> v1: ${r1} ${ok1}  v2: ${r2} ${ok2}`);
});

console.log('\n--- Performance Comparison (50,000 iterations) ---');
const iterations = 50000;

console.time('isMatch (Bottom-Up DP)');
for (let i = 0; i < iterations; i += 1) isMatch('aaaaaaaaaaaaaab', 'a*a*a*a*a*a*c');
console.timeEnd('isMatch (Bottom-Up DP)');

console.time('isMatch2 (Memoization)');
for (let i = 0; i < iterations; i += 1) isMatch2('aaaaaaaaaaaaaab', 'a*a*a*a*a*a*c');
console.timeEnd('isMatch2 (Memoization)');
}
