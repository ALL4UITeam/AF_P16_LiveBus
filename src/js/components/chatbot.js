export function initChatbot() {
	const launcher = document.querySelector('.chatbot-launcher');
	const chatbot = document.getElementById('livebusChatbot');
	if (!launcher || !chatbot) return;

	const closeBtn = chatbot.querySelector('.chatbot__close');
	const openByDefault = Boolean(document.querySelector('.app--chatbot-page'));

	function setChatbotOpen(isOpen) {
		chatbot.classList.toggle('is-hidden', !isOpen);
		launcher.classList.toggle('is-active', isOpen);
		launcher.setAttribute('aria-expanded', String(isOpen));
	}

	launcher.addEventListener('click', () => {
		setChatbotOpen(chatbot.classList.contains('is-hidden'));
	});

	closeBtn?.addEventListener('click', () => {
		setChatbotOpen(false);
	});

	setChatbotOpen(openByDefault);
}
