/**
 * https://leetcode.cn/problems/median-of-two-sorted-arrays/
 */

/**
 * Merge + Select — O((m+n)) time, O(1) space
 * Walk both arrays with two pointers, advance to the median position.
 * Simple but does not meet the O(log(m+n)) follow-up.
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = function (nums1, nums2) {
	const m = nums1.length;
	const n = nums2.length;
	const total = m + n;
	const half = Math.floor(total / 2);

	let i = 0;
	let j = 0;
	let prev = 0;
	let curr = 0;

	for (let k = 0; k <= half; k += 1) {
		prev = curr;
		if (i < m && (j >= n || nums1[i] <= nums2[j])) {
			curr = nums1[i];
			i += 1;
		} else {
			curr = nums2[j];
			j += 1;
		}
	}

	return total % 2 === 1 ? curr : (prev + curr) / 2;
};

/**
 * Binary Search on partition — O(log(min(m,n))) time, O(1) space
 * Binary search on the smaller array to find the correct partition.
 * A valid partition satisfies: max(left1, left2) <= min(right1, right2).
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays2 = function (nums1, nums2) {
	// Always binary search on the shorter array
	if (nums1.length > nums2.length) return findMedianSortedArrays2(nums2, nums1);

	const m = nums1.length;
	const n = nums2.length;
	let lo = 0;
	let hi = m;

	while (lo <= hi) {
		const cut1 = Math.floor((lo + hi) / 2); // elements taken from nums1's left side
		const cut2 = Math.floor((m + n + 1) / 2) - cut1; // remaining from nums2

		const l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
		const r1 = cut1 === m ? Infinity : nums1[cut1];
		const l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
		const r2 = cut2 === n ? Infinity : nums2[cut2];

		if (l1 <= r2 && l2 <= r1) {
			// Found valid partition
			const maxLeft = Math.max(l1, l2);
			if ((m + n) % 2 === 1) return maxLeft;
			return (maxLeft + Math.min(r1, r2)) / 2;
		}

		if (l1 > r2) {
			hi = cut1 - 1; // take fewer from nums1
		} else {
			lo = cut1 + 1; // take more from nums1
		}
	}

	return 0;
};

// --- Local Tests ---
if (require.main === module) {
const tests = [
	{ nums1: [1, 3], nums2: [2], expected: 2.0 },
	{ nums1: [1, 2], nums2: [3, 4], expected: 2.5 },
	{ nums1: [], nums2: [1], expected: 1.0 },
	{ nums1: [2], nums2: [], expected: 2.0 },
	{ nums1: [0, 0], nums2: [0, 0], expected: 0.0 },
	{ nums1: [1, 3, 5, 7], nums2: [2, 4, 6, 8], expected: 4.5 },
];

console.log('--- Functional Tests ---');
tests.forEach(({ nums1, nums2, expected }) => {
	const r1 = findMedianSortedArrays(nums1, nums2);
	const r2 = findMedianSortedArrays2(nums1, nums2);
	const ok1 = r1 === expected ? '✓' : `✗(expected ${expected})`;
	const ok2 = r2 === expected ? '✓' : `✗(expected ${expected})`;
	console.log(`[${nums1}] / [${nums2}] -> v1: ${r1} ${ok1}  v2: ${r2} ${ok2}`);
});

console.log('\n--- Performance Comparison (100,000 iterations) ---');
const a = Array.from({ length: 500 }, (_, i) => i * 2);
const b = Array.from({ length: 500 }, (_, i) => i * 2 + 1);
const iterations = 100000;

console.time('findMedianSortedArrays (Merge)');
for (let i = 0; i < iterations; i += 1) findMedianSortedArrays(a, b);
console.timeEnd('findMedianSortedArrays (Merge)');

console.time('findMedianSortedArrays2 (BinarySearch)');
for (let i = 0; i < iterations; i += 1) findMedianSortedArrays2(a, b);
console.timeEnd('findMedianSortedArrays2 (BinarySearch)');
}
