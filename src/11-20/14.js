/**
 * @param {string[]} strs
 * @return {string}
 */
function longestCommonPrefix(strs) {
	const LEN = strs.length;
	if (LEN === 1) {
		return strs[0];
	}

	let i = 0;
	let result = '';
	while (true) {
		let j = 1;
		for (; j < LEN; j += 1) {
			if (strs[j][i] === undefined
				|| strs[j - 1][i] === undefined
				|| strs[j][i] !== strs[j - 1][i]) {
				break;
			}
		}
		if (j === LEN) {
			result += strs[0][i];
		} else {
			break;
		}
		i += 1;
	}
	return result;
}

console.log(longestCommonPrefix(['', '']));
