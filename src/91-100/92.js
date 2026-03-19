/**
 * https://leetcode.cn/problems/reverse-linked-list-ii/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Splice and reinsert — O(n) time, O(1) space
 * Walk to position left-1, then reverse (right-left+1) nodes in place.
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
const reverseBetween = function (head, left, right) {
	const dummy = new ListNode(0, head);
	let pre = dummy;

	for (let i = 1; i < left; i += 1) pre = pre.next;

	let cur = pre.next;
	for (let i = 0; i < right - left; i += 1) {
		const nxt = cur.next;
		cur.next = nxt.next;
		nxt.next = pre.next;
		pre.next = nxt;
	}

	return dummy.next;
};

if (require.main === module) {
function toList(arr) { const d = new ListNode(0); let c = d; for (const v of arr) { c.next = new ListNode(v); c = c.next; } return d.next; }
function toArr(h) { const a = []; let c = h; while (c) { a.push(c.val); c = c.next; } return a; }
const tests = [
	{ arr: [1,2,3,4,5], left: 2, right: 4, expected: [1,4,3,2,5] },
	{ arr: [5], left: 1, right: 1, expected: [5] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, left, right, expected }) => {
	const r = toArr(reverseBetween(toList(arr), left, right));
	console.log(`[${arr}] l=${left} r=${right} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
