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
 * Ultimate Optimized Alternative (addTwoNumbers2)
 * 1. Loop Splitting: Loops while BOTH are valid to avoid null checks.
 * 2. Avoid Math: Uses simple `if (sum >= 10)` logic rather than modulus/division.
 * 3. Pointer Mapping: Directly appends the remainder of `p` or `q` if there is no carry.
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

	// Remainder handling
	let rem = p !== null ? p : q;

	while (rem !== null) {
		// If there is no carry, we can just attach the rest of the list directly! (User's trick)
		if (carry === 0) {
			curr.next = rem;
			// Advance 'curr' to the very end if needed (loop ends here anyway)
			break;
		}

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

	// Final leftover carry
	if (carry > 0) {
		curr.next = new ListNode(1);
	}

	return dummyHead.next;
};

/**
 * User provided optimized version (addTwoNumbers3)
 * 1. Single loop: while ((p && q) || carry !== 0)
 * 2. Avoid Math: uses if (sum >= 10)
 * 3. Pointer stitching: appends remaining list directly if no more carry
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers3 = function (l1, l2) {
	const dummyHead = new ListNode(0);
	let curr = dummyHead;
	let p = l1;
	let q = l2;
	let carry = 0;

	while ((p && q) || carry !== 0) {
		const x = p ? p.val : 0;
		const y = q ? q.val : 0;
		let sum = x + y + carry;
		if (sum >= 10) {
			carry = 1;
			sum -= 10;
		} else {
			carry = 0;
		}
		curr.next = new ListNode(sum);
		curr = curr.next;
		if (p) p = p.next;
		if (q) q = q.next;
	}

	if (p) {
		curr.next = p;
	}

	if (q) {
		curr.next = q;
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
process.stdout.write('                                  -> v3: ');
printLinkedList(addTwoNumbers3(l1Test1, l2Test1));

const l1Test2 = createLinkedList([0]);
const l2Test2 = createLinkedList([0]);
process.stdout.write('Input: l1 = [0], l2 = [0]         -> v1: ');
printLinkedList(addTwoNumbers(l1Test2, l2Test2)); // Expected: [0]
process.stdout.write('                                  -> v2: ');
printLinkedList(addTwoNumbers2(l1Test2, l2Test2));
process.stdout.write('                                  -> v3: ');
printLinkedList(addTwoNumbers3(l1Test2, l2Test2));

const l1Test3 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
const l2Test3 = createLinkedList([9, 9, 9, 9]);
process.stdout.write('Input: l1 = [9,9...], l2 = [9,9...] -> v1: ');
printLinkedList(addTwoNumbers(l1Test3, l2Test3)); // Expected: [8,9,9,9,0,0,0,1]
process.stdout.write('                                    -> v2: ');
printLinkedList(addTwoNumbers2(l1Test3, l2Test3));
process.stdout.write('                                    -> v3: ');
printLinkedList(addTwoNumbers3(l1Test3, l2Test3));

console.log('\n--- Performance Comparison (1,000,000 iterations) ---');
const perfL1 = createLinkedList([9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]);
const perfL2 = createLinkedList([9, 9, 9, 9, 9, 9, 9, 9]);
const perfL3 = createLinkedList([1, 2, 3]);
const perfL4 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

const iterations = 1000000;

console.time('addTwoNumbers (Base)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers(perfL1, perfL2);
}
console.timeEnd('addTwoNumbers (Base)');

console.time('addTwoNumbers2 (Ultimate)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers2(perfL1, perfL2);
}
console.timeEnd('addTwoNumbers2 (Ultimate)');

console.time('addTwoNumbers3 (Stitched)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers3(perfL1, perfL2);
}
console.timeEnd('addTwoNumbers3 (Stitched)');

console.log('\n--- Performance Comparison (Uneven lengths without final carry) ---');
console.time('addTwoNumbers (Base)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers(perfL3, perfL4);
}
console.timeEnd('addTwoNumbers (Base)');

console.time('addTwoNumbers2 (Ultimate Pointer Stitching)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers2(perfL3, perfL4);
}
console.timeEnd('addTwoNumbers2 (Ultimate Pointer Stitching)');

console.time('addTwoNumbers3 (Stitched - Pointer Placement)');
for (let i = 0; i < iterations; i += 1) {
	addTwoNumbers3(perfL3, perfL4);
}
console.timeEnd('addTwoNumbers3 (Stitched - Pointer Placement)');
