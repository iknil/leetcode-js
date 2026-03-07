/**
 * https://leetcode.cn/problems/add-two-numbers/
 */

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
	const dummyHead = new ListNode(0);
	let curr = dummyHead;
	let p = l1;
	let q = l2;
	let carry = 0;

	while (p !== null || q !== null) {
		const x = p !== null ? p.val : 0;
		const y = q !== null ? q.val : 0;
		const sum = carry + x + y;

		carry = Math.floor(sum / 10);
		curr.next = new ListNode(sum % 10);
		curr = curr.next;

		if (p !== null) p = p.next;
		if (q !== null) q = q.next;
	}

	if (carry > 0) {
		curr.next = new ListNode(carry);
	}

	return dummyHead.next;
};

// --- Helper Functions for Local Testing ---
function createLinkedList(arr) {
	if (!arr || arr.length === 0) return null;
	const dummy = new ListNode(0);
	let curr = dummy;
	for (let i = 0; i < arr.length; i += 1) {
		curr.next = new ListNode(arr[i]);
		curr = curr.next;
	}
	return dummy.next;
}

function printLinkedList(head) {
	const arr = [];
	let curr = head;
	while (curr !== null) {
		arr.push(curr.val);
		curr = curr.next;
	}
	console.log(`[${arr.join(',')}]`);
}

// --- Local Tests ---
console.log('--- Functional Tests ---');
const l1Test1 = createLinkedList([2, 4, 3]);
const l2Test1 = createLinkedList([5, 6, 4]);
process.stdout.write('Input: l1 = [2,4,3], l2 = [5,6,4] -> ');
printLinkedList(addTwoNumbers(l1Test1, l2Test1)); // Expected: [7,0,8]

const l1Test2 = createLinkedList([0]);
const l2Test2 = createLinkedList([0]);
process.stdout.write('Input: l1 = [0], l2 = [0]         -> ');
printLinkedList(addTwoNumbers(l1Test2, l2Test2)); // Expected: [0]

const l1Test3 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
const l2Test3 = createLinkedList([9, 9, 9, 9]);
process.stdout.write('Input: l1 = [9,9...], l2 = [9,9...] -> ');
printLinkedList(addTwoNumbers(l1Test3, l2Test3)); // Expected: [8,9,9,9,0,0,0,1]
