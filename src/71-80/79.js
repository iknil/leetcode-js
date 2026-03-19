/**
 * https://leetcode.cn/problems/word-search/
 */

/**
 * DFS + Backtracking — O(m*n*4^L) time, O(L) stack space, L=word length
 * Mark cell as visited by temporarily altering its value.
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function (board, word) {
	const m = board.length;
	const n = board[0].length;

	function dfs(r, c, idx) {
		if (idx === word.length) return true;
		if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;
		const tmp = board[r][c];
		board[r][c] = '#';
		const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1)
			|| dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);
		board[r][c] = tmp;
		return found;
	}

	for (let r = 0; r < m; r += 1) {
		for (let c = 0; c < n; c += 1) {
			if (dfs(r, c, 0)) return true;
		}
	}

	return false;
};

if (require.main === module) {
const tests = [
	{ board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED', expected: true },
	{ board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE', expected: true },
	{ board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCB', expected: false },
];
console.log('--- Functional Tests ---');
tests.forEach(({ board, word, expected }) => {
	const r = exist(board.map((row) => [...row]), word);
	console.log(`"${word}" -> ${r} ${r === expected ? '✓' : `✗(expected ${expected})`}`);
});
}
