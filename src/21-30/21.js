/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function mergeTwoLists(list1, list2) {
	const l1 = list1;
	const l2 = list2;
	if (!l1) return l2;
	if (!l2) return l1;

	if (l1.val > l2.val) {
		l2.next = mergeTwoLists(l1, l2.next);
		return l2;
	}
	l1.next = mergeTwoLists(l1.next, l2);
	return l1;
}

console.log(mergeTwoLists);
