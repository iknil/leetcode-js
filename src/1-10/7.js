/**
 * https://leetcode.cn/problems/reverse-integer/
 */

/**
 * Math — O(log x) time, O(1) space
 * Pop digits from x one by one and push onto result.
 * Check for 32-bit signed overflow before each push.
 * Constraint: no 64-bit integers allowed.
 * @param {number} x
 * @return {number}
 */
const reverse = function (x) {
	const MAX = 2147483647; // 2^31 - 1
	const MIN = -2147483648; // -2^31
	let res = 0;
	let rem = x;

	while (rem !== 0) {
		const digit = rem % 10; // handles negative correctly in JS (sign follows dividend)
		rem = Math.trunc(rem / 10);

		// Check overflow before multiplying
		if (res > Math.trunc(MAX / 10) || (res === Math.trunc(MAX / 10) && digit > MAX % 10)) return 0;
		if (res < Math.trunc(MIN / 10) || (res === Math.trunc(MIN / 10) && digit < MIN % 10)) return 0;

		res = res * 10 + digit;
	}

	return res;
};

/**
 * String Conversion — O(log x) time, O(log x) space
 * Simple approach: convert to string, reverse, parse back.
 * Still needs overflow check.
 * @param {number} x
 * @return {number}
 */
const reverse2 = function (x) {
	const sign = x < 0 ? -1 : 1;
	const reversed = Math.abs(x).toString().split('').reverse().join('');
	const res = sign * Number(reversed);

	if (res > 2147483647 || res < -2147483648) return 0;
	return res;
};

// --- Local Tests ---
if (require.main === module) {
const tests = [
	{ x: 123, expected: 321 },
	{ x: -123, expected: -321 },
	{ x: 120, expected: 21 },
	{ x: 0, expected: 0 },
	{ x: 1534236469, expected: 0 }, // overflow
	{ x: -2147483648, expected: 0 }, // MIN_INT overflow on reverse
	{ x: 1000000003, expected: 0 }, // 3000000001 > MAX_INT
];

console.log('--- Functional Tests ---');
tests.forEach(({ x, expected }) => {
	const r1 = reverse(x);
	const r2 = reverse2(x);
	const ok1 = r1 === expected ? '✓' : `✗(expected ${expected})`;
	const ok2 = r2 === expected ? '✓' : `✗(expected ${expected})`;
	console.log(`${x} -> v1: ${r1} ${ok1}  v2: ${r2} ${ok2}`);
});

console.log('\n--- Performance Comparison (1,000,000 iterations) ---');
const iterations = 1000000;

console.time('reverse (Math)');
for (let i = 0; i < iterations; i += 1) reverse(1534236469);
console.timeEnd('reverse (Math)');

console.time('reverse2 (String)');
for (let i = 0; i < iterations; i += 1) reverse2(1534236469);
console.timeEnd('reverse2 (String)');
}
