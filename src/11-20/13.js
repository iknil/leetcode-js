const MAP = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000,
};

/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
	const LEN = s.length;
	let result = 0;
	let temp = Math.max;
	for (let i = 0; i < LEN; i += 1) {
		if (temp < MAP[s[i]]) {
			result -= 2 * temp;
		}
		result += MAP[s[i]];
		temp = MAP[s[i]];
	}

	return result;
}

console.log(romanToInt('IX'));
