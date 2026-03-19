/**
 * https://leetcode.cn/problems/permutations-ii/
 */

/**
 * Backtracking with duplicate skipping — O(n * n!) worst case
 * Sort first. Use a `used` array; skip if nums[i] === nums[i-1] and nums[i-1]
 * was not used in current path (means same value at same position level).
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = function (nums) {
	nums.sort((a, b) => a - b);
	const res = [];
	const used = new Array(nums.length).fill(false);

	function bt(cur) {
		if (cur.length === nums.length) { res.push([...cur]); return; }
		for (let i = 0; i < nums.length; i += 1) {
			if (used[i]) continue;
			if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
			used[i] = true;
			cur.push(nums[i]);
			bt(cur);
			cur.pop();
			used[i] = false;
		}
	}

	bt([]);
	return res;
};

if (require.main === module) {
const tests = [
	{ nums: [1, 1, 2], count: 3 },
	{ nums: [1, 2, 3], count: 6 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, count }) => {
	const r = permuteUnique([...nums]);
	console.log(`[${nums}] -> ${r.length} permutations ${r.length === count ? '✓' : `✗(expected ${count})`}`);
});
}
