/**
 * https://leetcode.cn/problems/merge-intervals/
 */

/**
 * Sort + merge — O(n log n) time, O(n) space
 * Sort by start. Merge current interval with last result if overlapping.
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
	intervals.sort((a, b) => a[0] - b[0]);
	const res = [intervals[0]];

	for (let i = 1; i < intervals.length; i += 1) {
		const last = res[res.length - 1];
		if (intervals[i][0] <= last[1]) {
			last[1] = Math.max(last[1], intervals[i][1]);
		} else {
			res.push(intervals[i]);
		}
	}

	return res;
};

if (require.main === module) {
const tests = [
	{ intervals: [[1,3],[2,6],[8,10],[15,18]], expected: [[1,6],[8,10],[15,18]] },
	{ intervals: [[1,4],[4,5]], expected: [[1,5]] },
	{ intervals: [[1,4],[2,3]], expected: [[1,4]] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ intervals, expected }) => {
	const r = merge(intervals.map((x) => [...x]));
	console.log(`${JSON.stringify(intervals)} -> ${JSON.stringify(r)} ${JSON.stringify(r) === JSON.stringify(expected) ? '✓' : '✗'}`);
});
}
