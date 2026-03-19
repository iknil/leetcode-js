/**
 * https://leetcode.cn/problems/valid-sudoku/
 */

/**
 * Three Sets (rows, cols, boxes) — O(1) time/space (fixed 9×9 board)
 * Check each number appears at most once in its row, column, and 3×3 box.
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
	const rows = Array.from({ length: 9 }, () => new Set());
	const cols = Array.from({ length: 9 }, () => new Set());
	const boxes = Array.from({ length: 9 }, () => new Set());

	for (let r = 0; r < 9; r += 1) {
		for (let c = 0; c < 9; c += 1) {
			const val = board[r][c];
			if (val === '.') continue;

			const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
			if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) return false;
			rows[r].add(val);
			cols[c].add(val);
			boxes[boxIdx].add(val);
		}
	}

	return true;
};

if (require.main === module) {
const valid = [
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
const invalid = JSON.parse(JSON.stringify(valid));
invalid[0][0] = '8'; // duplicate 8 in row 0 and box 0
console.log('--- Functional Tests ---');
console.log(`Valid board -> ${isValidSudoku(valid)} ✓`);
console.log(`Invalid board -> ${isValidSudoku(invalid)} ✓`);
}
