class CarrotManager {
	constructor($target, $carrotsCnt) {
		this.$target = $target;
		this.maxHeight = $target.getBoundingClientRect().height;
		this.maxWidth = $target.getBoundingClientRect().width;
		this.$carrotsCnt = $carrotsCnt;
	}

	createRabbitByNum(num) {
		this.$carrotsCnt.textContent = num;

		for (let i = 0; i < num; i++) {
			const carrot = this.createCarrotImg();
			this.$target.appendChild(carrot);
		}
	}

	getRandomSize(max) {
		return Math.random() * max;
	}

	removeAll() {
		const carrots = this.$target.querySelectorAll('.carrot');
		carrots.forEach((carrot) => {
			carrot.remove();
		});
	}

	removeByImg(img) {
		if (img.tagName === 'IMG') {
			img.remove();
			this.$carrotsCnt.textContent = parseInt(this.$carrotsCnt.textContent) - 1;
		}
	}
	createCarrotImg() {
		const innerHTML = `
			<img
				name=carrot
				class="charactor carrot"
				src="../carrot/img/carrot.png"
				style= "transform: translate(${this.getRandomSize(
					this.maxWidth - 80
				)}px, ${this.getRandomSize(this.maxHeight - 80)}px)"
				alt="carrot"
			/>
		`;
		const carrot = document.createElement('div');
		carrot.innerHTML = innerHTML;
		return carrot.firstElementChild;
	}
}
class BugManager {
	constructor($target) {
		this.$target = $target;
		this.maxHeight = $target.getBoundingClientRect().height;
		this.maxWidth = $target.getBoundingClientRect().width;
	}

	createBugsByNum(num) {
		for (let i = 0; i < num; i++) {
			const bug = this.createBugImg();
			this.$target.appendChild(bug);
		}
	}

	getRandomSize(max) {
		return Math.random() * max;
	}

	removeAll() {
		const bugs = this.$target.querySelectorAll('.bug');
		bugs.forEach((bug) => {
			bug.remove();
		});
	}

	createBugImg() {
		const innerHTML = `
			<img
				name=bug
				class="charactor bug"
				src="../carrot/img/bug.png"
				style="transform:translate(${this.getRandomSize(
					this.maxWidth - 50
				)}px, ${this.getRandomSize(this.maxHeight - 50)}px);"
				alt="bug"
			/>
		`;
		const bug = document.createElement('div');
		bug.innerHTML = innerHTML;
		return bug.firstElementChild;
	}
}

function init() {
	// audios
	const bgm = new Audio('../carrot/sound/bg.mp3');
	const bugPull = new Audio('../carrot/sound/bug_pull.mp3');
	const carrotPull = new Audio('../carrot/sound/carrot_pull.mp3');
	const lostAlert = new Audio('../carrot/sound/alert.wav');
	const winAlert = new Audio('../carrot/sound/game_win.mp3');

	// elems
	const playOrStopBtn = document.querySelector('.game__top__play-or-stop-btn');
	const timerElem = document.querySelector('.game__top__timer__item');
	const carrotsCnt = document.querySelector('.game__top__carrots-count__item');
	const gamePlayground = document.querySelector('.game__playground');
	const modal = document.querySelector('.modal');
	const modalGameText = document.querySelector('.modal__game__text');
	const bugManager = new BugManager(gamePlayground);
	const retryBtn = document.querySelector('.retry');
	const carrotManager = new CarrotManager(gamePlayground, carrotsCnt);
	let time;
	let timeout;
	let timeInterval;

	const clickBug = () => {
		lostGame();
		bugPull.load();
		bugPull.play();
	};
	const clickCarrot = (target) => {
		carrotPull.load();
		carrotPull.play();
		carrotManager.removeByImg(target);
		if (carrotsCnt.innerHTML === '0') {
			winGame();
		}
	};

	const handleClick = (e) => {
		const target = e.target;
		if (target.tagName !== 'IMG') {
			return;
		}
		if (target.classList.contains('bug')) {
			clickBug();
			return;
		}
		if (target.classList.contains('carrot')) {
			clickCarrot(target);
		}
	};
	gamePlayground.addEventListener('click', handleClick);
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

		bugManager.removeAll();
		carrotManager.removeAll();
		// 모달 원상태
		if (!modal.classList.contains('hidden')) {
			modal.classList.add('hidden');
		}
	}
	initGame();

	function winGame() {
		modalGameText.textContent = 'YOU WON!!';
		stopGame();
		winAlert.load();
		winAlert.play();
	}

	function lostGame() {
		modalGameText.textContent = 'YOU LOST';
		stopGame();
		lostAlert.load();
		lostAlert.play();
	}

	function stopGame() {
		togglePlayOrStopBtn();
		bgm.pause();
		if (modal.classList.contains('hidden')) {
			modal.classList.remove('hidden');
		}
		if (timeout) {
			clearInterval(timeInterval);
			clearTimeout(timeout);
		}
	}

	function gameStart() {
		bgm.load();
		bgm.play();
		togglePlayOrStopBtn();
		bugManager.createBugsByNum(15);
		carrotManager.createRabbitByNum(10);
		timeInterval = setInterval(() => {
			time--;
			timerElem.textContent = `00:${time.toString().padStart(2, '0')}`;
		}, 1000);
		timeout = setTimeout(lostGame, 10000);
	}
	function getCurrentIcon() {
		return playOrStopBtn.dataset.currenticon;
	}
	const switchGame = () => {
		const currentIcon = getCurrentIcon();
		if (currentIcon === 'play') {
			initGame();
			gameStart();
		} else {
			lostGame();
		}
	};
	retryBtn.addEventListener('click', switchGame);
	playOrStopBtn.addEventListener('click', switchGame);

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
}

init();
