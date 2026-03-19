/**
 * https://leetcode.cn/problems/unique-binary-search-trees/
 */

/**
 * Dynamic Programming (Catalan number) — O(n^2) time, O(n) space
 * dp[i] = sum of dp[j-1] * dp[i-j] for j in 1..i (root choices).
 * @param {number} n
 * @return {number}
 */
const numTrees = function (n) {
	const dp = new Array(n + 1).fill(0);
	dp[0] = 1;
	dp[1] = 1;

	for (let i = 2; i <= n; i += 1) {
		for (let j = 1; j <= i; j += 1) {
			dp[i] += dp[j - 1] * dp[i - j];
		}
	}

	return dp[n];
};

if (require.main === module) {
const tests = [
	{ n: 3, expected: 5 },
	{ n: 1, expected: 1 },
	{ n: 4, expected: 14 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ n, expected }) => {
	const r = numTrees(n);
	console.log(`n=${n} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
