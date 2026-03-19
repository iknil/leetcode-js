/**
 * https://leetcode.cn/problems/trapping-rain-water/
 */

/**
 * Two Pointers — O(n) time, O(1) space
 * Maintain maxLeft and maxRight. The shorter side determines how much water
 * can be trapped at the current pointer position.
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
	let l = 0;
	let r = height.length - 1;
	let maxL = 0;
	let maxR = 0;
	let water = 0;

	while (l < r) {
		if (height[l] < height[r]) {
			if (height[l] >= maxL) maxL = height[l];
			else water += maxL - height[l];
			l += 1;
		} else {
			if (height[r] >= maxR) maxR = height[r];
			else water += maxR - height[r];
			r -= 1;
		}
	}

	return water;
};

if (require.main === module) {
const tests = [
	{ height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expected: 6 },
	{ height: [4, 2, 0, 3, 2, 5], expected: 9 },
	{ height: [3, 0, 2, 0, 4], expected: 7 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ height, expected }) => {
	const r = trap(height);
	console.log(`[${height}] -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
