/**
 * https://leetcode.cn/problems/minimum-path-sum/
 */

/**
 * DP in-place — O(m*n) time, O(1) space
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
	const m = grid.length;
	const n = grid[0].length;

	for (let i = 0; i < m; i += 1) {
		for (let j = 0; j < n; j += 1) {
			if (i === 0 && j === 0) continue;
			if (i === 0) grid[i][j] += grid[i][j - 1];
			else if (j === 0) grid[i][j] += grid[i - 1][j];
			else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
		}
	}

	return grid[m - 1][n - 1];
};

if (require.main === module) {
const tests = [
	{ grid: [[1,3,1],[1,5,1],[4,2,1]], expected: 7 },
	{ grid: [[1,2,3],[4,5,6]], expected: 12 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ grid, expected }) => {
	const r = minPathSum(grid.map((row) => [...row]));
	console.log(`-> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
