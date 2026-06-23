const START_DELAY_MS = 300;
const ROW_STAGGER_MS = 100;
const DURATION_MS = 700;

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function parseFillPct(wrap) {
	const fromData = parseFloat(wrap.dataset.fill || '');
	if (!Number.isNaN(fromData)) return fromData;

	const fromStyle = parseFloat(wrap.style.width);
	if (!Number.isNaN(fromStyle)) return fromStyle;

	const fromVar = parseFloat(wrap.style.getPropertyValue('--fill-pct'));
	if (!Number.isNaN(fromVar)) return fromVar;

	return 0;
}

function initProgressBar(progress, index) {
	const wrap = progress.querySelector('.bms-progress__fill-wrap');
	if (!wrap || progress.dataset.initialized === 'true') return;

	const fill = parseFillPct(wrap);
	progress.dataset.initialized = 'true';
	wrap.style.setProperty('--fill-pct', String(fill));

	if (prefersReducedMotion()) {
		wrap.style.width = `${fill}%`;
		progress.classList.add('is-complete');
		return;
	}

	wrap.style.width = '0%';
	wrap.style.transitionDelay = `${START_DELAY_MS + index * ROW_STAGGER_MS}ms`;

	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			wrap.style.width = `${fill}%`;
		});
	});

	wrap.addEventListener(
		'transitionend',
		(event) => {
			if (event.propertyName !== 'width') return;
			progress.classList.add('is-complete');
		},
		{ once: true },
	);
}

export function initBmsProgressBars() {
	document.querySelectorAll('.bms-progress').forEach(initProgressBar);
}
