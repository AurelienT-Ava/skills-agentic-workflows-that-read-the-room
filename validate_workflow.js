const fs = require('fs');
const YAML = require('yaml');

const filePath = '.github/workflows/update-github-info.md';
const content = fs.readFileSync(filePath, 'utf8');

// Extract YAML frontmatter between ---
const parts = content.split('---');
if (parts.length < 3) {
  console.error('Frontmatter delimiters not found!');
  process.exit(1);
}
const yamlStr = parts[1];
const bodyStr = parts.slice(2).join('---');

const parsed = YAML.parse(yamlStr);
console.log('Parsed YAML:', JSON.stringify(parsed, null, 2));

// Checks
let fail = false;

// 1. name must be exactly 'update-github-info'
if (parsed.name !== 'update-github-info') {
  console.error('FAIL: name is not update-github-info');
  fail = true;
} else {
  console.log('PASS: name is exactly update-github-info');
}

// 2. 'on' contains 'schedule' and 'workflow_dispatch'
if (!parsed.on || !parsed.on.schedule || !('workflow_dispatch' in parsed.on)) {
  console.error('FAIL: on does not contain schedule and workflow_dispatch');
  fail = true;
} else {
  console.log('PASS: on contains schedule and workflow_dispatch');
}

// 3. 'tools' contains 'edit', 'web-fetch' and 'github'
if (!parsed.tools || !('edit' in parsed.tools) || !('web-fetch' in parsed.tools) || !('github' in parsed.tools)) {
  console.error('FAIL: tools does not contain edit, web-fetch and github');
  fail = true;
} else {
  console.log('PASS: tools contains edit, web-fetch and github');
}

// 4. 'network.allowed' contains 'github.blog' and 'github.com'
if (!parsed.network || !parsed.network.allowed || !parsed.network.allowed.includes('github.blog') || !parsed.network.allowed.includes('github.com')) {
  console.error('FAIL: network.allowed does not contain github.blog and github.com');
  fail = true;
} else {
  console.log('PASS: network.allowed contains github.blog and github.com');
}

// 5. 'safe-outputs.create-pull-request' exists with 'draft: true'
if (!parsed['safe-outputs'] || !parsed['safe-outputs']['create-pull-request'] || parsed['safe-outputs']['create-pull-request'].draft !== true) {
  console.error('FAIL: safe-outputs.create-pull-request does not exist or draft is not true');
  fail = true;
} else {
  console.log('PASS: safe-outputs.create-pull-request exists with draft: true');
}

// 6. the text (body) mentions two URLs: https://github.blog/latest/ and https://github.blog/changelog/, notes/mona-notes.md, site/content/github-info.md and Mona
const url1 = 'https://github.blog/latest/';
const url2 = 'https://github.blog/changelog/';
const file1 = 'notes/mona-notes.md';
const file2 = 'site/content/github-info.md';
const nameMona = 'Mona';

if (!bodyStr.includes(url1)) {
  console.error('FAIL: Text does not mention', url1);
  fail = true;
} else {
  console.log('PASS: Text mentions', url1);
}
if (!bodyStr.includes(url2)) {
  console.error('FAIL: Text does not mention', url2);
  fail = true;
} else {
  console.log('PASS: Text mentions', url2);
}
if (!bodyStr.includes(file1)) {
  console.error('FAIL: Text does not mention', file1);
  fail = true;
} else {
  console.log('PASS: Text mentions', file1);
}
if (!bodyStr.includes(file2)) {
  console.error('FAIL: Text does not mention', file2);
  fail = true;
} else {
  console.log('PASS: Text mentions', file2);
}
if (!bodyStr.includes(nameMona)) {
  console.error('FAIL: Text does not mention', nameMona);
  fail = true;
} else {
  console.log('PASS: Text mentions', nameMona);
}

if (!fail) {
  console.log('ALL TESTS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
