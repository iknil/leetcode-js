/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
*/
const searchInsert = function(nums, target) {
	let l = 0;
	let r = nums.length - 1;
	let s = Math.ceil((l + r) / 2);
	if (target <= nums[l]) return 0;
	if (target === nums[r]) return r;
	if (target > nums[r]) return r + 1;

	while (true) {
		if (nums[s] === target) return s;
		if (nums[s] < target) {
			if (nums[s + 1] >= target) return s + 1;
			l = s;
		} else {
			if (nums[s - 1] < target) return s;
			r = s;
		}
		if (r - l === 1) return l;
		s = Math.ceil((l + r) / 2);
	}
};

console.log(searchInsert([1, 3, 5], 5));
