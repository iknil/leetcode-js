/**
 * https://leetcode.cn/problems/permutations/
 */

/**
 * Backtracking — O(n * n!) time
 * Swap current position with each remaining position; recurse; swap back.
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
	const res = [];

	function bt(start) {
		if (start === nums.length) { res.push([...nums]); return; }
		for (let i = start; i < nums.length; i += 1) {
			[nums[start], nums[i]] = [nums[i], nums[start]];
			bt(start + 1);
			[nums[start], nums[i]] = [nums[i], nums[start]];
		}
	}

	bt(0);
	return res;
};

if (require.main === module) {
const tests = [
	{ nums: [1, 2, 3], count: 6 },
	{ nums: [0, 1], count: 2 },
	{ nums: [1], count: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, count }) => {
	const r = permute(nums);
	console.log(`[${nums}] -> ${r.length} permutations ${r.length === count ? '✓' : `✗(expected ${count})`} : ${JSON.stringify(r)}`);
});
}
