/**
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/
 */

/**
 * Monotonic Stack — O(n) time, O(n) space
 * Maintain increasing stack of indices. On popping, compute rectangle area
 * using the popped height and current width.
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
	const stack = [-1]; // sentinel
	let max = 0;
	const h = [...heights, 0]; // append 0 to flush stack

	for (let i = 0; i < h.length; i += 1) {
		while (stack.length > 1 && h[stack[stack.length - 1]] > h[i]) {
			const height = h[stack.pop()];
			const width = i - stack[stack.length - 1] - 1;
			max = Math.max(max, height * width);
		}
		stack.push(i);
	}

	return max;
};

if (require.main === module) {
const tests = [
	{ heights: [2,1,5,6,2,3], expected: 10 },
	{ heights: [2,4], expected: 4 },
	{ heights: [1,1], expected: 2 },
	{ heights: [6,2,5,4,5,1,6], expected: 12 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ heights, expected }) => {
	const r = largestRectangleArea(heights);
	console.log(`[${heights}] -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
