/**
 * https://leetcode.cn/problems/recover-binary-search-tree/
 */

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

/**
 * Iterative inorder, find two swapped nodes — O(n) time, O(h) space
 * In a corrupted BST, inorder gives exactly one or two inversions.
 * First inversion: x = first larger node before drop, y = node after drop.
 * Second inversion (if any) updates y to the current smaller node.
 * @param {TreeNode} root
 * @return {void}
 */
const recoverTree = function (root) {
	let x = null; // first swapped node
	let y = null; // second swapped node
	let prev = null;
	const stack = [];
	let cur = root;

	while (cur || stack.length) {
		while (cur) { stack.push(cur); cur = cur.left; }
		cur = stack.pop();
		if (prev && prev.val > cur.val) {
			y = cur;
			if (!x) x = prev;
			else break;
		}
		prev = cur;
		cur = cur.right;
	}

	// Swap values
	const tmp = x.val;
	x.val = y.val;
	y.val = tmp;
};

if (require.main === module) {
function inorder(root) { const r=[]; function dfs(n){if(!n)return;dfs(n.left);r.push(n.val);dfs(n.right);}dfs(root);return r; }
// [1,3,null,null,2] — 3 and 1 are swapped
const t1 = new TreeNode(1, new TreeNode(3, null, new TreeNode(2)), null);
recoverTree(t1);
console.log('--- Functional Tests ---');
console.log(`[1,3,null,null,2] -> inorder after recover: [${inorder(t1)}] ${JSON.stringify(inorder(t1)) === '[1,2,3]' ? '✓' : '✗'}`);
// [3,1,4,null,null,2] — 3 and 2 are swapped
const t2 = new TreeNode(3, new TreeNode(1), new TreeNode(4, new TreeNode(2), null));
recoverTree(t2);
console.log(`[3,1,4,null,null,2] -> inorder after recover: [${inorder(t2)}] ${JSON.stringify(inorder(t2)) === '[1,2,3,4]' ? '✓' : '✗'}`);
}
