/**
 * https://leetcode.cn/problems/integer-to-roman/
 */

/**
 * Greedy — O(1) time (bounded by value), O(1) space
 * Greedily subtract the largest roman value possible at each step.
 * The subtraction cases (IV, IX, etc.) are included as explicit entries.
 * @param {number} num
 * @return {string}
 */
const intToRoman = function (num) {
	const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
	let res = '';
	let n = num;

	for (let i = 0; i < vals.length; i += 1) {
		while (n >= vals[i]) {
			res += syms[i];
			n -= vals[i];
		}
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ num: 3749, expected: 'MMMDCCXLIX' },
	{ num: 58, expected: 'LVIII' },
	{ num: 1994, expected: 'MCMXCIV' },
	{ num: 4, expected: 'IV' },
	{ num: 9, expected: 'IX' },
];
console.log('--- Functional Tests ---');
tests.forEach(({ num, expected }) => {
	const r = intToRoman(num);
	console.log(`${num} -> "${r}" ${r === expected ? '✓' : `✗(expected "${expected}")`}`);
});
}
