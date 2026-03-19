/**
 * https://leetcode.cn/problems/partition-list/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Two dummy lists — O(n) time, O(1) space
 * Collect nodes < x in `less`, nodes >= x in `greater`, then concatenate.
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
const partition = function (head, x) {
	const lessD = new ListNode(0);
	const greaterD = new ListNode(0);
	let less = lessD;
	let greater = greaterD;
	let cur = head;

	while (cur) {
		if (cur.val < x) { less.next = cur; less = less.next; }
		else { greater.next = cur; greater = greater.next; }
		cur = cur.next;
	}

	greater.next = null;
	less.next = greaterD.next;
	return lessD.next;
};

if (require.main === module) {
function toList(arr) { const d = new ListNode(0); let c = d; for (const v of arr) { c.next = new ListNode(v); c = c.next; } return d.next; }
function toArr(h) { const a = []; let c = h; while (c) { a.push(c.val); c = c.next; } return a; }
const tests = [
	{ arr: [1,4,3,2,5,2], x: 3, expected: [1,2,2,4,3,5] },
	{ arr: [2,1], x: 2, expected: [1,2] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, x, expected }) => {
	const r = toArr(partition(toList(arr), x));
	console.log(`[${arr}] x=${x} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
