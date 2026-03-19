/**
 * https://leetcode.cn/problems/group-anagrams/
 */

/**
 * Sort-key HashMap — O(n * k log k) time, O(n*k) space
 * Sort each word's characters to get a canonical key; group by key.
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
	const map = new Map();

	for (const s of strs) {
		const key = s.split('').sort().join('');
		if (!map.has(key)) map.set(key, []);
		map.get(key).push(s);
	}

	return [...map.values()];
};

if (require.main === module) {
const tests = [
	{ strs: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'], expectedLen: 3 },
	{ strs: [''], expectedLen: 1 },
	{ strs: ['a'], expectedLen: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ strs, expectedLen }) => {
	const r = groupAnagrams(strs);
	console.log(`[${strs}] -> ${r.length} groups ${r.length === expectedLen ? '✓' : `✗(expected ${expectedLen})`} : ${JSON.stringify(r)}`);
});
}
