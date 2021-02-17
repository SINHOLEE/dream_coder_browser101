class Singletion {
	constructor() {}
}

class CarrotManager extends Singletion {
	constructor($target, $carrotsCnt) {
		super();
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

	getRandomSize(min, max) {
		return Math.random() * max;
	}

	removeAll() {
		const carrots = this.$target.querySelectorAll(".carrot");
		carrots.forEach((carrot) => {
			carrot.remove();
		});
	}

	removeByImg(img) {
		if (img.tagName === "IMG") {
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
				style="width:80px; height:80px; transform: translate(${this.getRandomSize(
					0,
					this.maxWidth - 80,
				)}px, ${this.getRandomSize(0, this.maxHeight - 80)}px);"
				alt="carrot"
			/>
		`;
		const carrot = document.createElement("div");
		carrot.innerHTML = innerHTML;
		return carrot.firstElementChild;
	}
}
class BugManager extends Singletion {
	constructor($target) {
		super();
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

	getRandomSize(min, max) {
		return Math.random() * max;
	}

	removeAll() {
		const bugs = this.$target.querySelectorAll(".bug");
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
				style="width:40px; height:40px; transform: translate(${this.getRandomSize(
					0,
					this.maxWidth - 50,
				)}px, ${this.getRandomSize(0, this.maxHeight - 50)}px);"
				alt="bug"
			/>
		`;
		const bug = document.createElement("div");
		bug.innerHTML = innerHTML;
		return bug.firstElementChild;
	}
}

function init() {
	const playOrStopBtn = document.querySelector(".game__top__play-or-stop-btn");
	const timerElem = document.querySelector(".game__top__timer__item");
	const carrotsCnt = document.querySelector(".game__top__carrots-count__item");
	const gamePlayground = document.querySelector(".game__playground");
	const modal = document.querySelector(".modal");
	const modalGameText = document.querySelector(".modal__game__text");
	const bugManager = new BugManager(gamePlayground);
	const carrotManager = new CarrotManager(gamePlayground, carrotsCnt);
	let time;
	let timeout;
	let timeInterval;

	const handleClick = (e) => {
		const target = e.target;
		if (target.tagName !== "IMG") {
			return;
		}
		if (target.classList.contains("bug")) {
			stopGame();
			return;
		}
		if (target.classList.contains("carrot")) {
			carrotManager.removeByImg(target);
		}
	};
	gamePlayground.addEventListener("click", handleClick);
	function initGame() {
		// 시간 원상태
		time = 10;
		timerElem.textContent = `00:${time.toString().padStart(2, "0")}`;

		// 당근 벌래 원상태
		carrotsCnt.textContent = 0;
		// 버튼 원상태
		const currentIcon = playOrStopBtn.dataset.currenticon;

		if (currentIcon !== "play") {
			togglePlayOrStopBtn();
		}

		bugManager.removeAll();
		carrotManager.removeAll();
		// 모달 원상태
		console.log(modal.classList);
		if (!modal.classList.contains("hidden")) {
			modal.classList.add("hidden");
		}
	}
	initGame();

	function stopGame() {
		togglePlayOrStopBtn();
		if (modal.classList.contains("hidden")) {
			modal.classList.remove("hidden");
		}

		if (timeout) {
			console.log("stop");
			clearInterval(timeInterval);
			clearTimeout(timeout);
		}
	}

	function gameStart() {
		togglePlayOrStopBtn();
		bugManager.createBugsByNum(15);
		carrotManager.createRabbitByNum(10);
		console.log("start");
		timeInterval = setInterval(() => {
			time--;
			timerElem.textContent = `00:${time.toString().padStart(2, "0")}`;
		}, 1000);
		timeout = setTimeout(stopGame, 10000);
	}
	function getCurrentIcon() {
		return playOrStopBtn.dataset.currenticon;
	}
	playOrStopBtn.addEventListener("click", () => {
		const currentIcon = getCurrentIcon();
		console.log(currentIcon);
		if (currentIcon === "play") {
			initGame();
			gameStart();
		} else {
			stopGame();
		}
	});

	function togglePlayOrStopBtn() {
		const currentIcon = playOrStopBtn.dataset.currenticon;

		playOrStopBtn.setAttribute("data-currenticon", currentIcon === "play" ? "stop" : "play");
		playOrStopBtn.innerHTML =
			currentIcon === "play" ? '<i class="fas fa-square"></i>' : '<i class="fas fa-play"></i>';
	}
	function removeCharacter(character) {}
	function createBug() {}
	function createCarrot() {}
	function createTenCarrots() {}
	function createTenBugs() {}
}

init();
