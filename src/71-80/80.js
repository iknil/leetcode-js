/**
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/
 */

/**
 * Two Pointers — O(n) time, O(1) space
 * Allow each element at most twice: compare with nums[k-2].
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
	let k = 0;
	for (const num of nums) {
		if (k < 2 || nums[k - 2] !== num) {
			nums[k] = num;
			k += 1;
		}
	}
	return k;
};

if (require.main === module) {
const tests = [
	{ nums: [1,1,1,2,2,3], expected: 5, arr: [1,1,2,2,3] },
	{ nums: [0,0,1,1,1,1,2,3,3], expected: 7, arr: [0,0,1,1,2,3,3] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ nums, expected, arr }) => {
	const a = [...nums];
	const k = removeDuplicates(a);
	console.log(`[${nums}] -> k=${k} [${a.slice(0,k)}] ${k === expected && JSON.stringify(a.slice(0,k)) === JSON.stringify(arr) ? '✓' : '✗'}`);
});
}
