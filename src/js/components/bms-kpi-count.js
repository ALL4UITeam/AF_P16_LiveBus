const START_DELAY_MS = 200;
const STAGGER_MS = 80;
const DURATION_MS = 1200;

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function parseKpiValue(text) {
	const trimmed = text.trim();
	if (!/^[\d,]+(?:\.\d+)?$/.test(trimmed)) return null;

	const normalized = trimmed.replace(/,/g, '');
	const value = Number(normalized);
	if (Number.isNaN(value)) return null;

	const decimalPart = normalized.split('.')[1];
	const decimals = decimalPart ? decimalPart.length : 0;

	return {
		value,
		decimals,
		useComma: trimmed.includes(','),
	};
}

function formatKpiValue(value, decimals, useComma) {
	const fixed = value.toFixed(decimals);
	if (!useComma) return fixed;

	const [integerPart, fractionPart] = fixed.split('.');
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return fractionPart !== undefined
		? `${formattedInteger}.${fractionPart}`
		: formattedInteger;
}

function easeOutCubic(progress) {
	return 1 - (1 - progress) ** 3;
}

function animateKpiValue(el, config, delayMs) {
	const { value: target, decimals, useComma } = config;

	const run = () => {
		el.classList.add('is-counting');
		const start = performance.now();

		const tick = (now) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / DURATION_MS, 1);
			const current = target * easeOutCubic(progress);

			el.textContent = formatKpiValue(current, decimals, useComma);

			if (progress < 1) {
				requestAnimationFrame(tick);
				return;
			}

			el.textContent = formatKpiValue(target, decimals, useComma);
			el.classList.remove('is-counting');
			el.classList.add('is-complete');
		};

		requestAnimationFrame(tick);
	};

	if (delayMs > 0) {
		window.setTimeout(run, delayMs);
		return;
	}

	run();
}

function initKpiValue(el, index) {
	if (el.dataset.countInitialized === 'true') return;

	const source = el.dataset.countTo ?? el.textContent;
	const config = parseKpiValue(source);
	if (!config) return;

	el.dataset.countInitialized = 'true';
	el.dataset.countTo = String(config.value);

	if (prefersReducedMotion()) {
		el.textContent = formatKpiValue(config.value, config.decimals, config.useComma);
		el.classList.add('is-complete');
		return;
	}

	el.textContent = formatKpiValue(0, config.decimals, config.useComma);

	const delayMs = START_DELAY_MS + index * STAGGER_MS;
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				observer.disconnect();
				animateKpiValue(el, config, delayMs);
			});
		},
		{ threshold: 0.2 },
	);

	observer.observe(el);
}

export function initBmsKpiCounts() {
	document.querySelectorAll('.bms-kpi__value').forEach(initKpiValue);
}
