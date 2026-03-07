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

/**
 * Optimized Alternative
 * 1. Loop Splitting: Loops while BOTH are valid to avoid null checks on every iteration.
 * 2. Avoid Math.floor and modulus: Uses simple `if (sum >= 10)` logic which is faster at CPU level.
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers2 = function (l1, l2) {
	const dummyHead = new ListNode(0);
	let curr = dummyHead;
	let carry = 0;
	let p = l1;
	let q = l2;

	// Fast path: both lists have nodes
	while (p !== null && q !== null) {
		let sum = p.val + q.val + carry;
		if (sum >= 10) {
			carry = 1;
			sum -= 10;
		} else {
			carry = 0;
		}
		curr.next = new ListNode(sum);
		curr = curr.next;
		p = p.next;
		q = q.next;
	}

	// Handle the remainder of whichever list is longer
	let rem = p !== null ? p : q;
	while (rem !== null) {
		let sum = rem.val + carry;
		if (sum >= 10) {
			carry = 1;
			sum -= 10;
		} else {
			carry = 0;
		}
		curr.next = new ListNode(sum);
		curr = curr.next;
		rem = rem.next;
	}

	if (carry > 0) {
		curr.next = new ListNode(1);
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
process.stdout.write('Input: l1 = [2,4,3], l2 = [5,6,4] -> v1: ');
printLinkedList(addTwoNumbers(l1Test1, l2Test1)); // Expected: [7,0,8]
process.stdout.write('                                  -> v2: ');
printLinkedList(addTwoNumbers2(l1Test1, l2Test1));

const l1Test2 = createLinkedList([0]);
const l2Test2 = createLinkedList([0]);
process.stdout.write('Input: l1 = [0], l2 = [0]         -> v1: ');
printLinkedList(addTwoNumbers(l1Test2, l2Test2)); // Expected: [0]
process.stdout.write('                                  -> v2: ');
printLinkedList(addTwoNumbers2(l1Test2, l2Test2));

const l1Test3 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
const l2Test3 = createLinkedList([9, 9, 9, 9]);
process.stdout.write('Input: l1 = [9,9...], l2 = [9,9...] -> v1: ');
printLinkedList(addTwoNumbers(l1Test3, l2Test3)); // Expected: [8,9,9,9,0,0,0,1]
process.stdout.write('                                    -> v2: ');
printLinkedList(addTwoNumbers2(l1Test3, l2Test3));

console.log('\n--- Performance Comparison (1,000,000 iterations) ---');
const perfL1 = createLinkedList([9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]);
const perfL2 = createLinkedList([9, 9, 9, 9, 9, 9, 9, 9]);
const iterations = 1000000;

console.time('addTwoNumbers (Single Loop + Math)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers(perfL1, perfL2);
}
console.timeEnd('addTwoNumbers (Single Loop + Math)');

console.time('addTwoNumbers2 (Loop Splitting + Logic)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers2(perfL1, perfL2);
}
console.timeEnd('addTwoNumbers2 (Loop Splitting + Logic)');
