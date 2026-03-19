/**
 * https://leetcode.cn/problems/maximal-rectangle/
 */

/**
 * Histogram + Monotonic Stack — O(m*n) time, O(n) space
 * Build histogram row by row. For each row, compute largest rectangle in
 * histogram (same as problem #84).
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalRectangle = function (matrix) {
	if (!matrix.length) return 0;
	const n = matrix[0].length;
	const heights = new Array(n).fill(0);
	let max = 0;

	function largestInHistogram(h) {
		const stack = [-1];
		let area = 0;
		const arr = [...h, 0];
		for (let i = 0; i < arr.length; i += 1) {
			while (stack.length > 1 && arr[stack[stack.length - 1]] > arr[i]) {
				const ht = arr[stack.pop()];
				const w = i - stack[stack.length - 1] - 1;
				area = Math.max(area, ht * w);
			}
			stack.push(i);
		}
		return area;
	}

	for (const row of matrix) {
		for (let j = 0; j < n; j += 1) {
			heights[j] = row[j] === '1' ? heights[j] + 1 : 0;
		}
		max = Math.max(max, largestInHistogram(heights));
	}

	return max;
};

if (require.main === module) {
const tests = [
	{
		matrix: [['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']],
		expected: 6,
	},
	{ matrix: [['0']], expected: 0 },
	{ matrix: [['1']], expected: 1 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ matrix, expected }) => {
	const r = maximalRectangle(matrix);
	console.log(`-> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
