/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function(nums, val) {
	const tnums = nums;
	let i = 0;
	let j = tnums.length - 1;
	let c = 0;

	// 特殊处理len === 1情况
	if (i === j && tnums[i] === val) {
		tnums[i] = 0;
		return 0;
	}

	while (i < j) {
		if (tnums[i] === val && tnums[j] !== val) {
			tnums[i] = tnums[j];
			tnums[j] = val;
		}

		if (tnums[i] !== val) {
			i += 1;
		} else if (tnums[j] === val) {
			c += 1;
			j -= 1;
		}
	}

	if (tnums[i] === val) {
		c += 1;
	}

	return tnums.length - c;
};

const nums = [3, 3];
console.log(removeElement(nums, 2));
console.log(nums);
