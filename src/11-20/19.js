/**
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Two Pointers (one pass) — O(n) time, O(1) space
 * Advance fast pointer n+1 steps ahead. Move both until fast reaches end.
 * Slow is then at the node before the one to remove.
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
	const dummy = new ListNode(0, head);
	let fast = dummy;
	let slow = dummy;

	for (let i = 0; i <= n; i += 1) fast = fast.next;

	while (fast !== null) {
		fast = fast.next;
		slow = slow.next;
	}

	slow.next = slow.next.next;
	return dummy.next;
};

if (require.main === module) {
function toList(arr) {
	const d = new ListNode(0);
	let c = d;
	for (const v of arr) { c.next = new ListNode(v); c = c.next; }
	return d.next;
}
function toArr(head) {
	const a = [];
	let c = head;
	while (c) { a.push(c.val); c = c.next; }
	return a;
}
const tests = [
	{ arr: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5] },
	{ arr: [1], n: 1, expected: [] },
	{ arr: [1, 2], n: 1, expected: [1] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, n, expected }) => {
	const r = toArr(removeNthFromEnd(toList(arr), n));
	console.log(`[${arr}] n=${n} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : `✗(expected [${expected}])`}`);
});
}
