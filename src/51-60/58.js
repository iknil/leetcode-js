/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLastWord(s) {
	let r = '';
	let t = '';
	let i = 0;

	while (i < s.length) {
		if (s[i] !== ' ') {
			t += s[i];
		} else {
			if (t !== '') {
				r = t;
			}
			t = '';
		}
		i += 1;
	}

	if (t !== '') {
		r = t;
	}
	t = '';
	return r.length;
}

/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLastWord2(s) {
	let a = s.trim().split(/\s+/).slice(-1);
	return a[a.length - 1].length;
}

console.log(lengthOfLastWord('Hello World       '));
console.log(lengthOfLastWord2('  Hello      World      '));
