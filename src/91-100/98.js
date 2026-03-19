/**
 * https://leetcode.cn/problems/validate-binary-search-tree/
 */

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

/**
 * Iterative inorder — O(n) time, O(h) space
 * A BST's inorder traversal must be strictly increasing.
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
	const stack = [];
	let cur = root;
	let prev = -Infinity;

	while (cur || stack.length) {
		while (cur) { stack.push(cur); cur = cur.left; }
		cur = stack.pop();
		if (cur.val <= prev) return false;
		prev = cur.val;
		cur = cur.right;
	}

	return true;
};

if (require.main === module) {
const tests = [
	{ root: new TreeNode(2, new TreeNode(1), new TreeNode(3)), expected: true },
	{ root: new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6))), expected: false },
];
console.log('--- Functional Tests ---');
tests.forEach(({ root, expected }) => {
	const r = isValidBST(root);
	console.log(`root.val=${root.val} -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
