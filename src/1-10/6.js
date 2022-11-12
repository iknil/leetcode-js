/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
function convert(s, numRows) {
	if (numRows === 1) {
		return s;
	}

	const LINES = [];
	const LEN = s.length;

	let i = 0;
	let j = 0;
	let flag = 1;
	while (i < LEN) {
		LINES[j] = (LINES[j] || '') + s[i];
		j += flag;
		i += 1;
		if (j === 0 || j === numRows - 1) {
			flag *= -1;
		}
	}

	return LINES.join('');
}

console.log(convert('PAYPALISHIRING', 100));
