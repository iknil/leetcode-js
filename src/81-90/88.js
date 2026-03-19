/**
 * https://leetcode.cn/problems/merge-sorted-array/
 */

/**
 * Two pointers from end — O(m+n) time, O(1) space
 * Fill nums1 from the back to avoid overwriting unread elements.
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void}
 */
const merge = function (nums1, m, nums2, n) {
	let i = m - 1;
	let j = n - 1;
	let k = m + n - 1;

	while (j >= 0) {
		if (i >= 0 && nums1[i] > nums2[j]) {
			nums1[k] = nums1[i];
			i -= 1;
		} else {
			nums1[k] = nums2[j];
			j -= 1;
		}
		k -= 1;
	}
};

if (require.main === module) {
const tests = [
	{ nums1: [1,2,3,0,0,0], m: 3, nums2: [2,5,6], n: 3, expected: [1,2,2,3,5,6] },
	{ nums1: [1], m: 1, nums2: [], n: 0, expected: [1] },
	{ nums1: [0], m: 0, nums2: [1], n: 1, expected: [1] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums1, m, nums2, n, expected }) => {
	const a = [...nums1];
	merge(a, m, nums2, n);
	console.log(`[${nums1.slice(0,m)}] + [${nums2}] -> [${a}] ${JSON.stringify(a) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
