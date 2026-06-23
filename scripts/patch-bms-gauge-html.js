const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'src/01_대시보드_BMS.html');
const fragmentPath = path.join(root, 'src/partials/bms-grade-gauge-svg.fragment.html');

const html = fs.readFileSync(htmlPath, 'utf8');
const fragment = fs.readFileSync(fragmentPath, 'utf8');

const oldBlock = `\t\t\t\t\t\t\t\t\t\t<svg class="bms-grade-gauge__svg" viewBox="0 0 240 119" width="208" height="104" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true">
\t\t\t\t\t\t\t\t\t\t\t<text class="bms-grade-gauge__label" x="120" y="96.5" text-anchor="middle" dominant-baseline="middle">상</text>
\t\t\t\t\t\t\t\t\t\t</svg>`;

const newBlock = `\t\t\t\t\t\t\t\t\t\t<svg class="bms-grade-gauge__svg" viewBox="0 0 240 119" width="208" height="104" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
${fragment}\t\t\t\t\t\t\t\t\t\t\t<text class="bms-grade-gauge__label" x="120" y="96.5" text-anchor="middle" dominant-baseline="middle">상</text>
\t\t\t\t\t\t\t\t\t\t</svg>`;

if (!html.includes(oldBlock)) {
	console.error('HTML block not found');
	process.exit(1);
}

fs.writeFileSync(htmlPath, html.replace(oldBlock, newBlock));
console.log('HTML patched');
