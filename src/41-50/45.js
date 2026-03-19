/**
 * https://leetcode.cn/problems/jump-game-ii/
 */

/**
 * Greedy — O(n) time, O(1) space
 * Track current reach and farthest reachable. When i exceeds current reach,
 * we must jump — increment jumps and extend reach to farthest.
 * @param {number[]} nums
 * @return {number}
 */
const jump = function (nums) {
	let jumps = 0;
	let curEnd = 0;
	let farthest = 0;

	for (let i = 0; i < nums.length - 1; i += 1) {
		farthest = Math.max(farthest, i + nums[i]);
		if (i === curEnd) {
			jumps += 1;
			curEnd = farthest;
		}
	}

	return jumps;
};

if (require.main === module) {
const tests = [
	{ nums: [2, 3, 1, 1, 4], expected: 2 },
	{ nums: [2, 3, 0, 1, 4], expected: 2 },
	{ nums: [1], expected: 0 },
	{ nums: [1, 2], expected: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expected }) => {
	const r = jump(nums);
	console.log(`[${nums}] -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
