/**
 * https://leetcode.cn/problems/longest-valid-parentheses/
 */

/**
 * Stack — O(n) time, O(n) space
 * Push index of '(' onto stack; for ')' pop, then length = i - stack.top.
 * Seed stack with -1 as a base index.
 * @param {string} s
 * @return {number}
 */
const longestValidParentheses = function (s) {
	const stack = [-1];
	let max = 0;

	for (let i = 0; i < s.length; i += 1) {
		if (s[i] === '(') {
			stack.push(i);
		} else {
			stack.pop();
			if (stack.length === 0) {
				stack.push(i); // new base
			} else {
				max = Math.max(max, i - stack[stack.length - 1]);
			}
		}
	}

	return max;
};

/**
 * Two-pass scan (L→R and R→L) — O(n) time, O(1) space
 * Count open/close; when equal record length; reset when mismatch.
 * @param {string} s
 * @return {number}
 */
const longestValidParentheses2 = function (s) {
	let open = 0;
	let close = 0;
	let max = 0;

	for (const c of s) {
		if (c === '(') open += 1; else close += 1;
		if (open === close) max = Math.max(max, 2 * close);
		else if (close > open) { open = 0; close = 0; }
	}

	open = 0; close = 0;
	for (let i = s.length - 1; i >= 0; i -= 1) {
		if (s[i] === '(') open += 1; else close += 1;
		if (open === close) max = Math.max(max, 2 * open);
		else if (open > close) { open = 0; close = 0; }
	}

	return max;
};

if (require.main === module) {
const tests = [
	{ s: '(()', expected: 2 },
	{ s: ')()())', expected: 4 },
	{ s: '', expected: 0 },
	{ s: '()()', expected: 4 },
	{ s: '(())', expected: 4 },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s, expected }) => {
	const r1 = longestValidParentheses(s);
	const r2 = longestValidParentheses2(s);
	console.log(`"${s}" -> v1:${r1} v2:${r2} ${r1 === expected && r2 === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
