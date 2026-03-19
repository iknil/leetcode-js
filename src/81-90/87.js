/**
 * https://leetcode.cn/problems/scramble-string/
 */

/**
 * Recursion + Memoization — O(n^4) time, O(n^3) space
 * s1 is a scramble of s2 if we can split both into two parts and either
 * match directly or swap one of the halves.
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const isScramble = function (s1, s2) {
	const memo = new Map();

	function dp(a, b) {
		if (a === b) return true;
		const key = `${a},${b}`;
		if (memo.has(key)) return memo.get(key);

		if (a.length !== b.length || [...a].sort().join('') !== [...b].sort().join('')) {
			memo.set(key, false);
			return false;
		}

		const n = a.length;
		for (let i = 1; i < n; i += 1) {
			// No swap
			if (dp(a.slice(0, i), b.slice(0, i)) && dp(a.slice(i), b.slice(i))) {
				memo.set(key, true); return true;
			}
			// Swap
			if (dp(a.slice(0, i), b.slice(n - i)) && dp(a.slice(i), b.slice(0, n - i))) {
				memo.set(key, true); return true;
			}
		}

		memo.set(key, false);
		return false;
	}

	return dp(s1, s2);
};

if (require.main === module) {
const tests = [
	{ s1: 'great', s2: 'rgeat', expected: true },
	{ s1: 'abcde', s2: 'caebd', expected: false },
	{ s1: 'a', s2: 'a', expected: true },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s1, s2, expected }) => {
	const r = isScramble(s1, s2);
	console.log(`"${s1}" / "${s2}" -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
