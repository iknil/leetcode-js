/**
 * https://leetcode.cn/problems/jump-game/
 */

/**
 * Greedy — O(n) time, O(1) space
 * Track the farthest index reachable. If current index exceeds it, unreachable.
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = function (nums) {
	let farthest = 0;

	for (let i = 0; i < nums.length; i += 1) {
		if (i > farthest) return false;
		farthest = Math.max(farthest, i + nums[i]);
	}

	return true;
};

if (require.main === module) {
const tests = [
	{ nums: [2, 3, 1, 1, 4], expected: true },
	{ nums: [3, 2, 1, 0, 4], expected: false },
	{ nums: [0], expected: true },
	{ nums: [2, 0, 0], expected: true },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expected }) => {
	const r = canJump(nums);
	console.log(`[${nums}] -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
