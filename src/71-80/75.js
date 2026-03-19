/**
 * https://leetcode.cn/problems/sort-colors/
 */

/**
 * Dutch National Flag (Three-Way Partition) — O(n) time, O(1) space
 * Pointers: lo (0s boundary), mid (current), hi (2s boundary).
 * @param {number[]} nums
 * @return {void}
 */
const sortColors = function (nums) {
	let lo = 0;
	let mid = 0;
	let hi = nums.length - 1;

	while (mid <= hi) {
		if (nums[mid] === 0) {
			[nums[lo], nums[mid]] = [nums[mid], nums[lo]];
			lo += 1; mid += 1;
		} else if (nums[mid] === 1) {
			mid += 1;
		} else {
			[nums[mid], nums[hi]] = [nums[hi], nums[mid]];
			hi -= 1;
		}
	}
};

if (require.main === module) {
const tests = [
	{ nums: [2,0,2,1,1,0], expected: [0,0,1,1,2,2] },
	{ nums: [2,0,1], expected: [0,1,2] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expected }) => {
	const a = [...nums];
	sortColors(a);
	console.log(`[${nums}] -> [${a}] ${JSON.stringify(a) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
