/**
 * @param {number[]} digits
 * @return {number[]}
 */
function plusOne(digits) {
	let d = digits.reverse();
	let f = 1;
	for (let i = 0; i < d.length; i += 1) {
		let t = d[i] + f;
		if (t === 10) {
			d[i] = 0;
			f = 1;
		} else {
			d[i] = t;
			f = 0;
		}
	}
	if (f === 1) {
		d.push(1);
	}

	return d.reverse();
}

console.log(plusOne([0]));
