/**
 * n不同时组合情况
 * f(1) = 1
 * f(2) = 2
 * f(3) = f(2) + f(1) + 2 = 5
 * f(4) = f(3) + f(2) + 2 * (f(1) + 1) = 11
 * f(5) = f(4) + f(3) + 2 * (f(2) + f(1) + 1) = ...
 * ...
 */

/**
 * @param {number} n
 * @return {number}
 */
function numTilings(n) {
	// eslint-disable-next-line indent
	const STEP = [1, 2, 5];
	const MOD = 10 ** 9 + 7;

	function getLeftCount(index) {
		let i = index;
		let result = 0;
		while (i >= 0) { // from start to zero
			result += STEP[i];
			i -= 1;
		}
		return result;
	}

	if (n <= 3) {
		return STEP[n - 1];
	}

	for (let i = 4; i <= n; i += 1) {
		STEP[i - 1] = (STEP[i - 2] + STEP[i - 3] + 2 * (getLeftCount(i - 4) + 1)) % MOD;
	}

	return STEP[n - 1];
}

console.log(numTilings(1000));
