/**
 * https://leetcode.cn/problems/simplify-path/
 */

/**
 * Stack — O(n) time, O(n) space
 * Split by '/'. Push dirs onto stack; '..' pops; '.' and '' are ignored.
 * @param {string} path
 * @return {string}
 */
const simplifyPath = function (path) {
	const stack = [];
	for (const part of path.split('/')) {
		if (part === '..') stack.pop();
		else if (part && part !== '.') stack.push(part);
	}
	return '/' + stack.join('/');
};

if (require.main === module) {
const tests = [
	{ path: '/home/', expected: '/home' },
	{ path: '/home//foo/', expected: '/home/foo' },
	{ path: '/home/user/Documents/../Pictures', expected: '/home/user/Pictures' },
	{ path: '/../', expected: '/' },
	{ path: '/.../a/../b/c/../d/./', expected: '/.../b/d' },
];
console.log('--- Functional Tests ---');
tests.forEach(({ path, expected }) => {
	const r = simplifyPath(path);
	console.log(`"${path}" -> "${r}" ${r === expected ? '✓' : `✗(expected "${expected}")`}`);
});
}
