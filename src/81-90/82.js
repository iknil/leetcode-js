/**
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * Dummy head + skip duplicates — O(n) time, O(1) space
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
	const dummy = new ListNode(0, head);
	let prev = dummy;

	while (prev.next) {
		let cur = prev.next;
		if (cur.next && cur.val === cur.next.val) {
			const val = cur.val;
			while (prev.next && prev.next.val === val) prev.next = prev.next.next;
		} else {
			prev = prev.next;
		}
	}

	return dummy.next;
};

if (require.main === module) {
function toList(arr) { const d = new ListNode(0); let c = d; for (const v of arr) { c.next = new ListNode(v); c = c.next; } return d.next; }
function toArr(h) { const a = []; let c = h; while (c) { a.push(c.val); c = c.next; } return a; }
const tests = [
	{ arr: [1,2,3,3,4,4,5], expected: [1,2,5] },
	{ arr: [1,1,1,2,3], expected: [2,3] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ arr, expected }) => {
	const r = toArr(deleteDuplicates(toList(arr)));
	console.log(`[${arr}] -> [${r}] ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
