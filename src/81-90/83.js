/**
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-list/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Single pass — O(n) time, O(1) space
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
	let cur = head;
	while (cur && cur.next) {
		if (cur.val === cur.next.val) cur.next = cur.next.next;
		else cur = cur.next;
	}
	return head;
};

if (require.main === module) {
function toList(arr) { const d = new ListNode(0); let c = d; for (const v of arr) { c.next = new ListNode(v); c = c.next; } return d.next; }
function toArr(h) { const a = []; let c = h; while (c) { a.push(c.val); c = c.next; } return a; }
const tests = [
	{ arr: [1,1,2], expected: [1,2] },
	{ arr: [1,1,2,3,3], expected: [1,2,3] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, expected }) => {
	const r = toArr(deleteDuplicates(toList(arr)));
	console.log(`[${arr}] -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
