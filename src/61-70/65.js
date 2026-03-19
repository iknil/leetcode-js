/**
 * https://leetcode.cn/problems/valid-number/
 */

/**
 * State machine / flag-based parsing — O(n) time, O(1) space
 * Track: seenDigit, seenDot, seenE, seenDigitAfterE, seenSign
 * @param {string} s
 * @return {boolean}
 */
const isNumber = function (s) {
	let seenDigit = false;
	let seenDot = false;
	let seenE = false;
	let seenDigitAfterE = true; // becomes false after 'e'/'E'

	for (let i = 0; i < s.length; i += 1) {
		const c = s[i];
		if (c >= '0' && c <= '9') {
			seenDigit = true;
			if (seenE) seenDigitAfterE = true;
		} else if (c === '.') {
			if (seenDot || seenE) return false;
			seenDot = true;
		} else if (c === 'e' || c === 'E') {
			if (seenE || !seenDigit) return false;
			seenE = true;
			seenDigitAfterE = false;
		} else if (c === '+' || c === '-') {
			if (i !== 0 && s[i - 1] !== 'e' && s[i - 1] !== 'E') return false;
		} else {
			return false;
		}
	}

	return seenDigit && seenDigitAfterE;
};

if (require.main === module) {
const tests = [
	{ s: '2', expected: true },
	{ s: '0089', expected: true },
	{ s: '-0.1', expected: true },
	{ s: '+3.14', expected: true },
	{ s: '4.', expected: true },
	{ s: '-.9', expected: true },
	{ s: '2e10', expected: true },
	{ s: '-90E3', expected: true },
	{ s: '3e+7', expected: true },
	{ s: '+6e-1', expected: true },
	{ s: '53.5e93', expected: true },
	{ s: '-123.456e789', expected: true },
	{ s: 'abc', expected: false },
	{ s: '1a', expected: false },
	{ s: '1e', expected: false },
	{ s: 'e3', expected: false },
	{ s: '99e2.5', expected: false },
	{ s: '--6', expected: false },
	{ s: '-+3', expected: false },
	{ s: '95a54e53', expected: false },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s, expected }) => {
	const r = isNumber(s);
	console.log(`"${s}" -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
