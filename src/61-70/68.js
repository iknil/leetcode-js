/**
 * https://leetcode.cn/problems/text-justification/
 */

/**
 * Greedy line packing + space distribution — O(n * L) time
 * Pack as many words per line as possible. Distribute spaces evenly (extra
 * spaces go to leftmost gaps). Last line is left-justified.
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = function (words, maxWidth) {
	const res = [];
	let i = 0;

	while (i < words.length) {
		let lineLen = words[i].length;
		let j = i + 1;
		while (j < words.length && lineLen + 1 + words[j].length <= maxWidth) {
			lineLen += 1 + words[j].length;
			j += 1;
		}

		const lineWords = words.slice(i, j);
		const gaps = lineWords.length - 1;
		let line = '';

		if (j === words.length || gaps === 0) {
			// Last line or single word: left-justify
			line = lineWords.join(' ').padEnd(maxWidth, ' ');
		} else {
			const totalSpaces = maxWidth - lineWords.reduce((s, w) => s + w.length, 0);
			const space = Math.floor(totalSpaces / gaps);
			const extra = totalSpaces % gaps;
			for (let k = 0; k < lineWords.length - 1; k += 1) {
				line += lineWords[k] + ' '.repeat(space + (k < extra ? 1 : 0));
			}
			line += lineWords[lineWords.length - 1];
		}

		res.push(line);
		i = j;
	}

	return res;
};

if (require.main === module) {
const tests = [
	{
		words: ['This', 'is', 'an', 'example', 'of', 'text', 'justification.'],
		maxWidth: 16,
		expected: ['This    is    an', 'example  of text', 'justification.  '],
	},
	{
		words: ['What', 'must', 'be', 'acknowledgment', 'shall', 'be'],
		maxWidth: 16,
		expected: ['What   must   be', 'acknowledgment  ', 'shall be        '],
	},
];
console.log('--- Functional Tests ---');
tests.forEach(({ words, maxWidth, expected }) => {
	const r = fullJustify(words, maxWidth);
	const ok = JSON.stringify(r) === JSON.stringify(expected);
	r.forEach((line) => console.log(`|${line}|`));
	console.log(ok ? '✓' : `✗\nExpected:\n${expected.map((l) => `|${l}|`).join('\n')}`);
});
}
