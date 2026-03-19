/**
 * https://leetcode.cn/problems/sqrtx/
 */

/**
 * Binary Search — O(log x) time, O(1) space
 * Find largest k where k² <= x.
 * @param {number} x
 * @return {number}
 */
const mySqrt = function (x) {
	if (x < 2) return x;
	let lo = 1;
	let hi = Math.floor(x / 2);

	while (lo <= hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (mid * mid === x) return mid;
		if (mid * mid < x) lo = mid + 1;
		else hi = mid - 1;
	}

	return hi;
};

if (require.main === module) {
const tests = [
	{ x: 4, expected: 2 },
	{ x: 8, expected: 2 },
	{ x: 0, expected: 0 },
	{ x: 1, expected: 1 },
	{ x: 2147395599, expected: 46339 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ x, expected }) => {
	const r = mySqrt(x);
	console.log(`sqrt(${x}) -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
