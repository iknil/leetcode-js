/**
 * https://leetcode.cn/problems/powx-n/
 */

/**
 * Fast Exponentiation (Recursive) — O(log n) time, O(log n) stack
 * x^n = (x^(n/2))^2 for even n; x * x^(n-1) for odd n.
 * Handle negative n by computing 1/x^(-n).
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {
	if (n < 0) return 1 / myPow(x, -n);
	if (n === 0) return 1;
	if (n % 2 === 0) {
		const half = myPow(x, n / 2);
		return half * half;
	}
	return x * myPow(x, n - 1);
};

/**
 * Fast Exponentiation (Iterative) — O(log n) time, O(1) space
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow2 = function (x, n) {
	let base = n < 0 ? 1 / x : x;
	let exp = Math.abs(n);
	let res = 1;

	while (exp > 0) {
		if (exp % 2 === 1) res *= base;
		base *= base;
		exp = Math.floor(exp / 2);
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ x: 2.0, n: 10, expected: 1024.0 },
	{ x: 2.1, n: 3, expected: 9.261000000000001 },
	{ x: 2.0, n: -2, expected: 0.25 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ x, n, expected }) => {
	const r1 = myPow(x, n);
	const r2 = myPow2(x, n);
	console.log(`${x}^${n} -> v1:${r1} v2:${r2} ${Math.abs(r1 - expected) < 1e-9 && Math.abs(r2 - expected) < 1e-9 ? '✓' : `✗(expected ${expected})`}`);
});
}
