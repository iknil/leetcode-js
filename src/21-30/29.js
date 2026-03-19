/**
 * https://leetcode.cn/problems/divide-two-integers/
 */

/**
 * Bit Shifting — O(log² n) time, O(1) space
 * Without using multiplication/division. Double the divisor via shifts until
 * it exceeds dividend; then subtract and repeat with smaller shifts.
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
const divide = function (dividend, divisor) {
	const MAX = 2147483647;
	const MIN = -2147483648;

	if (dividend === MIN && divisor === -1) return MAX; // overflow

	const sign = (dividend > 0) === (divisor > 0) ? 1 : -1;
	let a = Math.abs(dividend);
	const b = Math.abs(divisor);
	let res = 0;

	while (a >= b) {
		let tmp = b;
		let multiple = 1;
		while (tmp <= a - tmp) { // avoid overflow: tmp*2 <= a
			tmp += tmp;
			multiple += multiple;
		}
		a -= tmp;
		res += multiple;
	}

	return sign === 1 ? res : -res;
};

if (require.main === module) {
const tests = [
	{ dividend: 10, divisor: 3, expected: 3 },
	{ dividend: 7, divisor: -3, expected: -2 },
	{ dividend: -2147483648, divisor: -1, expected: 2147483647 },
	{ dividend: 0, divisor: 1, expected: 0 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ dividend, divisor, expected }) => {
	const r = divide(dividend, divisor);
	console.log(`${dividend}/${divisor} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
