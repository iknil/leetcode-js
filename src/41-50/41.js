/**
 * https://leetcode.cn/problems/first-missing-positive/
 */

/**
 * Index marking — O(n) time, O(1) space
 * Use the array itself as a hash. Place each value v in position v-1 if 1<=v<=n.
 * Then scan for the first index where nums[i] != i+1.
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = function (nums) {
	const n = nums.length;

	for (let i = 0; i < n; i += 1) {
		while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
			const j = nums[i] - 1;
			[nums[i], nums[j]] = [nums[j], nums[i]];
		}
	}

	for (let i = 0; i < n; i += 1) {
		if (nums[i] !== i + 1) return i + 1;
	}

	return n + 1;
};

if (require.main === module) {
const tests = [
	{ nums: [1, 2, 0], expected: 3 },
	{ nums: [3, 4, -1, 1], expected: 2 },
	{ nums: [7, 8, 9, 11, 12], expected: 1 },
	{ nums: [1], expected: 2 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expected }) => {
	const r = firstMissingPositive([...nums]);
	console.log(`[${nums}] -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
