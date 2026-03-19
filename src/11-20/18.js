/**
 * https://leetcode.cn/problems/4sum/
 */

/**
 * Sort + Two Pointers — O(n³) time, O(log n) space
 * Fix two outer elements, use two pointers for the inner pair.
 * Skip duplicates at each level to avoid repeated results.
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const fourSum = function (nums, target) {
	nums.sort((a, b) => a - b);
	const res = [];
	const n = nums.length;

	for (let i = 0; i < n - 3; i += 1) {
		if (i > 0 && nums[i] === nums[i - 1]) continue;
		for (let j = i + 1; j < n - 2; j += 1) {
			if (j > i + 1 && nums[j] === nums[j - 1]) continue;
			let l = j + 1;
			let r = n - 1;
			while (l < r) {
				const sum = nums[i] + nums[j] + nums[l] + nums[r];
				if (sum === target) {
					res.push([nums[i], nums[j], nums[l], nums[r]]);
					while (l < r && nums[l] === nums[l + 1]) l += 1;
					while (l < r && nums[r] === nums[r - 1]) r -= 1;
					l += 1;
					r -= 1;
				} else if (sum < target) {
					l += 1;
				} else {
					r -= 1;
				}
			}
		}
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ nums: [1, 0, -1, 0, -2, 2], target: 0, expected: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
	{ nums: [2, 2, 2, 2, 2], target: 8, expected: [[2, 2, 2, 2]] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, target, expected }) => {
	const r = fourSum(nums, target);
	console.log(`[${nums}] target=${target} -> ${JSON.stringify(r)} (expected ${JSON.stringify(expected)})`);
});
}
