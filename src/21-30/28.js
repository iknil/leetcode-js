/**
 * https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/
 */

/**
 * Built-in — O(n*m) average
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = function (haystack, needle) {
	return haystack.indexOf(needle);
};

/**
 * KMP — O(n+m) time, O(m) space
 * Build failure function (partial match table), then scan haystack.
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr2 = function (haystack, needle) {
	const n = haystack.length;
	const m = needle.length;
	if (m === 0) return 0;

	// Build KMP failure function
	const fail = new Array(m).fill(0);
	for (let i = 1; i < m; i += 1) {
		let j = fail[i - 1];
		while (j > 0 && needle[i] !== needle[j]) j = fail[j - 1];
		if (needle[i] === needle[j]) j += 1;
		fail[i] = j;
	}

	let j = 0;
	for (let i = 0; i < n; i += 1) {
		while (j > 0 && haystack[i] !== needle[j]) j = fail[j - 1];
		if (haystack[i] === needle[j]) j += 1;
		if (j === m) return i - m + 1;
	}

	return -1;
};

if (require.main === module) {
const tests = [
	{ haystack: 'sadbutsad', needle: 'sad', expected: 0 },
	{ haystack: 'leetcode', needle: 'leeto', expected: -1 },
	{ haystack: 'hello', needle: 'll', expected: 2 },
	{ haystack: 'aabaabaaf', needle: 'aabaaf', expected: 3 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ haystack, needle, expected }) => {
	const r1 = strStr(haystack, needle);
	const r2 = strStr2(haystack, needle);
	console.log(`"${haystack}" / "${needle}" -> v1:${r1} v2:${r2} ${r1 === expected && r2 === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
