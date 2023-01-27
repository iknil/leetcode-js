/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
	const tnums = nums;
	let i = 0;
	let j = 0;

	for (;i < tnums.length; i += 1, j += 1) {
		if (j < i) {
			tnums[j] = tnums[i];
		}
		let k = i + 1;
		while (tnums[k] === tnums[i]) {
			k += 1;
		}
		i = k - 1;
	}

	return j;
};

const anums = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(anums));
console.log(anums);
