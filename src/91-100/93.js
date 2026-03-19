/**
 * https://leetcode.cn/problems/restore-ip-addresses/
 */

/**
 * Backtracking — O(1) time (bounded by 3^4=81 branches), O(1) space
 * Try placing dots after 1, 2, or 3 digits; prune invalid segments.
 * @param {string} s
 * @return {string[]}
 */
const restoreIpAddresses = function (s) {
	const res = [];

	function bt(start, parts) {
		if (parts.length === 4) {
			if (start === s.length) res.push(parts.join('.'));
			return;
		}
		for (let len = 1; len <= 3; len += 1) {
			if (start + len > s.length) break;
			const seg = s.slice(start, start + len);
			if (seg.length > 1 && seg[0] === '0') break; // leading zero
			if (Number(seg) > 255) break;
			bt(start + len, [...parts, seg]);
		}
	}

	bt(0, []);
	return res;
};

if (require.main === module) {
const tests = [
	{ s: '25525511135', expected: ['255.255.11.135','255.255.111.35'] },
	{ s: '0000', expected: ['0.0.0.0'] },
	{ s: '101023', expected: ['1.0.10.23','1.0.102.3','10.1.0.23','10.10.2.3','101.0.2.3'] },
];
console.log('--- Functional Tests ---');
tests.forEach(({ s, expected }) => {
	const r = restoreIpAddresses(s).sort();
	const e = [...expected].sort();
	console.log(`"${s}" -> ${JSON.stringify(r)} ${JSON.stringify(r) === JSON.stringify(e) ? '✓' : `✗(expected ${JSON.stringify(e)})`}`);
});
}
