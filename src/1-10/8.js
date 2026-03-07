/**
 * @param {string} s
 * @return {number}
 */
const myAtoi = function (s) {
	let i = 0;
	let sign = 1;
	let res = 0;
	const len = s.length;
	const INT_MAX = 2 ** 31 - 1;
	const INT_MIN = -(2 ** 31);

	// 1. Skip leading whitespaces
	while (i < len && s[i] === ' ') {
		i += 1;
	}

	// 2. Handle sign
	if (i < len && (s[i] === '+' || s[i] === '-')) {
		sign = s[i] === '-' ? -1 : 1;
		i += 1;
	}

	// 3. Convert digits
	while (i < len && s[i] >= '0' && s[i] <= '9') {
		const digit = s[i] - '0';

		// Check overflow
		if (res > Math.floor(INT_MAX / 10) || (res === Math.floor(INT_MAX / 10) && digit > 7)) {
			return sign === 1 ? INT_MAX : INT_MIN;
		}

		res = res * 10 + digit;
		i += 1;
	}

	return res * sign;
};

/**
 * @param {string} s
 * @return {number}
 */
const myAtoi2 = function (s) {
	// parseInt matches the atoi rules for whitespace, sign, and stopping at non-digits
	const res = parseInt(s, 10);

	// parseInt returns NaN if it can't find a valid prefix
	if (Number.isNaN(res)) {
		return 0;
	}

	// Clamp to 32-bit signed integer range
	const INT_MAX = 2147483647; // 2**31 - 1
	const INT_MIN = -2147483648; // -(2**31)

	if (res > INT_MAX) return INT_MAX;
	if (res < INT_MIN) return INT_MIN;

	return res;
};

// Test cases
const tests = [
	'42',
	'   -42',
	'4193 with words',
	'words and 987',
	'-91283472332',
	'2147483648',
];

console.log('--- Functional Tests ---');
tests.forEach((t) => {
	console.log(`Input: "${t}" -> v1: ${myAtoi(t)}, v2: ${myAtoi2(t)}`);
});

console.log('\n--- Performance Comparison (1,000,000 iterations) ---');
const iter = 1000000;
const testStr = '   -12345678 handled by the engine';

console.time('myAtoi (Manual Pointer)');
for (let i = 0; i < iter; i += 1) {
	myAtoi(testStr);
}
console.timeEnd('myAtoi (Manual Pointer)');

console.time('myAtoi2 (parseInt)');
for (let i = 0; i < iter; i += 1) {
	myAtoi2(testStr);
}
console.timeEnd('myAtoi2 (parseInt)');
