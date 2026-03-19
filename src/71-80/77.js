/**
 * https://leetcode.cn/problems/combinations/
 */

/**
 * Backtracking — O(C(n,k) * k) time
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
	const res = [];

	function bt(start, cur) {
		if (cur.length === k) { res.push([...cur]); return; }
		// Pruning: need at least k - cur.length more numbers
		for (let i = start; i <= n - (k - cur.length) + 1; i += 1) {
			cur.push(i);
			bt(i + 1, cur);
			cur.pop();
		}
	}

	bt(1, []);
	return res;
};

if (require.main === module) {
const tests = [
	{ n: 4, k: 2, expected: 6 },
	{ n: 1, k: 1, expected: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ n, k, expected }) => {
	const r = combine(n, k);
	console.log(`C(${n},${k}) -> ${r.length} combinations ${r.length === expected ? '✓' : `✗`}: ${JSON.stringify(r)}`);
});
}
