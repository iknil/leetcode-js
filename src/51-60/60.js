/**
 * https://leetcode.cn/problems/permutation-sequence/
 */

/**
 * Factoradic number system — O(n²) time, O(n) space
 * Use factorial number system to directly find the k-th permutation.
 * At each position pick the (k / (n-1)!)-th remaining digit.
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const getPermutation = function (n, k) {
	const digits = [];
	const fact = [1];
	for (let i = 1; i <= n; i += 1) {
		digits.push(i);
		fact[i] = fact[i - 1] * i;
	}

	let rem = k - 1; // 0-indexed
	let res = '';

	for (let i = n; i >= 1; i -= 1) {
		const idx = Math.floor(rem / fact[i - 1]);
		res += digits[idx];
		digits.splice(idx, 1);
		rem %= fact[i - 1];
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ n: 3, k: 3, expected: '213' },
	{ n: 4, k: 9, expected: '2314' },
	{ n: 3, k: 1, expected: '123' },
];
console.log('--- Functional Tests ---');
tests.forEach(({ n, k, expected }) => {
	const r = getPermutation(n, k);
	console.log(`n=${n} k=${k} -> "${r}" ${r === expected ? '✓' : `✗(expected "${expected}")`}`);
});
}
