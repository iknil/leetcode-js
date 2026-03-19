/**
 * https://leetcode.cn/problems/binary-tree-inorder-traversal/
 */

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

/**
 * Iterative inorder with stack — O(n) time, O(h) space
 * Push left spine onto stack, then process node and move to right child.
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function (root) {
	const res = [];
	const stack = [];
	let cur = root;

	while (cur || stack.length) {
		while (cur) { stack.push(cur); cur = cur.left; }
		cur = stack.pop();
		res.push(cur.val);
		cur = cur.right;
	}

	return res;
};

if (require.main === module) {
function build(arr) {
	if (!arr.length) return null;
	const nodes = arr.map(v => v == null ? null : new TreeNode(v));
	for (let i = 0; i < nodes.length; i += 1) {
		if (!nodes[i]) continue;
		if (2*i+1 < nodes.length) nodes[i].left = nodes[2*i+1];
		if (2*i+2 < nodes.length) nodes[i].right = nodes[2*i+2];
	}
	return nodes[0];
}
const tests = [
	{ arr: [1,null,2,null,null,3], expected: [1,3,2] },
	{ arr: [], expected: [] },
	{ arr: [1], expected: [1] },
];
// Custom tree for test 0: 1->right=2->left=3
const root0 = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.log('--- Functional Tests ---');
const r0 = inorderTraversal(root0);
console.log(`[1,null,2,3] -> [${r0}] ${JSON.stringify(r0) === JSON.stringify([1,3,2]) ? '✓' : '✗'}`);
const r1 = inorderTraversal(null);
console.log(`[] -> [${r1}] ${JSON.stringify(r1) === JSON.stringify([]) ? '✓' : '✗'}`);
const r2 = inorderTraversal(new TreeNode(1));
console.log(`[1] -> [${r2}] ${JSON.stringify(r2) === JSON.stringify([1]) ? '✓' : '✗'}`);
}
