/**
 * https://leetcode.cn/problems/minimum-window-substring/
 */

/**
 * Sliding Window — O(|s| + |t|) time, O(|t|) space
 * Expand right until all chars covered; shrink left while still covered.
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
	const need = {};
	for (const c of t) need[c] = (need[c] || 0) + 1;

	let have = 0;
	const required = Object.keys(need).length;
	const window = {};
	let minLen = Infinity;
	let minStart = 0;
	let l = 0;

	for (let r = 0; r < s.length; r += 1) {
		const c = s[r];
		window[c] = (window[c] || 0) + 1;
		if (need[c] !== undefined && window[c] === need[c]) have += 1;

		while (have === required) {
			if (r - l + 1 < minLen) { minLen = r - l + 1; minStart = l; }
			const lc = s[l];
			window[lc] -= 1;
			if (need[lc] !== undefined && window[lc] < need[lc]) have -= 1;
			l += 1;
		}
	}

	return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
};

if (require.main === module) {
const tests = [
	{ s: 'ADOBECODEBANC', t: 'ABC', expected: 'BANC' },
	{ s: 'a', t: 'a', expected: 'a' },
	{ s: 'a', t: 'aa', expected: '' },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s, t, expected }) => {
	const r = minWindow(s, t);
	console.log(`"${s}" / "${t}" -> "${r}" ${r === expected ? '✓' : `✗(expected "${expected}")`}`);
});
}
