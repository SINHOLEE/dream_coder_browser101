function init() {
	const playOrStopBtn = document.querySelector('.game__top__play-or-stop-btn');
	const timerElem = document.querySelector('.game__top__timer__item');
	const carrotsCnt = document.querySelector('.game__top__carrots-count__item');
	const gamePlayground = document.querySelector('.game__playground');
	const modalItem = document.querySelector('.modal__game');
	const modalGameText = document.querySelector('.modal__game__text');
	let time;
	let timeout;
	let timeInterval;

	function initGame() {
		// 시간 원상태
		time = 10;
		timerElem.textContent = `00:${time.toString().padStart(2, '0')}`;

		// 당근 벌래 원상태
		carrotsCnt.textContent = 0;
		// 버튼 원상태
		const currentIcon = playOrStopBtn.dataset.currenticon;

		if (currentIcon !== 'play') {
			togglePlayOrStopBtn();
		}
		// 모달 원상태
		console.log(modalItem.classList);
		if (!modalItem.classList.contains('hidden')) {
			modalItem.classList.add('hidden');
		}
	}
	initGame();

	function stopGame() {
		togglePlayOrStopBtn();

		if (timeout) {
			console.log('stop');
			clearInterval(timeInterval);
			clearTimeout(timeout);
		}
	}

	function gameStart() {
		togglePlayOrStopBtn();

		console.log('start');
		timeInterval = setInterval(() => {
			time--;
			timerElem.textContent = `00:${time.toString().padStart(2, '0')}`;
		}, 1000);
		timeout = setTimeout(stopGame, 10000);
	}
	function getCurrentIcon() {
		return playOrStopBtn.dataset.currenticon;
	}
	playOrStopBtn.addEventListener('click', () => {
		const currentIcon = getCurrentIcon();
		console.log(currentIcon);
		if (currentIcon === 'play') {
			initGame();
			gameStart();
		} else {
			stopGame();
		}
	});

	function togglePlayOrStopBtn() {
		const currentIcon = playOrStopBtn.dataset.currenticon;

		playOrStopBtn.setAttribute(
			'data-currenticon',
			currentIcon === 'play' ? 'stop' : 'play'
		);
		playOrStopBtn.innerHTML =
			currentIcon === 'play'
				? '<i class="fas fa-square"></i>'
				: '<i class="fas fa-play"></i>';
	}
	function removeCharacter(character) {}
	function createBug() {}
	function createCarrot() {}
	function createTenCarrots() {}
	function createTenBugs() {}

	console.log({ playOrStopBtn });
	console.log({ timerElem });
	console.log({ carrotsCnt });
	console.log({ gamePlayground });
	console.log({ modalItem });
	console.log({ modalGameText });
}

init();
