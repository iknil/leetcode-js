/**
 * https://leetcode.cn/problems/combination-sum/
 */

/**
 * Backtracking — O(n^(T/M)) time where T=target, M=min candidate
 * Sort candidates; at each step choose a candidate >= current start.
 * Same candidate can be reused (no index increment on pick).
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function (candidates, target) {
	candidates.sort((a, b) => a - b);
	const res = [];

	function bt(start, cur, rem) {
		if (rem === 0) { res.push([...cur]); return; }
		for (let i = start; i < candidates.length; i += 1) {
			if (candidates[i] > rem) break;
			cur.push(candidates[i]);
			bt(i, cur, rem - candidates[i]);
			cur.pop();
		}
	}

	bt(0, [], target);
	return res;
};

if (require.main === module) {
const tests = [
	{ candidates: [2, 3, 6, 7], target: 7, expected: [[2, 2, 3], [7]] },
	{ candidates: [2, 3, 5], target: 8, expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
	{ candidates: [2], target: 1, expected: [] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ candidates, target, expected }) => {
	const r = combinationSum(candidates, target);
	console.log(`[${candidates}] target=${target} -> ${JSON.stringify(r)} ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
