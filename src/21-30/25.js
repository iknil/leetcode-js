/**
 * https://leetcode.cn/problems/reverse-nodes-in-k-group/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Iterative group reversal — O(n) time, O(1) space
 * Collect k nodes, reverse them, attach, repeat.
 * If fewer than k nodes remain, leave as-is.
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = function (head, k) {
	const dummy = new ListNode(0, head);
	let groupPrev = dummy;

	while (true) {
		// Find k-th node from groupPrev
		let kth = groupPrev;
		for (let i = 0; i < k; i += 1) {
			kth = kth.next;
			if (!kth) return dummy.next;
		}

		const groupNext = kth.next;
		// Reverse the group
		let prev = groupNext;
		let cur = groupPrev.next;
		while (cur !== groupNext) {
			const tmp = cur.next;
			cur.next = prev;
			prev = cur;
			cur = tmp;
		}
		const tmp = groupPrev.next;
		groupPrev.next = kth;
		groupPrev = tmp;
	}
};

if (require.main === module) {
function toList(arr) {
	const d = new ListNode(0); let c = d;
	for (const v of arr) { c.next = new ListNode(v); c = c.next; }
	return d.next;
}
function toArr(head) {
	const a = []; let c = head;
	while (c) { a.push(c.val); c = c.next; }
	return a;
}
const tests = [
	{ arr: [1, 2, 3, 4, 5], k: 2, expected: [2, 1, 4, 3, 5] },
	{ arr: [1, 2, 3, 4, 5], k: 3, expected: [3, 2, 1, 4, 5] },
	{ arr: [1, 2, 3, 4, 5], k: 1, expected: [1, 2, 3, 4, 5] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, k, expected }) => {
	const r = toArr(reverseKGroup(toList(arr), k));
	console.log(`[${arr}] k=${k} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
