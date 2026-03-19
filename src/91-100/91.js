/**
 * https://leetcode.cn/problems/decode-ways/
 */

/**
 * Dynamic Programming — O(n) time, O(1) space
 * dp[i] = number of ways to decode s[0..i-1].
 * Transition: check single digit s[i-1] and two-digit s[i-2..i-1].
 * @param {string} s
 * @return {number}
 */
const numDecodings = function (s) {
	if (s[0] === '0') return 0;
	let prev2 = 1; // dp[i-2]
	let prev1 = 1; // dp[i-1]

	for (let i = 2; i <= s.length; i += 1) {
		let cur = 0;
		const one = Number(s[i - 1]);
		const two = Number(s.slice(i - 2, i));
		if (one >= 1) cur += prev1;
		if (two >= 10 && two <= 26) cur += prev2;
		prev2 = prev1;
		prev1 = cur;
	}

	return prev1;
};

if (require.main === module) {
const tests = [
	{ s: '12', expected: 2 },
	{ s: '226', expected: 3 },
	{ s: '06', expected: 0 },
	{ s: '10', expected: 1 },
	{ s: '27', expected: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s, expected }) => {
	const r = numDecodings(s);
	console.log(`"${s}" -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
