/**
 * https://leetcode.cn/problems/spiral-matrix/
 */

/**
 * Layer-by-layer shrinking bounds — O(m*n) time, O(1) space
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = function (matrix) {
	const res = [];
	let top = 0; let bottom = matrix.length - 1;
	let left = 0; let right = matrix[0].length - 1;

	while (top <= bottom && left <= right) {
		for (let c = left; c <= right; c += 1) res.push(matrix[top][c]);
		top += 1;
		for (let r = top; r <= bottom; r += 1) res.push(matrix[r][right]);
		right -= 1;
		if (top <= bottom) {
			for (let c = right; c >= left; c -= 1) res.push(matrix[bottom][c]);
			bottom -= 1;
		}
		if (left <= right) {
			for (let r = bottom; r >= top; r -= 1) res.push(matrix[r][left]);
			left += 1;
		}
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ m: [[1,2,3],[4,5,6],[7,8,9]], expected: [1,2,3,6,9,8,7,4,5] },
	{ m: [[1,2,3,4],[5,6,7,8],[9,10,11,12]], expected: [1,2,3,4,8,12,11,10,9,5,6,7] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ m, expected }) => {
	const r = spiralOrder(m);
	console.log(`-> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
