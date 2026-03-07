/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
	const map = new Map();

	for (let i = 0; i < nums.length; i += 1) {
		const complement = target - nums[i];

		if (map.has(complement)) {
			return [map.get(complement), i];
		}

		map.set(nums[i], i);
	}

	return [];
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum2 = function (nums, target) {
	// Using a plain object as a hash map.
	// In some JS engines, this has less overhead than Map for simple tasks.
	const map = {};

	for (let i = 0; i < nums.length; i += 1) {
		const val = nums[i];
		const complement = target - val;

		if (map[complement] !== undefined) {
			return [map[complement], i];
		}

		map[val] = i;
	}

	return [];
};

// Test cases
const tests = [
	{ nums: [2, 7, 11, 15], target: 9 },
	{ nums: [3, 2, 4], target: 6 },
	{ nums: [3, 3], target: 6 },
];

console.log('--- Functional Tests ---');
tests.forEach(({ nums, target }) => {
	console.log(`Input: [${nums}], target: ${target} -> v1: [${twoSum(nums, target)}], v2: [${twoSum2(nums, target)}]`);
});

console.log('\n--- Performance Comparison (1,000,000 iterations) ---');
const iter = 1000000;
const testNums = [2, 7, 11, 15, 18, 20, 25, 30, 40, 50];
const testTarget = 90;

console.time('twoSum (Map)');
for (let i = 0; i < iter; i += 1) {
	twoSum(testNums, testTarget);
}
console.timeEnd('twoSum (Map)');

console.time('twoSum2 (Object)');
for (let i = 0; i < iter; i += 1) {
	twoSum2(testNums, testTarget);
}
console.timeEnd('twoSum2 (Object)');
