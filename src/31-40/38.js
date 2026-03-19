/**
 * https://leetcode.cn/problems/count-and-say/
 */

/**
 * Simulation — O(n * m) time where m is average sequence length
 * Iteratively build each sequence from the previous one.
 * @param {number} n
 * @return {string}
 */
const countAndSay = function (n) {
	let s = '1';

	for (let i = 1; i < n; i += 1) {
		let next = '';
		let j = 0;
		while (j < s.length) {
			const ch = s[j];
			let count = 0;
			while (j < s.length && s[j] === ch) { j += 1; count += 1; }
			next += count + ch;
		}
		s = next;
	}

	return s;
};

if (require.main === module) {
const tests = [
	{ n: 1, expected: '1' },
	{ n: 2, expected: '11' },
	{ n: 3, expected: '21' },
	{ n: 4, expected: '1211' },
	{ n: 5, expected: '111221' },
];
console.log('--- Functional Tests ---');
tests.forEach(({ n, expected }) => {
	const r = countAndSay(n);
	console.log(`n=${n} -> "${r}" ${r === expected ? '✓' : `✗(expected "${expected}")`}`);
});
}
