/**
 * https://leetcode.cn/problems/set-matrix-zeroes/
 */

/**
 * Use first row/col as markers — O(m*n) time, O(1) space
 * @param {number[][]} matrix
 * @return {void}
 */
const setZeroes = function (matrix) {
	const m = matrix.length;
	const n = matrix[0].length;
	let firstRowZero = false;
	let firstColZero = false;

	for (let j = 0; j < n; j += 1) if (matrix[0][j] === 0) firstRowZero = true;
	for (let i = 0; i < m; i += 1) if (matrix[i][0] === 0) firstColZero = true;

	for (let i = 1; i < m; i += 1) {
		for (let j = 1; j < n; j += 1) {
			if (matrix[i][j] === 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
		}
	}
	for (let i = 1; i < m; i += 1) {
		for (let j = 1; j < n; j += 1) {
			if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
		}
	}

	if (firstRowZero) for (let j = 0; j < n; j += 1) matrix[0][j] = 0;
	if (firstColZero) for (let i = 0; i < m; i += 1) matrix[i][0] = 0;
};

if (require.main === module) {
const m1 = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(m1);
console.log('--- Functional Tests ---');
console.log(JSON.stringify(m1), JSON.stringify(m1) === JSON.stringify([[1,0,1],[0,0,0],[1,0,1]]) ? '✓' : '✗');
const m2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]];
setZeroes(m2);
console.log(JSON.stringify(m2), JSON.stringify(m2) === JSON.stringify([[0,0,0,0],[0,4,5,0],[0,3,1,0]]) ? '✓' : '✗');
}
