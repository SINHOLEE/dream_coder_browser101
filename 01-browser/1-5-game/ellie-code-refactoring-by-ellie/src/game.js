'use strict';
import * as Sound from './sound.js';
import Field from './field.js';

// 생성자 함수에 3개 이상 변수가 들어갈 경우 사용하는 패턴
// 가독성을 높인다.
export default class gameBuilder {
	gameDuration(gameDurationSec) {
		this.gameDurationSec = gameDurationSec;
		return this;
	}
	carrotCount(carrotNum) {
		this.carrotNum = carrotNum;
		return this;
	}
	bugCount(bugNum) {
		this.bugNum = bugNum;
		return this;
	}
	build() {
		return new Game(
			this.gameDurationSec, //
			this.carrotNum,
			this.bugNum
		);
	}
}

class Game {
	constructor(gameDurationSec, carrotCount, bugCount) {
		this.gameDurationSec = gameDurationSec;
		this.started = false;
		this.score = 0;
		this.timer = undefined;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;

		// ioc injection of dependency
		this.gameField = new Field(this.carrotCount, this.bugCount);
		this.gameField.setItemClickListener(this.onItemClick);

		this.gameBtn = document.querySelector('.game__button');
		this.timerIndicator = document.querySelector('.game__timer');
		this.gameScore = document.querySelector('.game__score');
		this.gameBtn.addEventListener('click', this.onClick);
	}

	setGameStopListener = (onGameStop) => {
		this.onGameStop = onGameStop;
	};
	onItemClick = (item) => {
		if (!this.isStarted()) {
			return;
		}
		if (item === 'carrot') {
			this.increaseScore();
			this.updateScoreBoard();
			if (this.isScroreEqualCarrotCount()) {
				this.finish(true);
			}
		} else if (item === 'bug') {
			this.finish(false);
		}
	};
	onClick = () => {
		if (this.started) {
			this._stop();
		} else {
			this.start();
		}
	};

	start() {
		console.log('in start game this', this);
		this.started = true;
		this.init();
		this._showStopButton();
		this.showTimerAndScore();
		this._startTimer();
		Sound.playBackground();
	}

	_stop() {
		this.started = false;
		this.stopGameTimer();
		this._hideGameButton();
		this.onGameStop && this.onGameStop('stop');
		// this.gameFinishBanner.showWithText('REPLAY❓'); // 주입된 배너 인스턴스 사용

		Sound.playAlert();
		Sound.StopBackground();
	}

	finish(win) {
		this.started = false;
		this._hideGameButton();
		if (win) {
			Sound.playWin();
			this.onGameStop('win');
		} else {
			Sound.playBug();
			this.onGameStop('lose');
		}
		this.stopGameTimer();
		Sound.StopBackground();
		// this.gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩'); // 주입된 배너 인스턴스 사용
	}

	_showStopButton() {
		const icon = this.gameBtn.querySelector('.fas');
		icon.classList.add('fa-stop');
		icon.classList.remove('fa-play');
		this.gameBtn.style.visibility = 'visible';
	}

	_hideGameButton() {
		this.gameBtn.style.visibility = 'hidden';
	}

	showTimerAndScore() {
		this.timerIndicator.style.visibility = 'visible';
		this.gameScore.style.visibility = 'visible';
	}

	_startTimer() {
		let remainingTimeSec = this.gameDurationSec;
		this._updateTimerText(remainingTimeSec);
		this.timer = setInterval(() => {
			if (remainingTimeSec <= 0) {
				clearInterval(this.timer);
				this.finish(this.score === this.carrotCount);
				return;
			}
			this._updateTimerText(--remainingTimeSec);
		}, 1000);
	}
	stopGameTimer() {
		clearInterval(this.timer);
	}

	_updateTimerText(time) {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
	}

	init() {
		console.log('in init game this ', this);
		this.score = 0;
		// field.innerHTML = '';
		this.gameScore.innerText = this.carrotCount;
		this.gameField.init();
		// 벌레와 당근을 생성한뒤 field에 추가해줌
	}
	updateScoreBoard() {
		this.gameScore.innerText = this.carrotCount - this.score;
	}
	increaseScore() {
		this.score++;
	}
	isStarted() {
		return this.started;
	}
	isScroreEqualCarrotCount() {
		return this.score === this.carrotCount;
	}
}
