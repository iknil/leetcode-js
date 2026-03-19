/**
 * https://leetcode.cn/problems/interleaving-string/
 */

/**
 * Dynamic Programming — O(m*n) time, O(n) space
 * dp[j] = can s1[0..i-1] and s2[0..j-1] interleave to form s3[0..i+j-1].
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave = function (s1, s2, s3) {
	const m = s1.length;
	const n = s2.length;
	if (m + n !== s3.length) return false;

	const dp = new Array(n + 1).fill(false);
	dp[0] = true;

	for (let j = 1; j <= n; j += 1) {
		dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
	}

	for (let i = 1; i <= m; i += 1) {
		dp[0] = dp[0] && s1[i - 1] === s3[i - 1];
		for (let j = 1; j <= n; j += 1) {
			dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) ||
			         (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
		}
	}

	return dp[n];
};

if (require.main === module) {
const tests = [
	{ s1: 'aabcc', s2: 'dbbca', s3: 'aadbbcbcac', expected: true },
	{ s1: 'aabcc', s2: 'dbbca', s3: 'aadbbbaccc', expected: false },
	{ s1: '', s2: '', s3: '', expected: true },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s1, s2, s3, expected }) => {
	const r = isInterleave(s1, s2, s3);
	console.log(`"${s1}"+"${s2}"="${s3}" -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
