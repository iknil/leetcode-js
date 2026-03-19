/**
 * https://leetcode.cn/problems/add-binary/
 */

/**
 * Simulate addition from right — O(n) time, O(n) space
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function (a, b) {
	let i = a.length - 1;
	let j = b.length - 1;
	let carry = 0;
	let res = '';

	while (i >= 0 || j >= 0 || carry) {
		const sum = (i >= 0 ? +a[i] : 0) + (j >= 0 ? +b[j] : 0) + carry;
		res = (sum % 2) + res;
		carry = sum >> 1;
		i -= 1; j -= 1;
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ a: '11', b: '1', expected: '100' },
	{ a: '1010', b: '1011', expected: '10101' },
];
console.log('--- Functional Tests ---');
tests.forEach(({ a, b, expected }) => {
	const r = addBinary(a, b);
	console.log(`${a} + ${b} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
