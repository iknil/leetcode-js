/**
 * https://leetcode.cn/problems/rotate-list/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Find tail, form ring, break at new position — O(n) time, O(1) space
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const rotateRight = function (head, k) {
	if (!head || !head.next || k === 0) return head;

	let len = 1;
	let tail = head;
	while (tail.next) { tail = tail.next; len += 1; }

	const steps = k % len;
	if (steps === 0) return head;

	tail.next = head; // form ring
	let cur = head;
	for (let i = 0; i < len - steps - 1; i += 1) cur = cur.next;
	const newHead = cur.next;
	cur.next = null;

	return newHead;
};

if (require.main === module) {
function toList(arr) {
	const d = new ListNode(0); let c = d;
	for (const v of arr) { c.next = new ListNode(v); c = c.next; }
	return d.next;
}
function toArr(head) { const a = []; let c = head; while (c) { a.push(c.val); c = c.next; } return a; }
const tests = [
	{ arr: [1,2,3,4,5], k: 2, expected: [4,5,1,2,3] },
	{ arr: [0,1,2], k: 4, expected: [2,0,1] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, k, expected }) => {
	const r = toArr(rotateRight(toList(arr), k));
	console.log(`[${arr}] k=${k} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
