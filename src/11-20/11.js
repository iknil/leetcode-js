/**
 * https://leetcode.cn/problems/container-with-most-water/
 */

/**
 * Two Pointers — O(n) time, O(1) space
 * Start with widest container. Move the shorter side inward — only moving
 * the taller side could never improve the area, so this is optimal.
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
	let l = 0;
	let r = height.length - 1;
	let max = 0;

	while (l < r) {
		const area = Math.min(height[l], height[r]) * (r - l);
		if (area > max) max = area;
		if (height[l] < height[r]) l += 1;
		else r -= 1;
	}

	return max;
};

if (require.main === module) {
const tests = [
	{ height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
	{ height: [1, 1], expected: 1 },
	{ height: [4, 3, 2, 1, 4], expected: 16 },
	{ height: [1, 2, 1], expected: 2 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ height, expected }) => {
	const r = maxArea(height);
	console.log(`[${height}] -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
