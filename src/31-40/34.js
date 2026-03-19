/**
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
 */

/**
 * Two Binary Searches — O(log n) time, O(1) space
 * One search finds the leftmost occurrence, another finds the rightmost.
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const searchRange = function (nums, target) {
	function lowerBound() {
		let lo = 0; let hi = nums.length - 1; let res = -1;
		while (lo <= hi) {
			const mid = (lo + hi) >> 1;
			if (nums[mid] === target) { res = mid; hi = mid - 1; }
			else if (nums[mid] < target) lo = mid + 1;
			else hi = mid - 1;
		}
		return res;
	}

	function upperBound() {
		let lo = 0; let hi = nums.length - 1; let res = -1;
		while (lo <= hi) {
			const mid = (lo + hi) >> 1;
			if (nums[mid] === target) { res = mid; lo = mid + 1; }
			else if (nums[mid] < target) lo = mid + 1;
			else hi = mid - 1;
		}
		return res;
	}

	return [lowerBound(), upperBound()];
};

if (require.main === module) {
const tests = [
	{ nums: [5, 7, 7, 8, 8, 10], target: 8, expected: [3, 4] },
	{ nums: [5, 7, 7, 8, 8, 10], target: 6, expected: [-1, -1] },
	{ nums: [], target: 0, expected: [-1, -1] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, target, expected }) => {
	const r = searchRange(nums, target);
	console.log(`[${nums}] target=${target} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : `✗`}`);
});
}
