
import { buttonClick, toggleTab } from '../common/ui.js'

// sideNav
document.querySelectorAll('.nav-sec').forEach((sec) => {
		const summary = sec.querySelector('summary');
		if (!summary) return;

		const addCaps = () => {
			if (!summary.querySelector('.round-top')) {
				summary.insertAdjacentHTML(
					'afterbegin',
					'<em class="round-top" aria-hidden="true"></em>' +
					'<em class="round-bottom" aria-hidden="true"></em>'
				);
			}
		};
		const removeCaps = () => {
			summary.querySelectorAll('.round-top, .round-bottom').forEach(el => el.remove());
		};
		const sync = () => (sec.open ? addCaps() : removeCaps());

		sync();
		sec.addEventListener('toggle', sync);
});


//Modal
document.addEventListener("DOMContentLoaded", () => {
  function openModal(id) {
    document.getElementById(id).classList.add("active");
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove("active");
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  // form 모달이 많아 불편해서 제거 
  // 배경 클릭 시 닫기
  // document.addEventListener("click", function(e) {
  //   if (e.target.classList.contains("modal")) {
  //     e.target.classList.remove("active");
  //   }
  // });

  // ESC 키로 닫기
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach(modal => {
        modal.classList.remove("active");
      });
    }
  });
});	


// Tab
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab--container").forEach(initTabGroup);
});

function initTabGroup(groupEl) {
  const tabs   = groupEl.querySelectorAll(".tab--item");
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

// Toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggles = document.querySelectorAll("[data-toggle]");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const group = toggle.dataset.group;

      if (group) {
        document.querySelectorAll(`[data-group="${group}"]`).forEach(el => {
          el.classList.remove("active");
        });
        toggle.classList.add("active");
      } else {
        toggle.classList.toggle("active");
      }
    });
  });
});

//accordion 
const accItems = document.querySelectorAll(".acc-item");

  accItems.forEach((item) => {
    const btn = item.querySelector(".acc-btn");
    const panel = item.querySelector(".acc-panel");

    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("is-active");

      // 다른 항목 닫기
      accItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-active");
          const otherPanel = other.querySelector(".acc-panel");
          otherPanel.style.height = 0;
        }
      });

      // 현재 항목 토글
      if (isActive) {
        // 닫기
        item.classList.remove("is-active");
        panel.style.height = 0;
      } else {
        // 열기
        item.classList.add("is-active");
        panel.style.height = panel.scrollHeight + "px"; // 실제 내용 높이 계산
      }
    });
  });


  //dragArea
  dragula([document.getElementById('dragArea')]);

// listhead span들의 width 가져오기
const headSpans = document.querySelectorAll('.listhead span');
const widths = Array.from(headSpans).map(span =>
    window.getComputedStyle(span).width
);

// listbody 안의 모든 li를 순회하면서 width 적용
const bodyRows = document.querySelectorAll('.listbody .board li');

bodyRows.forEach(row => {
    const spans = row.querySelectorAll('span');
    spans.forEach((span, idx) => {
        if (widths[idx]) {
            span.style.width = widths[idx];
        }
    });
});