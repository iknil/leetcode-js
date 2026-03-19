/**
 * https://leetcode.cn/problems/next-permutation/
 */

/**
 * Two-pass scan — O(n) time, O(1) space
 * 1. Find rightmost index i where nums[i] < nums[i+1] (pivot).
 * 2. Find rightmost j > i where nums[j] > nums[i]; swap.
 * 3. Reverse the suffix after i.
 * @param {number[]} nums
 * @return {void}
 */
const nextPermutation = function (nums) {
	const n = nums.length;
	let i = n - 2;

	while (i >= 0 && nums[i] >= nums[i + 1]) i -= 1;

	if (i >= 0) {
		let j = n - 1;
		while (nums[j] <= nums[i]) j -= 1;
		[nums[i], nums[j]] = [nums[j], nums[i]];
	}

	// Reverse suffix
	let l = i + 1;
	let r = n - 1;
	while (l < r) {
		[nums[l], nums[r]] = [nums[r], nums[l]];
		l += 1; r -= 1;
	}
};

if (require.main === module) {
const tests = [
	{ nums: [1, 2, 3], expected: [1, 3, 2] },
	{ nums: [3, 2, 1], expected: [1, 2, 3] },
	{ nums: [1, 1, 5], expected: [1, 5, 1] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expected }) => {
	const a = [...nums];
	nextPermutation(a);
	console.log(`[${nums}] -> [${a}] ${JSON.stringify(a) === JSON.stringify(expected) ? '✓' : `✗(expected [${expected}])`}`);
});
}
