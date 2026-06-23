import { GAUGE_PATHS } from './bms-grade-gauge-paths.js';

const SEGMENT_COUNT = GAUGE_PATHS.length;
const SVG_NS = 'http://www.w3.org/2000/svg';
const XHTML_NS = 'http://www.w3.org/1999/xhtml';

const GRADIENT_TRANSFORM = 'matrix(-0.131422 0 0 -0.127228 127.413 117.981)';
const CONIC_GRADIENT =
	'conic-gradient(from 90deg,rgba(240,101,93,1) 0deg,rgba(255,179,64,1) 54deg,rgba(255,179,64,1) 90deg,rgba(82,196,124,1) 126deg,rgba(45,131,212,1) 180deg,rgba(240,101,93,1) 360deg)';

const GRADE_STOPS = [
	{ min: 95, label: '최상', color: '#0284c7' },
	{ min: 90, label: '상', color: '#1b8743' },
	{ min: 80, label: '중', color: '#d97706' },
	{ min: 0, label: '하', color: '#c92a2a' },
];

const START_DELAY_MS = 250;
const STEP_MS = 42;

let gaugeUid = 0;

function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}

function getGrade(score) {
	const value = clamp(score, 0, 100);
	return GRADE_STOPS.find((item) => value >= item.min) || GRADE_STOPS[GRADE_STOPS.length - 1];
}

function scoreToActiveCount(score) {
	return clamp(Math.round((clamp(score, 0, 100) / 100) * SEGMENT_COUNT), 0, SEGMENT_COUNT);
}

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function createSvgEl(name, attrs = {}) {
	const el = document.createElementNS(SVG_NS, name);
	Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
	return el;
}

function createGradientLayer() {
	const transformGroup = createSvgEl('g', { transform: GRADIENT_TRANSFORM });
	const foreignObject = createSvgEl('foreignObject', {
		x: '-969.492',
		y: '-969.492',
		width: '1938.98',
		height: '1938.98',
	});
	const div = document.createElementNS(XHTML_NS, 'div');
	div.setAttribute('xmlns', XHTML_NS);
	div.style.cssText = `background:${CONIC_GRADIENT};width:100%;height:100%;opacity:1`;
	foreignObject.appendChild(div);
	transformGroup.appendChild(foreignObject);
	return transformGroup;
}

function buildGaugeSvg(svg, uid) {
	const defs = createSvgEl('defs');

	GAUGE_PATHS.forEach((d, index) => {
		const clip = createSvgEl('clipPath', { id: `bms-gauge-clip-${uid}-${index}` });
		clip.appendChild(createSvgEl('path', { d }));
		defs.appendChild(clip);
	});

	const baseGroup = createSvgEl('g', { class: 'bms-grade-gauge__base' });
	const fillGroup = createSvgEl('g', { class: 'bms-grade-gauge__fills' });

	GAUGE_PATHS.forEach((d, index) => {
		baseGroup.appendChild(
			createSvgEl('path', {
				class: 'bms-grade-gauge__segment-base',
				fill: '#F0F6FC',
				d,
				'data-index': String(index),
			}),
		);

		const segment = createSvgEl('g', {
			class: 'bms-grade-gauge__segment',
			'clip-path': `url(#bms-gauge-clip-${uid}-${index})`,
			'data-index': String(index),
		});
		segment.appendChild(createGradientLayer());
		fillGroup.appendChild(segment);
	});

	svg.appendChild(defs);
	svg.appendChild(baseGroup);
	svg.appendChild(fillGroup);
}

function setGradeModifier(root, gradeLabel) {
	GRADE_STOPS.forEach(({ label }) => root.classList.remove(`bms-grade-gauge--grade-${label}`));
	root.classList.add(`bms-grade-gauge--grade-${gradeLabel}`);
}

function updateLabel(root, score) {
	const label = root.querySelector('.bms-grade-gauge__label');
	const scoreEl = root.querySelector('.bms-grade-gauge__score-value');
	const grade = getGrade(score);

	if (label) {
		label.textContent = grade.label;
		label.style.color = grade.color;
	}

	if (scoreEl) {
		scoreEl.textContent = score.toFixed(1);
	}

	root.dataset.score = String(score);
	root.dataset.grade = grade.label;
	setGradeModifier(root, grade.label);
}

function getGaugeLayers(root) {
	return {
		segments: [...root.querySelectorAll('.bms-grade-gauge__segment')],
		basePaths: [...root.querySelectorAll('.bms-grade-gauge__segment-base')],
	};
}

function setActiveSegment(root, index, active) {
	const { segments, basePaths } = getGaugeLayers(root);
	segments[index]?.classList.toggle('is-active', active);
	basePaths[index]?.classList.toggle('is-hidden', active);
}

function resetGaugeLayers(root) {
	getGaugeLayers(root).segments.forEach((segment) => segment.classList.remove('is-active'));
	getGaugeLayers(root).basePaths.forEach((path) => path.classList.remove('is-hidden'));
}

function fillInstant(root, score) {
	const activeCount = scoreToActiveCount(score);
	for (let index = 0; index < activeCount; index += 1) {
		setActiveSegment(root, index, true);
	}
	root.classList.add('is-complete');
	updateLabel(root, score);
}

function playFillAnimation(root, score) {
	const activeCount = scoreToActiveCount(score);

	if (prefersReducedMotion() || activeCount === 0) {
		fillInstant(root, score);
		return;
	}

	const scoreEl = root.querySelector('.bms-grade-gauge__score-value');
	if (scoreEl) scoreEl.textContent = '0.0';

	resetGaugeLayers(root);
	root.classList.remove('is-complete');

	const fillDuration = activeCount * STEP_MS;
	let revealed = 0;
	const startAt = performance.now() + START_DELAY_MS;

	const tick = (now) => {
		if (now < startAt) {
			requestAnimationFrame(tick);
			return;
		}

		const nextCount = Math.min(
			activeCount,
			Math.floor((now - startAt) / STEP_MS) + 1,
		);

		while (revealed < nextCount) {
			setActiveSegment(root, revealed, true);
			revealed += 1;
		}

		if (scoreEl) {
			const progress = clamp((now - startAt) / fillDuration, 0, 1);
			scoreEl.textContent = (score * progress).toFixed(1);
		}

		if (revealed < activeCount) {
			requestAnimationFrame(tick);
			return;
		}

		root.classList.add('is-complete');
		updateLabel(root, score);
	};

	requestAnimationFrame(tick);
}

function initGauge(root) {
	const svg = root.querySelector('.bms-grade-gauge__svg');
	if (!svg || root.dataset.initialized === 'true') return;

	const uid = gaugeUid;
	gaugeUid += 1;

	buildGaugeSvg(svg, uid);
	root.dataset.initialized = 'true';

	const score = parseFloat(root.dataset.score || '92.4');
	const grade = getGrade(score);

	setGradeModifier(root, grade.label);

	const label = root.querySelector('.bms-grade-gauge__label');
	if (label) {
		label.textContent = grade.label;
		label.style.color = grade.color;
	}

	playFillAnimation(root, score);
}

export function initBmsGradeGauges() {
	document.querySelectorAll('.bms-grade-gauge').forEach(initGauge);
}
