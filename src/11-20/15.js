/**
 * @param {number[]} nums
 * @return {number[][]}
 */

function threeSum(nums) {
	const result = [];
	const LEN = nums.length;
	nums.sort((a, b) => a - b);

	if (nums[0] <= 0 && nums[LEN - 1] >= 0) {
		let i = 0;
		while (i < LEN - 2) {
			if (nums[i] > 0) {
				break;
			}
			let j = i + 1;
			let k = LEN - 1;
			while (j < k) {
				if (nums[i] * nums[k] > 0) {
					break;
				}
				const temp = nums[i] + nums[j] + nums[k];
				if (temp === 0) {
					result.push([nums[i], nums[j], nums[k]]);
				}
				if (temp <= 0) {
					j += 1;
					while (nums[j - 1] === nums[j]) {
						j += 1;
					}
				} else {
					k -= 1;
					while (nums[k + 1] === nums[k]) {
						k -= 1;
					}
				}
			}
			i += 1;
			while (nums[i - 1] === nums[i]) {
				i += 1;
			}
		}
	}

	return result;
}

// test
// [-1, 0, 1, 2, -1, -4]
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
