/**
 * https://leetcode.cn/problems/search-in-rotated-sorted-array/
 */

/**
 * Binary Search — O(log n) time, O(1) space
 * One half of [lo, hi] is always sorted. Determine which half is sorted,
 * check if target is in that half, then narrow accordingly.
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
	let lo = 0;
	let hi = nums.length - 1;

	while (lo <= hi) {
		const mid = Math.floor((lo + hi) / 2);
		if (nums[mid] === target) return mid;

		if (nums[lo] <= nums[mid]) {
			// Left half is sorted
			if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
			else lo = mid + 1;
		} else {
			// Right half is sorted
			if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
			else hi = mid - 1;
		}
	}

	return -1;
};

if (require.main === module) {
const tests = [
	{ nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
	{ nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
	{ nums: [1], target: 0, expected: -1 },
	{ nums: [1, 3], target: 3, expected: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, target, expected }) => {
	const r = search(nums, target);
	console.log(`[${nums}] target=${target} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
