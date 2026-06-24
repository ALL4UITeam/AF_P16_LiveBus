var Livebus = (() => {
  // src/js/components/bms-grade-gauge-paths.js
  var GAUGE_PATHS = [
    "M0.0161802 111.072C0.276585 107.442 3.59169 104.885 7.20251 105.34L38.7491 109.322C41.0963 109.618 42.7469 111.761 42.5776 114.121C42.4083 116.48 40.4689 118.366 38.1034 118.325L6.31084 117.769C2.67217 117.706 -0.244206 114.702 0.0161802 111.072Z",
    "M10.3612 89.4763C6.85459 88.5132 3.21978 90.5412 2.449 94.095C1.67788 97.6503 4.13795 101.063 7.7305 101.637L39.1733 106.654C41.4868 107.024 43.6544 105.418 44.1509 103.129C44.6476 100.839 43.3247 98.5302 41.0647 97.9094L10.3612 89.4763Z",
    "M15.7593 74.2355C12.4268 72.7798 8.53494 74.2744 7.26338 77.6814C5.99095 81.0908 7.94287 84.8122 11.4181 85.8918L41.8372 95.342C44.0656 96.0343 46.4269 94.7709 47.2427 92.5847C48.0591 90.3969 47.089 87.9209 44.9491 86.9862L15.7593 74.2355Z",
    "M23.2884 59.9251C20.1982 58.0075 16.1284 58.9365 14.3815 62.1263C12.6331 65.3188 14.0351 69.2757 17.3205 70.8426L46.061 84.5501C48.1704 85.5562 50.6886 84.6503 51.8111 82.6004C52.9345 80.5488 52.3318 77.948 50.3443 76.7147L23.2884 59.9251Z",
    "M32.7878 46.8307C30.0016 44.4928 25.8369 44.8384 23.6528 47.7466C21.4665 50.6577 22.2922 54.7699 25.3206 56.7906L51.7909 74.4532C53.7417 75.7549 56.3701 75.22 57.7783 73.3447C59.1878 71.4675 58.9632 68.7944 57.1649 67.2855L32.7878 46.8307Z",
    "M44.0539 35.2128C41.6266 32.5037 37.4509 32.2596 34.8763 34.8291C32.299 37.4011 32.5355 41.5857 35.2465 44.0165L58.9271 65.2496C60.6776 66.8192 63.361 66.6642 65.0251 65.0032C66.6909 63.3405 66.8486 60.6543 65.2781 58.9013L44.0539 35.2128Z",
    "M56.8522 25.3049C54.8327 22.2791 50.7291 21.4492 47.8167 23.6289C44.9013 25.8109 44.547 29.9841 46.8868 32.7744L67.3203 57.141C68.8313 58.9428 71.5093 59.1696 73.3918 57.7605C75.2762 56.3499 75.8132 53.7124 74.5065 51.7546L56.8522 25.3049Z",
    "M70.9233 17.3122C69.3541 14.0297 65.4049 12.6272 62.2125 14.3724C59.0173 16.1191 58.0801 20.1977 60.0011 23.2912L76.7803 50.3111C78.018 52.3041 80.6293 52.9073 82.6878 51.7818C84.748 50.6553 85.6537 48.1263 84.641 46.0078L70.9233 17.3122Z",
    "M85.9847 11.4073C84.901 7.93365 81.1862 5.98265 77.7772 7.25533C74.3659 8.52887 72.864 12.43 74.325 15.7652L87.0914 44.9081C88.0297 47.05 90.5166 48.0171 92.7073 47.1991C94.8996 46.3805 96.1573 44.0138 95.4604 41.7799L85.9847 11.4073Z",
    "M101.734 7.7197C101.159 4.12614 97.7547 1.66362 94.1983 2.43522C90.6404 3.20715 88.6035 6.85059 89.5717 10.3602L98.0341 41.0346C98.6552 43.2859 100.967 44.5991 103.25 44.1039C105.533 43.6084 107.122 41.4487 106.754 39.1416L101.734 7.7197Z",
    "M117.855 6.32176C117.799 2.68284 114.771 -0.23985 111.14 0.015558C107.509 0.271004 104.981 3.58276 105.436 7.19414L109.408 38.7483C109.701 41.0747 111.797 42.7139 114.136 42.5493C116.476 42.3847 118.376 40.466 118.34 38.1212L117.855 6.32176Z",
    "M134.035 7.22146C134.492 3.60849 131.933 0.29119 128.301 0.0310081C124.668 -0.22919 121.662 2.68934 121.598 6.33075L121.043 38.0836C121.001 40.4508 122.888 42.3917 125.25 42.5609C127.611 42.73 129.756 41.0781 130.053 38.7291L134.035 7.22146Z",
    "M149.909 10.3805C150.875 6.87059 148.844 3.23156 145.286 2.46117C141.73 1.69111 138.316 4.15147 137.742 7.7446L132.723 39.1508C132.353 41.4668 133.96 43.6371 136.252 44.1335C138.543 44.6297 140.852 43.3066 141.474 41.0462L149.909 10.3805Z",
    "M165.159 15.7747C166.618 12.4389 165.122 8.54187 161.71 7.27061C158.301 6.00022 154.58 7.95154 153.499 11.4257L144.045 41.8124C143.351 44.0434 144.616 46.408 146.806 47.2239C148.994 48.0393 151.469 47.0694 152.405 44.9303L165.159 15.7747Z",
    "M179.479 23.297C181.401 20.2042 180.471 16.1287 177.276 14.3818C174.083 12.6365 170.129 14.0374 168.561 17.3203L154.846 46.0336C153.838 48.1452 154.745 50.6672 156.798 51.79C158.849 52.9118 161.448 52.3094 162.682 50.3236L179.479 23.297Z",
    "M192.582 32.7871C194.925 29.9993 194.579 25.8289 191.666 23.6445C188.755 21.4623 184.647 22.287 182.626 25.3116L164.951 51.7606C163.647 53.7129 164.182 56.3452 166.061 57.7539C167.938 59.1611 170.608 58.9366 172.117 57.1408L192.582 32.7871Z",
    "M204.209 44.0421C206.923 41.6144 207.168 37.4336 204.593 34.8584C202.022 32.2859 197.842 32.522 195.412 35.2284L174.162 58.8933C172.589 60.6445 172.744 63.3314 174.408 64.9961C176.07 66.6591 178.753 66.8166 180.505 65.2489L204.209 44.0421Z",
    "M214.126 56.8283C217.156 54.8092 217.987 50.7016 215.803 47.7886C213.621 44.8784 209.454 44.5245 206.665 46.8595L182.275 67.2823C180.471 68.7931 180.244 71.4739 181.655 73.357C183.065 75.2382 185.699 75.7744 187.655 74.4705L214.126 56.8283Z",
    "M222.128 70.8866C225.413 69.3185 226.816 65.3668 225.068 62.174C223.321 58.984 219.249 58.048 216.158 59.9646L189.109 76.737C187.114 77.9739 186.51 80.5871 187.637 82.6459C188.764 84.7029 191.289 85.6071 193.405 84.5969L222.128 70.8866Z",
    "M228.041 85.9353C231.515 84.8529 233.467 81.1372 232.192 77.7284C230.918 74.3219 227.023 72.8219 223.69 74.2794L194.513 87.0418C192.371 87.979 191.403 90.4667 192.223 92.6572C193.041 94.8463 195.404 96.1022 197.636 95.4071L228.041 85.9353Z",
    "M231.735 101.672C235.328 101.099 237.79 97.6947 237.017 94.1393C236.245 90.5854 232.606 88.5509 229.1 89.5167L198.387 97.977C196.136 98.5971 194.823 100.909 195.319 103.19C195.815 105.471 197.972 107.058 200.276 106.691L231.735 101.672Z",
    "M233.137 117.782C236.774 117.727 239.695 114.7 239.44 111.071C239.184 107.444 235.875 104.917 232.267 105.371L200.673 109.342C198.348 109.634 196.71 111.73 196.874 114.067C197.039 116.405 198.956 118.303 201.299 118.267L233.137 117.782Z"
  ];

  // src/js/components/bms-grade-gauge.js
  var SEGMENT_COUNT = GAUGE_PATHS.length;
  var SVG_NS = "http://www.w3.org/2000/svg";
  var XHTML_NS = "http://www.w3.org/1999/xhtml";
  var GRADIENT_TRANSFORM = "matrix(-0.131422 0 0 -0.127228 127.413 117.981)";
  var CONIC_GRADIENT = "conic-gradient(from 90deg,rgba(240,101,93,1) 0deg,rgba(255,179,64,1) 54deg,rgba(255,179,64,1) 90deg,rgba(82,196,124,1) 126deg,rgba(45,131,212,1) 180deg,rgba(240,101,93,1) 360deg)";
  var GRADE_STOPS = [
    { min: 95, label: "\uCD5C\uC0C1", color: "#0284c7" },
    { min: 90, label: "\uC0C1", color: "#1b8743" },
    { min: 80, label: "\uC911", color: "#d97706" },
    { min: 0, label: "\uD558", color: "#c92a2a" }
  ];
  var START_DELAY_MS = 250;
  var STEP_MS = 42;
  var gaugeUid = 0;
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
  function getGrade(score) {
    const value = clamp(score, 0, 100);
    return GRADE_STOPS.find((item) => value >= item.min) || GRADE_STOPS[GRADE_STOPS.length - 1];
  }
  function scoreToActiveCount(score) {
    return clamp(Math.round(clamp(score, 0, 100) / 100 * SEGMENT_COUNT), 0, SEGMENT_COUNT);
  }
  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function createSvgEl(name, attrs = {}) {
    const el = document.createElementNS(SVG_NS, name);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }
  function createGradientLayer() {
    const transformGroup = createSvgEl("g", { transform: GRADIENT_TRANSFORM });
    const foreignObject = createSvgEl("foreignObject", {
      x: "-969.492",
      y: "-969.492",
      width: "1938.98",
      height: "1938.98"
    });
    const div = document.createElementNS(XHTML_NS, "div");
    div.setAttribute("xmlns", XHTML_NS);
    div.style.cssText = `background:${CONIC_GRADIENT};width:100%;height:100%;opacity:1`;
    foreignObject.appendChild(div);
    transformGroup.appendChild(foreignObject);
    return transformGroup;
  }
  function buildGaugeSvg(svg, uid) {
    const defs = createSvgEl("defs");
    GAUGE_PATHS.forEach((d, index) => {
      const clip = createSvgEl("clipPath", { id: `bms-gauge-clip-${uid}-${index}` });
      clip.appendChild(createSvgEl("path", { d }));
      defs.appendChild(clip);
    });
    const baseGroup = createSvgEl("g", { class: "bms-grade-gauge__base" });
    const fillGroup = createSvgEl("g", { class: "bms-grade-gauge__fills" });
    GAUGE_PATHS.forEach((d, index) => {
      baseGroup.appendChild(
        createSvgEl("path", {
          class: "bms-grade-gauge__segment-base",
          fill: "#F0F6FC",
          d,
          "data-index": String(index)
        })
      );
      const segment = createSvgEl("g", {
        class: "bms-grade-gauge__segment",
        "clip-path": `url(#bms-gauge-clip-${uid}-${index})`,
        "data-index": String(index)
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
    const label = root.querySelector(".bms-grade-gauge__label");
    const scoreEl = root.querySelector(".bms-grade-gauge__score-value");
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
      segments: [...root.querySelectorAll(".bms-grade-gauge__segment")],
      basePaths: [...root.querySelectorAll(".bms-grade-gauge__segment-base")]
    };
  }
  function setActiveSegment(root, index, active) {
    const { segments, basePaths } = getGaugeLayers(root);
    segments[index]?.classList.toggle("is-active", active);
    basePaths[index]?.classList.toggle("is-hidden", active);
  }
  function resetGaugeLayers(root) {
    getGaugeLayers(root).segments.forEach((segment) => segment.classList.remove("is-active"));
    getGaugeLayers(root).basePaths.forEach((path) => path.classList.remove("is-hidden"));
  }
  function fillInstant(root, score) {
    const activeCount = scoreToActiveCount(score);
    for (let index = 0; index < activeCount; index += 1) {
      setActiveSegment(root, index, true);
    }
    root.classList.add("is-complete");
    updateLabel(root, score);
  }
  function playFillAnimation(root, score) {
    const activeCount = scoreToActiveCount(score);
    if (prefersReducedMotion() || activeCount === 0) {
      fillInstant(root, score);
      return;
    }
    const scoreEl = root.querySelector(".bms-grade-gauge__score-value");
    if (scoreEl) scoreEl.textContent = "0.0";
    resetGaugeLayers(root);
    root.classList.remove("is-complete");
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
        Math.floor((now - startAt) / STEP_MS) + 1
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
      root.classList.add("is-complete");
      updateLabel(root, score);
    };
    requestAnimationFrame(tick);
  }
  function initGauge(root) {
    const svg = root.querySelector(".bms-grade-gauge__svg");
    if (!svg || root.dataset.initialized === "true") return;
    const uid = gaugeUid;
    gaugeUid += 1;
    buildGaugeSvg(svg, uid);
    root.dataset.initialized = "true";
    const score = parseFloat(root.dataset.score || "92.4");
    const grade = getGrade(score);
    setGradeModifier(root, grade.label);
    const label = root.querySelector(".bms-grade-gauge__label");
    if (label) {
      label.textContent = grade.label;
      label.style.color = grade.color;
    }
    playFillAnimation(root, score);
  }
  function initBmsGradeGauges() {
    document.querySelectorAll(".bms-grade-gauge").forEach(initGauge);
  }

  // src/js/components/bms-progress.js
  var START_DELAY_MS2 = 300;
  var ROW_STAGGER_MS = 100;
  function prefersReducedMotion2() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function parseFillPct(wrap) {
    const fromData = parseFloat(wrap.dataset.fill || "");
    if (!Number.isNaN(fromData)) return fromData;
    const fromStyle = parseFloat(wrap.style.width);
    if (!Number.isNaN(fromStyle)) return fromStyle;
    const fromVar = parseFloat(wrap.style.getPropertyValue("--fill-pct"));
    if (!Number.isNaN(fromVar)) return fromVar;
    return 0;
  }
  function initProgressBar(progress, index) {
    const wrap = progress.querySelector(".bms-progress__fill-wrap");
    if (!wrap || progress.dataset.initialized === "true") return;
    const fill = parseFillPct(wrap);
    progress.dataset.initialized = "true";
    wrap.style.setProperty("--fill-pct", String(fill));
    if (prefersReducedMotion2()) {
      wrap.style.width = `${fill}%`;
      progress.classList.add("is-complete");
      return;
    }
    wrap.style.width = "0%";
    wrap.style.transitionDelay = `${START_DELAY_MS2 + index * ROW_STAGGER_MS}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrap.style.width = `${fill}%`;
      });
    });
    wrap.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName !== "width") return;
        progress.classList.add("is-complete");
      },
      { once: true }
    );
  }
  function initBmsProgressBars() {
    document.querySelectorAll(".bms-progress").forEach(initProgressBar);
  }

  // src/js/components/bms-kpi-count.js
  var START_DELAY_MS3 = 200;
  var STAGGER_MS = 80;
  var DURATION_MS = 1200;
  function prefersReducedMotion3() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function parseKpiValue(text) {
    const trimmed = text.trim();
    if (!/^[\d,]+(?:\.\d+)?$/.test(trimmed)) return null;
    const normalized = trimmed.replace(/,/g, "");
    const value = Number(normalized);
    if (Number.isNaN(value)) return null;
    const decimalPart = normalized.split(".")[1];
    const decimals = decimalPart ? decimalPart.length : 0;
    return {
      value,
      decimals,
      useComma: trimmed.includes(",")
    };
  }
  function formatKpiValue(value, decimals, useComma) {
    const fixed = value.toFixed(decimals);
    if (!useComma) return fixed;
    const [integerPart, fractionPart] = fixed.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return fractionPart !== void 0 ? `${formattedInteger}.${fractionPart}` : formattedInteger;
  }
  function easeOutCubic(progress) {
    return 1 - (1 - progress) ** 3;
  }
  function animateKpiValue(el, config, delayMs) {
    const { value: target, decimals, useComma } = config;
    const run = () => {
      el.classList.add("is-counting");
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
        el.classList.remove("is-counting");
        el.classList.add("is-complete");
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
    if (el.dataset.countInitialized === "true") return;
    const source = el.dataset.countTo ?? el.textContent;
    const config = parseKpiValue(source);
    if (!config) return;
    el.dataset.countInitialized = "true";
    el.dataset.countTo = String(config.value);
    if (prefersReducedMotion3()) {
      el.textContent = formatKpiValue(config.value, config.decimals, config.useComma);
      el.classList.add("is-complete");
      return;
    }
    el.textContent = formatKpiValue(0, config.decimals, config.useComma);
    const delayMs = START_DELAY_MS3 + index * STAGGER_MS;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          animateKpiValue(el, config, delayMs);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
  }
  function initBmsKpiCounts() {
    document.querySelectorAll(".bms-kpi__value").forEach(initKpiValue);
  }

  // src/js/components/chatbot.js
  function initChatbot() {
    const launcher = document.querySelector(".chatbot-launcher");
    const chatbot = document.getElementById("livebusChatbot");
    if (!launcher || !chatbot) return;
    const closeBtn = chatbot.querySelector(".chatbot__close");
    const openByDefault = Boolean(document.querySelector(".app--chatbot-page"));
    function setChatbotOpen(isOpen) {
      chatbot.classList.toggle("is-hidden", !isOpen);
      launcher.classList.toggle("is-active", isOpen);
      launcher.setAttribute("aria-expanded", String(isOpen));
    }
    launcher.addEventListener("click", () => {
      setChatbotOpen(chatbot.classList.contains("is-hidden"));
    });
    closeBtn?.addEventListener("click", () => {
      setChatbotOpen(false);
    });
    setChatbotOpen(openByDefault);
  }

  // src/js/page/index.js
  document.addEventListener("DOMContentLoaded", () => {
    initBmsGradeGauges();
    initBmsProgressBars();
    initBmsKpiCounts();
    initChatbot();
  });
  document.querySelectorAll(".nav-sec").forEach((sec) => {
    const summary = sec.querySelector("summary");
    if (!summary) return;
    const addCaps = () => {
      if (!summary.querySelector(".round-top")) {
        summary.insertAdjacentHTML(
          "afterbegin",
          '<em class="round-top" aria-hidden="true"></em><em class="round-bottom" aria-hidden="true"></em>'
        );
      }
    };
    const removeCaps = () => {
      summary.querySelectorAll(".round-top, .round-bottom").forEach((el) => el.remove());
    };
    const sync = () => sec.open ? addCaps() : removeCaps();
    sync();
    sec.addEventListener("toggle", sync);
  });
  document.addEventListener("DOMContentLoaded", () => {
    function openModal(id) {
      document.getElementById(id).classList.add("active");
    }
    function closeModal(id) {
      document.getElementById(id).classList.remove("active");
    }
    window.openModal = openModal;
    window.closeModal = closeModal;
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.active").forEach((modal) => {
          modal.classList.remove("active");
        });
      }
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tab--container").forEach(initTabGroup);
  });
  function initTabGroup(groupEl) {
    const tabs = groupEl.querySelectorAll(".tab--item");
    const panels = groupEl.querySelectorAll(".tab--panel");
    groupEl.addEventListener("click", (e) => {
      const tab = e.target.closest(".tab--item");
      if (!tab || !groupEl.contains(tab)) return;
      const targetId = tab.getAttribute("data-tab");
      if (!targetId) return;
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
      });
    });
  }
  document.addEventListener("DOMContentLoaded", function() {
    const toggles = document.querySelectorAll("[data-toggle]");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const group = toggle.dataset.group;
        if (group) {
          document.querySelectorAll(`[data-group="${group}"]`).forEach((el) => {
            el.classList.remove("active");
          });
          toggle.classList.add("active");
        } else {
          toggle.classList.toggle("active");
        }
      });
    });
  });
  var accItems = document.querySelectorAll(".acc-item");
  accItems.forEach((item) => {
    const btn = item.querySelector(".acc-btn");
    const panel = item.querySelector(".acc-panel");
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("is-active");
      accItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-active");
          const otherPanel = other.querySelector(".acc-panel");
          otherPanel.style.height = 0;
        }
      });
      if (isActive) {
        item.classList.remove("is-active");
        panel.style.height = 0;
      } else {
        item.classList.add("is-active");
        panel.style.height = panel.scrollHeight + "px";
      }
    });
  });
  var drake = dragula(
    [document.getElementById("dragArea")],
    {
      mirrorContainer: document.body
    }
  );
  drake.on("cloned", function(clone, original, type) {
    if (type === "mirror") {
      clone.innerHTML = "";
      clone.innerHTML = `
      <div class="ghost-drag-item">
        \uC774\uB3D9 \uC911.
      </div>
    `;
      clone.classList.add("ghost-wrapper");
    }
  });
  var listheads = document.querySelectorAll(".listhead");
  var listbodies = document.querySelectorAll(".listbody");
  listheads.forEach((head, i) => {
    const body = listbodies[i];
    if (!body) return;
    const headSpans = head.querySelectorAll("span");
    const widths = Array.from(headSpans).map(
      (span) => span.style.width || window.getComputedStyle(span).width
    );
    const gridTemplate = widths.join(" ");
    const rows = body.querySelectorAll(".board li");
    rows.forEach((row) => {
      row.style.display = "grid";
      row.style.gridTemplateColumns = gridTemplate;
    });
  });
})();
