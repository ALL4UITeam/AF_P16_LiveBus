
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