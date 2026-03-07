require('dotenv').config();
const fs = require('fs');
const path = require('path');

const number = process.argv[2];

if (!number || Number.isNaN(Number(number))) {
	console.error('Please provide a valid problem number. Usage: npm run submit <number>');
	process.exit(1);
}

const SESSION = process.env.LEETCODE_SESSION;
const CSRF = process.env.LEETCODE_CSRF_TOKEN;

if (!SESSION || !CSRF) {
	console.error('Missing LEETCODE_SESSION or LEETCODE_CSRF_TOKEN in .env file.');
	console.error('Please refer to .env.example to set up your credentials.');
	process.exit(1);
}

// Reuse logic from index.js to find the file
function getDirname(n) {
	const num = Number(n);
	const start = Math.floor((num % 10 === 0 ? num - 1 : num) / 10) * 10 + 1;
	const end = start + 9;
	return path.resolve(__dirname, `../src/${start}-${end}`);
}

function getFilename(n) {
	const dir = getDirname(n);
	return path.resolve(dir, `./${n}.js`);
}

const filePath = getFilename(number);

if (!fs.existsSync(filePath)) {
	console.error(`Solution file not found: ${filePath}`);
	process.exit(1);
}

const fileContent = fs.readFileSync(filePath, 'utf-8');

// Extract slug from the first few lines
const match = fileContent.match(/https:\/\/leetcode\.cn\/problems\/([^/]+)\//);
if (!match) {
	console.error(`Could not find LeetCode URL in the header of ${filePath}`);
	console.error('Please add the URL in a comment block at the top of the file.');
	process.exit(1);
}

const titleSlug = match[1];
// Extract the actual code (everything after the first block of comments might be too complex, just send the whole file, LeetCode ignores comments)
const code = fileContent;

console.log(`Submitting problem #${number}: ${titleSlug}`);

// Helper function for GraphQL queries
async function graphqlQuery(query, variables) {
	const res = await fetch('https://leetcode.cn/graphql/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `LEETCODE_SESSION=${SESSION}; csrftoken=${CSRF}`,
			'x-csrftoken': CSRF,
			Referer: 'https://leetcode.cn/',
		},
		body: JSON.stringify({ query, variables }),
	});
	if (!res.ok) {
		throw new Error(`GraphQL Error: ${res.statusText}`);
	}
	return res.json();
}

async function submitCode() {
	try {
		// 1. Get question_id by slug
		const questionQuery = `
			query questionData($titleSlug: String!) {
				question(titleSlug: $titleSlug) {
					questionId
				}
			}
		`;
		
		const qData = await graphqlQuery(questionQuery, { titleSlug });
		if (!qData.data || !qData.data.question) {
			console.error('Failed to fetch question details from LeetCode.');
			console.error(JSON.stringify(qData));
			process.exit(1);
		}

		const questionId = qData.data.question.questionId;
		console.log(`Resolved question_id: ${questionId}`);

		// 2. Submit Code
		console.log('Submitting code...');
		const submitRes = await fetch(`https://leetcode.cn/problems/${titleSlug}/submit/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `LEETCODE_SESSION=${SESSION}; csrftoken=${CSRF}`,
				'x-csrftoken': CSRF,
				Referer: `https://leetcode.cn/problems/${titleSlug}/`,
			},
			body: JSON.stringify({
				lang: 'javascript', // Hardcoded as this is leetcode-js
				question_id: questionId,
				typed_code: code,
			}),
		});

		if (!submitRes.ok) {
			console.error(`Submit HTTP Error: ${submitRes.status} ${submitRes.statusText}`);
			process.exit(1);
		}

		const submitData = await submitRes.json();
		
		if (submitData.error) {
			console.error(`Submission Error: ${submitData.error}`);
			process.exit(1);
		}

		const submissionId = submitData.submission_id;
		console.log(`Submission dispatched! ID: ${submissionId}`);

		// 3. Poll for result
		console.log('Waiting for judgment...');
		let status = 'PENDING';
		let detailData;

		while (status === 'PENDING' || status === 'STARTED') {
			await new Promise((r) => setTimeout(r, 2000)); // wait 2 seconds
			
			const detailRes = await fetch(`https://leetcode.cn/submissions/detail/${submissionId}/check/`, {
				method: 'GET',
				headers: {
					Cookie: `LEETCODE_SESSION=${SESSION}; csrftoken=${CSRF}`,
					Referer: 'https://leetcode.cn/',
				},
			});
			
			detailData = await detailRes.json();
			status = detailData.state;
		}

		// Print Result
		console.log('\n--- Judgment Result ---');
		if (detailData.status_msg === 'Accepted') {
			console.log(`✅ ${detailData.status_msg}`);
			console.log(`Runtime: ${detailData.status_runtime}`);
			console.log(`Memory: ${detailData.status_memory}`);
		} else {
			console.log(`❌ ${detailData.status_msg}`);
			if (detailData.compile_error) {
				console.log(detailData.compile_error);
			}
			if (detailData.compare_err_expected) {
				console.log(`Expected: ${detailData.compare_err_expected}`);
				console.log(`Actual: ${detailData.compare_err_result}`);
			}
		}

	} catch (error) {
		console.error('An error occurred during submission:');
		console.error(error);
	}
}

submitCode();
