/**
 * https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/
 */

/**
 * Binary Search with duplicate handling — O(log n) avg, O(n) worst
 * When nums[lo] === nums[mid], can't determine sorted half; just shrink lo.
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
const search = function (nums, target) {
	let lo = 0;
	let hi = nums.length - 1;

	while (lo <= hi) {
		const mid = (lo + hi) >> 1;
		if (nums[mid] === target) return true;
		if (nums[lo] === nums[mid]) { lo += 1; continue; }

		if (nums[lo] < nums[mid]) {
			if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
			else lo = mid + 1;
		} else {
			if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
			else hi = mid - 1;
		}
	}

	return false;
};

if (require.main === module) {
const tests = [
	{ nums: [2,5,6,0,0,1,2], target: 0, expected: true },
	{ nums: [2,5,6,0,0,1,2], target: 3, expected: false },
	{ nums: [1,0,1,1,1], target: 0, expected: true },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, target, expected }) => {
	const r = search(nums, target);
	console.log(`[${nums}] target=${target} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
