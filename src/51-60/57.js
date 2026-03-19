/**
 * https://leetcode.cn/problems/insert-interval/
 */

/**
 * Linear scan — O(n) time, O(n) space
 * Add all intervals that end before newInterval starts, merge overlapping ones,
 * then add the rest.
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = function (intervals, newInterval) {
	const res = [];
	let i = 0;
	const n = intervals.length;

	// Add all before new interval
	while (i < n && intervals[i][1] < newInterval[0]) {
		res.push(intervals[i]);
		i += 1;
	}

	// Merge overlapping
	while (i < n && intervals[i][0] <= newInterval[1]) {
		newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
		newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
		i += 1;
	}
	res.push(newInterval);

	// Add remaining
	while (i < n) { res.push(intervals[i]); i += 1; }

	return res;
};

if (require.main === module) {
const tests = [
	{ intervals: [[1,3],[6,9]], newInterval: [2,5], expected: [[1,5],[6,9]] },
	{ intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8], expected: [[1,2],[3,10],[12,16]] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ intervals, newInterval, expected }) => {
	const r = insert(intervals.map((x) => [...x]), [...newInterval]);
	console.log(`${JSON.stringify(intervals)} + [${newInterval}] -> ${JSON.stringify(r)} ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
