/**
 * https://leetcode.cn/problems/combination-sum-ii/
 */

/**
 * Backtracking with duplicate skipping — O(2^n) worst case
 * Sort first. Each candidate can only be used once; skip duplicates at the
 * same recursion level to avoid repeated combinations.
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = function (candidates, target) {
	candidates.sort((a, b) => a - b);
	const res = [];

	function bt(start, cur, rem) {
		if (rem === 0) { res.push([...cur]); return; }
		for (let i = start; i < candidates.length; i += 1) {
			if (candidates[i] > rem) break;
			if (i > start && candidates[i] === candidates[i - 1]) continue; // skip duplicate
			cur.push(candidates[i]);
			bt(i + 1, cur, rem - candidates[i]);
			cur.pop();
		}
	}

	bt(0, [], target);
	return res;
};

if (require.main === module) {
const tests = [
	{ candidates: [10, 1, 2, 7, 6, 1, 5], target: 8, expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
	{ candidates: [2, 5, 2, 1, 2], target: 5, expected: [[1, 2, 2], [5]] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ candidates, target, expected }) => {
	const r = combinationSum2(candidates, target);
	console.log(`[${candidates}] target=${target} -> ${JSON.stringify(r)} ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
