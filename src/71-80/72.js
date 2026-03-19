/**
 * https://leetcode.cn/problems/edit-distance/
 */

/**
 * DP — O(m*n) time, O(n) space (rolling row)
 * dp[j] = edit distance between word1[0..i-1] and word2[0..j-1]
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function (word1, word2) {
	const m = word1.length;
	const n = word2.length;
	let dp = Array.from({ length: n + 1 }, (_, j) => j);

	for (let i = 1; i <= m; i += 1) {
		const next = [i];
		for (let j = 1; j <= n; j += 1) {
			if (word1[i - 1] === word2[j - 1]) {
				next[j] = dp[j - 1];
			} else {
				next[j] = 1 + Math.min(dp[j], next[j - 1], dp[j - 1]);
			}
		}
		dp = next;
	}

	return dp[n];
};

if (require.main === module) {
const tests = [
	{ word1: 'horse', word2: 'ros', expected: 3 },
	{ word1: 'intention', word2: 'execution', expected: 5 },
	{ word1: '', word2: 'a', expected: 1 },
	{ word1: 'a', word2: '', expected: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ word1, word2, expected }) => {
	const r = minDistance(word1, word2);
	console.log(`"${word1}" -> "${word2}": ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
