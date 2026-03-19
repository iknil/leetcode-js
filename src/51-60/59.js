/**
 * https://leetcode.cn/problems/spiral-matrix-ii/
 */

/**
 * Layer-by-layer fill — O(n²) time, O(1) extra space
 * Fill the matrix in spiral order with 1..n².
 * @param {number} n
 * @return {number[][]}
 */
const generateMatrix = function (n) {
	const m = Array.from({ length: n }, () => new Array(n).fill(0));
	let top = 0; let bottom = n - 1; let left = 0; let right = n - 1;
	let num = 1;

	while (top <= bottom && left <= right) {
		for (let c = left; c <= right; c += 1) { m[top][c] = num; num += 1; }
		top += 1;
		for (let r = top; r <= bottom; r += 1) { m[r][right] = num; num += 1; }
		right -= 1;
		if (top <= bottom) {
			for (let c = right; c >= left; c -= 1) { m[bottom][c] = num; num += 1; }
			bottom -= 1;
		}
		if (left <= right) {
			for (let r = bottom; r >= top; r -= 1) { m[r][left] = num; num += 1; }
			left += 1;
		}
	}

	return m;
};

if (require.main === module) {
console.log('--- Functional Tests ---');
console.log(`n=3 -> ${JSON.stringify(generateMatrix(3))} ${JSON.stringify(generateMatrix(3)) === JSON.stringify([[1,2,3],[8,9,4],[7,6,5]]) ? '✓' : '✗'}`);
console.log(`n=1 -> ${JSON.stringify(generateMatrix(1))} ${JSON.stringify(generateMatrix(1)) === JSON.stringify([[1]]) ? '✓' : '✗'}`);
}
