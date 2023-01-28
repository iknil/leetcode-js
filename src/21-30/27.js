/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function(nums, val) {
	const tnums = nums;
	let i = 0;
	let j = tnums.length - 1;

	// 特殊处理len === 1情况
	if (i === j && tnums[i] === val) {
		tnums[i] = 0;
		return 0;
	}

	while (i < j) {
		while (tnums[i] !== val) {
			i += 1;
		}
		while (tnums[j] === val) {
			tnums[j] = -1;
			j -= 1;
		}
		if (i < j) {
			tnums[i] = tnums[j];
			tnums[j] = -1;
			i += 1;
			j -= 1;
		} else {
			break;
		}
	}
	return j + 1;
};

const nums = [1];
console.log(removeElement(nums, 1));
console.log(nums);
