/**
 * https://leetcode.cn/problems/unique-binary-search-trees-ii/
 */

function TreeNode(val, left, right) {
	this.val = val === undefined ? 0 : val;
	this.left = left === undefined ? null : left;
	this.right = right === undefined ? null : right;
}

/**
 * Divide and Conquer — O(Catalan(n) * n) time
 * For each root value i in [lo, hi], recursively build all left subtrees
 * from [lo, i-1] and all right subtrees from [i+1, hi].
 * @param {number} n
 * @return {TreeNode[]}
 */
const generateTrees = function (n) {
	function gen(lo, hi) {
		if (lo > hi) return [null];
		const res = [];
		for (let i = lo; i <= hi; i += 1) {
			for (const left of gen(lo, i - 1)) {
				for (const right of gen(i + 1, hi)) {
					res.push(new TreeNode(i, left, right));
				}
			}
		}
		return res;
	}
	return gen(1, n);
};

if (require.main === module) {
function treeToArr(root) {
	if (!root) return [];
	const res = [];
	const q = [root];
	while (q.length) {
		const node = q.shift();
		if (node) { res.push(node.val); q.push(node.left, node.right); }
		else res.push(null);
	}
	while (res[res.length - 1] === null) res.pop();
	return res;
}
console.log('--- Functional Tests ---');
const r3 = generateTrees(3);
console.log(`n=3 -> ${r3.length} trees (expected 5) ${r3.length === 5 ? '✓' : '✗'}`);
const r1 = generateTrees(1);
console.log(`n=1 -> ${r1.length} trees (expected 1) ${r1.length === 1 ? '✓' : '✗'}`);
}
