/**
 * https://leetcode.cn/problems/wildcard-matching/
 */

/**
 * DP — O(m*n) time, O(m*n) space
 * dp[i][j] = s[0..i-1] matches p[0..j-1].
 * '*' matches empty (dp[i][j] = dp[i][j-1]) or one more char (dp[i][j] |= dp[i-1][j]).
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function (s, p) {
	const m = s.length;
	const n = p.length;
	const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
	dp[0][0] = true;

	for (let j = 1; j <= n; j += 1) {
		if (p[j - 1] === '*') dp[0][j] = dp[0][j - 1];
	}

	for (let i = 1; i <= m; i += 1) {
		for (let j = 1; j <= n; j += 1) {
			if (p[j - 1] === '*') {
				dp[i][j] = dp[i][j - 1] || dp[i - 1][j]; // match empty or one more
			} else if (p[j - 1] === '?' || p[j - 1] === s[i - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			}
		}
	}

	return dp[m][n];
};

if (require.main === module) {
const tests = [
	{ s: 'aa', p: 'a', expected: false },
	{ s: 'aa', p: '*', expected: true },
	{ s: 'cb', p: '?a', expected: false },
	{ s: 'adceb', p: '*a*b', expected: true },
	{ s: 'acdcb', p: 'a*c?b', expected: false },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s, p, expected }) => {
	const r = isMatch(s, p);
	console.log(`s="${s}" p="${p}" -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
