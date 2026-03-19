/**
 * https://leetcode.cn/problems/n-queens-ii/
 */

/**
 * Backtracking with bitmasks — O(n!) time, O(n) space
 * @param {number} n
 * @return {number}
 */
const totalNQueens = function (n) {
	let count = 0;
	const cols = new Set();
	const diag1 = new Set();
	const diag2 = new Set();

	function bt(row) {
		if (row === n) { count += 1; return; }
		for (let c = 0; c < n; c += 1) {
			if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
			cols.add(c); diag1.add(row - c); diag2.add(row + c);
			bt(row + 1);
			cols.delete(c); diag1.delete(row - c); diag2.delete(row + c);
		}
	}

	bt(0);
	return count;
};

if (require.main === module) {
const tests = [{ n: 4, expected: 2 }, { n: 1, expected: 1 }];
console.log('--- Functional Tests ---');
tests.forEach(({ n, expected }) => {
	const r = totalNQueens(n);
	console.log(`n=${n} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
