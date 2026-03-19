/**
 * https://leetcode.cn/problems/unique-paths/
 */

/**
 * DP — O(m*n) time, O(n) space (rolling row)
 * dp[j] = paths to reach column j in current row.
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
	const dp = new Array(n).fill(1);

	for (let i = 1; i < m; i += 1) {
		for (let j = 1; j < n; j += 1) {
			dp[j] += dp[j - 1];
		}
	}

	return dp[n - 1];
};

if (require.main === module) {
const tests = [
	{ m: 3, n: 7, expected: 28 },
	{ m: 3, n: 2, expected: 3 },
	{ m: 1, n: 1, expected: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ m, n, expected }) => {
	const r = uniquePaths(m, n);
	console.log(`m=${m} n=${n} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
