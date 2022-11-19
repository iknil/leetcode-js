const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// command line
const ACTIONS = {
	CREATE: 'create',
	RUN: 'run',
};

const action = process.argv[2];
const number = process.argv[3];

/**
 * get dir name
 * @param {number} n
 * @returns {string}
 */
function getDirname(n) {
	const start = Math.floor((n % 10 === 0 ? n - 1 : n) / 10) * 10 + 1;
	const end = start + 9;
	return path.resolve(__dirname, `../src/${start}-${end}`);
}

/**
 * get file name
 * @param {number} n
 * @returns {string}
 */
function getFilename(n) {
	const dir = getDirname(n);
	return path.resolve(dir, `./${n}.js`);
}

/**
 * create dir & file
 * @param {number} n
 * @returns
 */
function create(n) {
	if (n <= 0) {
		console.warn(`number = ${n} is not allowed.`);
		return;
	}
	const dir = getDirname(n);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	const file = getFilename(n);
	if (!fs.existsSync(file)) {
		fs.writeFileSync(file, '');
		console.info('successfully create file.');
	} else {
		console.warn(`file = ${file} is existed.`);
	}
}

/**
 * run script
 * @param {*} n
 */
function run(n) {
	const file = getFilename(n);
	if (!fs.existsSync(file)) {
		console.warn(`file = ${file} is not existed.`);
	} else {
		exec(`node ${file}`, (error, stdout, stderr) => {
			if (error) {
				console.warn(`error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.warn(`stderr: ${stderr}`);
		});
	}
}

// act
switch (action) {
case ACTIONS.CREATE:
	create(number);
	break;
case ACTIONS.RUN:
	run(number);
	break;
default:
	console.warn(`action = ${action} is not allowed.`);
}
