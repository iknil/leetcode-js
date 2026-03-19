/**
 * https://leetcode.cn/problems/search-a-2d-matrix/
 */

/**
 * Binary search treating matrix as flat array — O(log(m*n)) time, O(1) space
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = function (matrix, target) {
	const m = matrix.length;
	const n = matrix[0].length;
	let lo = 0;
	let hi = m * n - 1;

	while (lo <= hi) {
		const mid = (lo + hi) >> 1;
		const val = matrix[Math.floor(mid / n)][mid % n];
		if (val === target) return true;
		if (val < target) lo = mid + 1;
		else hi = mid - 1;
	}

	return false;
};

if (require.main === module) {
const tests = [
	{ matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3, expected: true },
	{ matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 13, expected: false },
];
console.log('--- Functional Tests ---');
tests.forEach(({ matrix, target, expected }) => {
	const r = searchMatrix(matrix, target);
	console.log(`target=${target} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
