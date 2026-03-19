/**
 * https://leetcode.cn/problems/sudoku-solver/
 */

/**
 * Backtracking — O(9^m) worst case where m is empty cells
 * Try digits 1-9 in each empty cell; backtrack on conflict.
 * @param {character[][]} board
 * @return {void}
 */
const solveSudoku = function (board) {
	const rows = Array.from({ length: 9 }, () => new Set());
	const cols = Array.from({ length: 9 }, () => new Set());
	const boxes = Array.from({ length: 9 }, () => new Set());
	const empty = [];

	for (let r = 0; r < 9; r += 1) {
		for (let c = 0; c < 9; c += 1) {
			const v = board[r][c];
			if (v !== '.') {
				rows[r].add(v); cols[c].add(v);
				boxes[Math.floor(r / 3) * 3 + Math.floor(c / 3)].add(v);
			} else {
				empty.push([r, c]);
			}
		}
	}

	function bt(idx) {
		if (idx === empty.length) return true;
		const [r, c] = empty[idx];
		const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

		for (let d = 1; d <= 9; d += 1) {
			const s = String(d);
			if (rows[r].has(s) || cols[c].has(s) || boxes[box].has(s)) continue;
			board[r][c] = s;
			rows[r].add(s); cols[c].add(s); boxes[box].add(s);
			if (bt(idx + 1)) return true;
			board[r][c] = '.';
			rows[r].delete(s); cols[c].delete(s); boxes[box].delete(s);
		}
		return false;
	}

	bt(0);
};

if (require.main === module) {
const board = [
	['5','3','.','.','7','.','.','.','.'],
	['6','.','.','1','9','5','.','.','.'],
	['.','9','8','.','.','.','.','6','.'],
	['8','.','.','.','6','.','.','.','3'],
	['4','.','.','8','.','3','.','.','1'],
	['7','.','.','.','2','.','.','.','6'],
	['.','6','.','.','.','.','2','8','.'],
	['.','.','.','4','1','9','.','.','5'],
	['.','.','.','.','8','.','.','7','9'],
];
console.log('--- Before ---');
board.forEach((row) => console.log(row.join(' ')));
solveSudoku(board);
console.log('--- After ---');
board.forEach((row) => console.log(row.join(' ')));
}
