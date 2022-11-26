/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function mergeTwoLists(list1, list2) {
	if (!list1) return list2;
	if (!list2) return list1;

	if (list1.val > list2.val) {
		list2.next = mergeTwoLists(list1, list2.next);
		return list2;
	}
	list1.next = mergeTwoLists(list1.next, list2);
	return list1;
}

console.log(mergeTwoLists);
