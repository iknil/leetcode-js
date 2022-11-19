/**
 * @param {number[]} gain
 * @return {number}
 */
function largestAltitude(gain) {
	const LEN = gain.length;
	let max = 0;
	let cur = 0;
	for (let i = 0; i < LEN; i += 1) {
		cur += gain[i];
		if (cur > max) {
			max = cur;
		}
	}

	return max;
}

console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2]));
