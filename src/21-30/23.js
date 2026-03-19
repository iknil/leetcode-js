/**
 * https://leetcode.cn/problems/merge-k-sorted-lists/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Divide and Conquer — O(n log k) time, O(log k) stack space
 * Repeatedly merge pairs of lists until one remains.
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = function (lists) {
	if (!lists.length) return null;

	function mergeTwoLists(l1, l2) {
		const dummy = new ListNode(0);
		let cur = dummy;
		let a = l1;
		let b = l2;
		while (a && b) {
			if (a.val <= b.val) { cur.next = a; a = a.next; }
			else { cur.next = b; b = b.next; }
			cur = cur.next;
		}
		cur.next = a || b;
		return dummy.next;
	}

	function divide(arr, lo, hi) {
		if (lo === hi) return arr[lo];
		const mid = Math.floor((lo + hi) / 2);
		return mergeTwoLists(divide(arr, lo, mid), divide(arr, mid + 1, hi));
	}

	return divide(lists, 0, lists.length - 1);
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
	{ input: [[1, 4, 5], [1, 3, 4], [2, 6]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
	{ input: [], expected: [] },
	{ input: [[]], expected: [] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ input, expected }) => {
	const r = toArr(mergeKLists(input.map(toList)));
	console.log(`${JSON.stringify(input)} -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : `✗`}`);
});
}
