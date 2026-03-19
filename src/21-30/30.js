/**
 * https://leetcode.cn/problems/substring-with-concatenation-of-all-words/
 */

/**
 * Sliding Window with HashMap — O(n * m) time, O(m) space
 * For each possible starting offset (0..wordLen-1), slide a window of
 * totalLen over the string, maintaining a word-count map.
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
	if (!s.length || !words.length) return [];
	const wordLen = words[0].length;
	const wordCount = words.length;
	const totalLen = wordLen * wordCount;
	const res = [];

	const need = {};
	for (const w of words) need[w] = (need[w] || 0) + 1;

	for (let offset = 0; offset < wordLen; offset += 1) {
		let left = offset;
		let count = 0;
		const window = {};

		for (let right = offset; right + wordLen <= s.length; right += wordLen) {
			const word = s.slice(right, right + wordLen);
			if (need[word] !== undefined) {
				window[word] = (window[word] || 0) + 1;
				count += 1;
				while (window[word] > need[word]) {
					const lw = s.slice(left, left + wordLen);
					window[lw] -= 1;
					count -= 1;
					left += wordLen;
				}
				if (count === wordCount) res.push(left);
			} else {
				// Reset window
				for (const k of Object.keys(window)) window[k] = 0;
				count = 0;
				left = right + wordLen;
			}
		}
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ s: 'barfoothefoobarman', words: ['foo', 'bar'], expected: [0, 9] },
	{ s: 'wordgoodgoodgoodbestword', words: ['word', 'good', 'best', 'word'], expected: [] },
	{ s: 'barfoofoobarthefoobarman', words: ['bar', 'foo', 'the'], expected: [6, 9, 12] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s, words, expected }) => {
	const r = findSubstring(s, words);
	console.log(`"${s}" [${words}] -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : `✗(expected [${expected}])`}`);
});
}
