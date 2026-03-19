/**
 * https://leetcode.cn/problems/rotate-image/
 */

/**
 * Transpose then reverse each row — O(n²) time, O(1) space
 * Clockwise 90°: transpose (swap [i][j] with [j][i]), then reverse each row.
 * @param {number[][]} matrix
 * @return {void}
 */
const rotate = function (matrix) {
	const n = matrix.length;

	// Transpose
	for (let i = 0; i < n; i += 1) {
		for (let j = i + 1; j < n; j += 1) {
			[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
		}
	}

	// Reverse each row
	for (let i = 0; i < n; i += 1) {
		matrix[i].reverse();
	}
};

if (require.main === module) {
const m1 = [[1,2,3],[4,5,6],[7,8,9]];
const m2 = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
console.log('--- Functional Tests ---');
rotate(m1);
console.log(`3x3 -> ${JSON.stringify(m1)} ${JSON.stringify(m1) === JSON.stringify([[7,4,1],[8,5,2],[9,6,3]]) ? '✓' : '✗'}`);
rotate(m2);
console.log(`4x4 -> ${JSON.stringify(m2)} ${JSON.stringify(m2) === JSON.stringify([[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]) ? '✓' : '✗'}`);
}
