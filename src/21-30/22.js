/**
 * https://leetcode.cn/problems/generate-parentheses/
 */

/**
 * Backtracking — O(4^n / sqrt(n)) time (Catalan number)
 * Only add '(' if open count < n; only add ')' if close count < open count.
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
	const res = [];

	function bt(cur, open, close) {
		if (cur.length === 2 * n) { res.push(cur); return; }
		if (open < n) bt(cur + '(', open + 1, close);
		if (close < open) bt(cur + ')', open, close + 1);
	}

	bt('', 0, 0);
	return res;
};

if (require.main === module) {
const tests = [
	{ n: 3, expected: ['((()))', '(()())', '(())()', '()(())', '()()()'] },
	{ n: 1, expected: ['()'] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ n, expected }) => {
	const r = generateParenthesis(n);
	console.log(`n=${n} -> [${r.join(', ')}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
