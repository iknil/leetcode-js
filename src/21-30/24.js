/**
 * https://leetcode.cn/problems/swap-nodes-in-pairs/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Iterative — O(n) time, O(1) space
 * Use a dummy head. For each pair, re-link: prev -> second -> first -> next pair.
 * @param {ListNode} head
 * @return {ListNode}
 */
const swapPairs = function (head) {
	const dummy = new ListNode(0, head);
	let prev = dummy;

	while (prev.next && prev.next.next) {
		const first = prev.next;
		const second = prev.next.next;
		first.next = second.next;
		second.next = first;
		prev.next = second;
		prev = first;
	}

	return dummy.next;
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
	{ arr: [1, 2, 3, 4], expected: [2, 1, 4, 3] },
	{ arr: [], expected: [] },
	{ arr: [1], expected: [1] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, expected }) => {
	const r = toArr(swapPairs(toList(arr)));
	console.log(`[${arr}] -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : `✗`}`);
});
}
