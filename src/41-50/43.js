/**
 * https://leetcode.cn/problems/multiply-strings/
 */

/**
 * Grade-school multiplication — O(m*n) time, O(m+n) space
 * Multiply digit by digit; result[i+j+1] gets the product contribution.
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const multiply = function (num1, num2) {
	if (num1 === '0' || num2 === '0') return '0';
	const m = num1.length;
	const n = num2.length;
	const pos = new Array(m + n).fill(0);

	for (let i = m - 1; i >= 0; i -= 1) {
		for (let j = n - 1; j >= 0; j -= 1) {
			const mul = (num1[i] - '0') * (num2[j] - '0');
			const p1 = i + j;
			const p2 = i + j + 1;
			const sum = mul + pos[p2];
			pos[p2] = sum % 10;
			pos[p1] += Math.floor(sum / 10);
		}
	}

	return pos.join('').replace(/^0+/, '') || '0';
};

if (require.main === module) {
const tests = [
	{ num1: '2', num2: '3', expected: '6' },
	{ num1: '123', num2: '456', expected: '56088' },
	{ num1: '999', num2: '999', expected: '998001' },
];
console.log('--- Functional Tests ---');
tests.forEach(({ num1, num2, expected }) => {
	const r = multiply(num1, num2);
	console.log(`${num1} * ${num2} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
