/**
 * https://leetcode.cn/problems/n-queens/
 */

/**
 * Backtracking with column/diagonal sets — O(n!) time, O(n) space
 * Track occupied columns and diagonals (r-c and r+c) to validate placement.
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function (n) {
	const res = [];
	const cols = new Set();
	const diag1 = new Set(); // r - c
	const diag2 = new Set(); // r + c
	const board = Array.from({ length: n }, () => new Array(n).fill('.'));

	function bt(row) {
		if (row === n) {
			res.push(board.map((r) => r.join('')));
			return;
		}
		for (let c = 0; c < n; c += 1) {
			if (cols.has(c) || diag1.has(row - c) || diag2.has(row + c)) continue;
			cols.add(c); diag1.add(row - c); diag2.add(row + c);
			board[row][c] = 'Q';
			bt(row + 1);
			board[row][c] = '.';
			cols.delete(c); diag1.delete(row - c); diag2.delete(row + c);
		}
	}

	bt(0);
	return res;
};

if (require.main === module) {
console.log('--- Functional Tests ---');
console.log(`n=4 -> ${solveNQueens(4).length} solutions (expected 2) ${solveNQueens(4).length === 2 ? '✓' : '✗'}`);
console.log(`n=1 -> ${solveNQueens(1).length} solution (expected 1) ${solveNQueens(1).length === 1 ? '✓' : '✗'}`);
console.log(`n=4 solutions: ${JSON.stringify(solveNQueens(4))}`);
}
