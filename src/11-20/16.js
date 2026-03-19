/**
 * https://leetcode.cn/problems/3sum-closest/
 */

/**
 * Sort + Two Pointers — O(n²) time, O(log n) space (sort)
 * Fix one element, use two pointers on the rest. Move pointers based on
 * whether current sum is less or greater than target.
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function (nums, target) {
	nums.sort((a, b) => a - b);
	let closest = nums[0] + nums[1] + nums[2];

	for (let i = 0; i < nums.length - 2; i += 1) {
		let l = i + 1;
		let r = nums.length - 1;

		while (l < r) {
			const sum = nums[i] + nums[l] + nums[r];
			if (Math.abs(sum - target) < Math.abs(closest - target)) closest = sum;
			if (sum === target) return sum;
			if (sum < target) l += 1;
			else r -= 1;
		}
	}

	return closest;
};

if (require.main === module) {
const tests = [
	{ nums: [-1, 2, 1, -4], target: 1, expected: 2 },
	{ nums: [0, 0, 0], target: 1, expected: 0 },
	{ nums: [1, 1, 1, 0], target: -100, expected: 2 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, target, expected }) => {
	const r = threeSumClosest(nums, target);
	console.log(`[${nums}] target=${target} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
