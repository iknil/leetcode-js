/**
 * https://leetcode.cn/problems/maximum-subarray/
 */

/**
 * Kadane's Algorithm — O(n) time, O(1) space
 * Extend current subarray if it increases sum; otherwise start fresh.
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function (nums) {
	let cur = nums[0];
	let max = nums[0];

	for (let i = 1; i < nums.length; i += 1) {
		cur = Math.max(nums[i], cur + nums[i]);
		if (cur > max) max = cur;
	}

	return max;
};

if (require.main === module) {
const tests = [
	{ nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected: 6 },
	{ nums: [1], expected: 1 },
	{ nums: [5, 4, -1, 7, 8], expected: 23 },
	{ nums: [-1, -2, -3], expected: -1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expected }) => {
	const r = maxSubArray(nums);
	console.log(`[${nums}] -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
