/**
 * https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 */

/**
 * Backtracking — O(4^n * n) time, O(n) stack space
 * Map each digit to its letters, then recursively build all combinations.
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
	if (!digits.length) return [];

	const map = {
		2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',
		6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz',
	};
	const res = [];

	function bt(idx, cur) {
		if (idx === digits.length) {
			res.push(cur);
			return;
		}
		for (const ch of map[digits[idx]]) {
			bt(idx + 1, cur + ch);
		}
	}

	bt(0, '');
	return res;
};

if (require.main === module) {
const tests = [
	{ digits: '23', expected: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'] },
	{ digits: '', expected: [] },
	{ digits: '2', expected: ['a', 'b', 'c'] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ digits, expected }) => {
	const r = letterCombinations(digits);
	const ok = JSON.stringify(r) === JSON.stringify(expected);
	console.log(`"${digits}" -> [${r}] ${ok ? '✓' : `✗(expected [${expected}])`}`);
});
}
