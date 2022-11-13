/**
 * @param {string} order
 * @param {string} s
 * @return {string}
 */
function customSortString(order, s) {
	const MAP = {};
	// init
	for (let i = 0; i < order.length; i += 1) {
		MAP[order[i]] = 0;
	}
	let rest = '';

	for (let j = 0; j < s.length; j += 1) {
		if (MAP[s[j]] !== undefined) {
			MAP[s[j]] += 1;
		} else {
			rest += s[j];
		}
	}

	let result = '';

	for (let n = 0; n < order.length; n += 1) {
		result += new Array(MAP[order[n]] + 1).join(order[n]);
	}

	result += rest;
	return result;
}

console.log(customSortString('cba', 'abcd'));
