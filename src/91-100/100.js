/**
 * https://leetcode.cn/problems/same-tree/
 */

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

/**
 * Recursive DFS — O(n) time, O(h) space
 * Two trees are the same if roots match and both subtrees are the same.
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
const isSameTree = function (p, q) {
	if (!p && !q) return true;
	if (!p || !q || p.val !== q.val) return false;
	return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

if (require.main === module) {
const tests = [
	{
		p: new TreeNode(1, new TreeNode(2), new TreeNode(3)),
		q: new TreeNode(1, new TreeNode(2), new TreeNode(3)),
		expected: true,
	},
	{
		p: new TreeNode(1, new TreeNode(2), null),
		q: new TreeNode(1, null, new TreeNode(2)),
		expected: false,
	},
	{
		p: new TreeNode(1, new TreeNode(2), new TreeNode(1)),
		q: new TreeNode(1, new TreeNode(1), new TreeNode(2)),
		expected: false,
	},
];
console.log('--- Functional Tests ---');
tests.forEach(({ p, q, expected }, i) => {
	const r = isSameTree(p, q);
	console.log(`test${i+1} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
