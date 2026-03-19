/**
 * https://leetcode.cn/problems/unique-paths-ii/
 */

/**
 * DP with obstacle handling — O(m*n) time, O(n) space
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
	const m = obstacleGrid.length;
	const n = obstacleGrid[0].length;
	const dp = new Array(n).fill(0);
	dp[0] = obstacleGrid[0][0] === 1 ? 0 : 1;

	for (let i = 0; i < m; i += 1) {
		for (let j = 0; j < n; j += 1) {
			if (obstacleGrid[i][j] === 1) {
				dp[j] = 0;
			} else if (j > 0) {
				dp[j] += dp[j - 1];
			}
		}
	}

	return dp[n - 1];
};

if (require.main === module) {
const tests = [
	{ grid: [[0,0,0],[0,1,0],[0,0,0]], expected: 2 },
	{ grid: [[0,1],[0,0]], expected: 1 },
	{ grid: [[1]], expected: 0 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ grid, expected }) => {
	const r = uniquePathsWithObstacles(grid.map((row) => [...row]));
	console.log(`-> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
