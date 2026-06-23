const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../src/01_대시보드_BMS.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const start = html.indexOf('<div class="bms-gauge bms-grade-gauge"');
const end = html.indexOf('</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="bms-panel__block">', start);

if (start === -1 || end === -1) {
	// try LF only
	const endLf = html.indexOf('</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="bms-panel__block">', start);
	if (start === -1 || endLf === -1) {
		console.error('Block not found', start, end);
		process.exit(1);
	}
}

const endMarker = html.includes('</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="bms-panel__block">')
	? '</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class="bms-panel__block">'
	: '</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="bms-panel__block">';

const endIdx = html.indexOf(endMarker, start);

const shortBlock = `\t\t\t\t\t\t\t\t<div class="bms-gauge bms-grade-gauge" data-score="92.4" data-grade="상" aria-label="평가 등급 게이지">
\t\t\t\t\t\t\t\t\t<div class="bms-grade-gauge__wrap">
\t\t\t\t\t\t\t\t\t\t<svg class="bms-grade-gauge__svg" viewBox="0 0 240 119" width="208" height="104" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
\t\t\t\t\t\t\t\t\t\t\t<text class="bms-grade-gauge__label" x="120" y="96.5" text-anchor="middle" dominant-baseline="middle">상</text>
\t\t\t\t\t\t\t\t\t\t</svg>
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t<div class="bms-gauge__info">
\t\t\t\t\t\t\t\t\t\t<strong class="bms-gauge__score">
\t\t\t\t\t\t\t\t\t\t\t<span class="bms-grade-gauge__score-value">92.4</span><span>점</span>
\t\t\t\t\t\t\t\t\t\t</strong>
\t\t\t\t\t\t\t\t\t\t<span class="bms-gauge__total">/ 100점</span>
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t</div>

\t\t\t\t\t\t\t<div class="bms-panel__block">`;

html = html.slice(0, start) + shortBlock + html.slice(endIdx + endMarker.length);
fs.writeFileSync(htmlPath, html);
console.log('HTML shortened');
