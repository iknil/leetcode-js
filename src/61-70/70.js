/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
	if (n === 1) return 1;
	if (n === 2) return 2;

	let result = 2;
	let pre = 1;
	let temp;
	for (let i = 3; i <= n; i += 1) {
		temp = result;
		result += pre;
		pre = temp;
	}
	return result;
}

console.log(climbStairs(45));
