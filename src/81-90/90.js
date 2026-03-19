/**
 * https://leetcode.cn/problems/subsets-ii/
 */

/**
 * Backtracking with duplicate skipping — O(2^n * n) time
 * Sort first. Skip num[i] if it equals num[i-1] at the same recursion level.
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = function (nums) {
	nums.sort((a, b) => a - b);
	const res = [];

	function bt(start, cur) {
		res.push([...cur]);
		for (let i = start; i < nums.length; i += 1) {
			if (i > start && nums[i] === nums[i - 1]) continue;
			cur.push(nums[i]);
			bt(i + 1, cur);
			cur.pop();
		}
	}

	bt(0, []);
	return res;
};

if (require.main === module) {
const tests = [
	{ nums: [1,2,2], expectedLen: 6 },
	{ nums: [0], expectedLen: 2 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expectedLen }) => {
	const r = subsetsWithDup([...nums]);
	console.log(`[${nums}] -> ${r.length} subsets ${r.length === expectedLen ? '✓' : `✗(expected ${expectedLen})`}: ${JSON.stringify(r)}`);
});
}
