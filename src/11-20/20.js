/**
 * @param {string} s
 * @return {boolean}
 */

const LEFT = {
	'(': ')',
	'[': ']',
	'{': '}',
};

const RIGHT = {
	')': '(',
	']': '[',
	'}': '{',
};

function isValid(s) {
	const LEN = s.length;
	const stack = [];

	for (let i = 0; i < LEN; i += 1) {
		if (LEFT[s[i]]) {
			stack.push(s[i]);
		} else if (stack.pop() !== RIGHT[s[i]]) {
			return false;
		}
	}

	return stack.length === 0;
}

console.log(isValid('(])[]{}'));
