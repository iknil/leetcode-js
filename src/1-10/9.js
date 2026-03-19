/**
 * https://leetcode.cn/problems/palindrome-number/
 */

/**
 * Reverse Half — O(log x) time, O(1) space
 * Negative numbers and numbers ending in 0 (except 0 itself) are never palindromes.
 * Reverse only the second half of the number and compare with the first half.
 * No string conversion needed.
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
	if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

	let reversed = 0;
	let num = x;

	// Stop when the first half is no longer greater than the reversed second half
	while (num > reversed) {
		reversed = reversed * 10 + (num % 10);
		num = Math.trunc(num / 10);
	}

	// Even length: num === reversed
	// Odd length: num === Math.trunc(reversed / 10) (middle digit is in reversed)
	return num === reversed || num === Math.trunc(reversed / 10);
};

/**
 * String Conversion — O(log x) time, O(log x) space
 * Simple: convert to string and compare with its reverse.
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome2 = function (x) {
	if (x < 0) return false;
	const s = x.toString();
	return s === s.split('').reverse().join('');
};

// --- Local Tests ---
if (require.main === module) {
const tests = [
	{ x: 121, expected: true },
	{ x: -121, expected: false },
	{ x: 10, expected: false },
	{ x: 0, expected: true },
	{ x: 1221, expected: true },
	{ x: 1000021, expected: false },
	{ x: 11, expected: true },
];

console.log('--- Functional Tests ---');
tests.forEach(({ x, expected }) => {
	const r1 = isPalindrome(x);
	const r2 = isPalindrome2(x);
	const ok1 = r1 === expected ? '✓' : `✗(expected ${expected})`;
	const ok2 = r2 === expected ? '✓' : `✗(expected ${expected})`;
	console.log(`${x} -> v1: ${r1} ${ok1}  v2: ${r2} ${ok2}`);
});

console.log('\n--- Performance Comparison (1,000,000 iterations) ---');
const iterations = 1000000;

console.time('isPalindrome (ReverseHalf)');
for (let i = 0; i < iterations; i += 1) isPalindrome(1234321);
console.timeEnd('isPalindrome (ReverseHalf)');

console.time('isPalindrome2 (String)');
for (let i = 0; i < iterations; i += 1) isPalindrome2(1234321);
console.timeEnd('isPalindrome2 (String)');
}
