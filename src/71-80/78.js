/**
 * https://leetcode.cn/problems/subsets/
 */

/**
 * Backtracking — O(2^n * n) time
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
	const res = [];

	function bt(start, cur) {
		res.push([...cur]);
		for (let i = start; i < nums.length; i += 1) {
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
	{ nums: [1, 2, 3], expectedLen: 8 },
	{ nums: [0], expectedLen: 2 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expectedLen }) => {
	const r = subsets(nums);
	console.log(`[${nums}] -> ${r.length} subsets ${r.length === expectedLen ? '✓' : `✗`}: ${JSON.stringify(r)}`);
});
}
