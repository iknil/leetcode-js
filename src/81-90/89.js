/**
 * https://leetcode.cn/problems/gray-code/
 */

/**
 * Formula: i XOR (i >> 1) — O(2^n) time, O(2^n) space
 * The k-th Gray code is k XOR floor(k/2).
 * @param {number} n
 * @return {number[]}
 */
const grayCode = function (n) {
	const res = [];
	for (let i = 0; i < (1 << n); i += 1) {
		res.push(i ^ (i >> 1));
	}
	return res;
};

if (require.main === module) {
const tests = [
	{ n: 2, expected: [0, 1, 3, 2] },
	{ n: 1, expected: [0, 1] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ n, expected }) => {
	const r = grayCode(n);
	console.log(`n=${n} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : `✗(expected [${expected}])`}`);
});
}
