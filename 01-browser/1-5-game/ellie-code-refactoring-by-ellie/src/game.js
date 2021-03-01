'use strict';
import * as Sound from './sound.js';
import Field from './field.js';

export default class Game {
	constructor(
		gameDurationSec,
		gameFinishBanner,
		carrotCount,
		bugCount,
		carrotSize
	) {
		this.gameDurationSec = gameDurationSec;
		this.started = false;
		this.score = 0;
		this.timer = undefined;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.carrotSize = carrotSize;

		// ioc injection of dependency
		this.gameField = new Field(
			this.carrotCount,
			this.bugCount,
			this.carrotSize
		);
		this.gameField.setItemClickListener(this.onItemClick);

		this.gameFinishBanner = gameFinishBanner;

		this.gameBtn = document.querySelector('.game__button');
		this.timerIndicator = document.querySelector('.game__timer');
		this.gameScore = document.querySelector('.game__score');
		this.gameBtn.addEventListener('click', this.onClick);
	}

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
		this.gameFinishBanner.showWithText('REPLAY❓');

		Sound.playAlert();
		Sound.StopBackground();
	}

	finish(win) {
		this.started = false;
		this._hideGameButton();
		if (win) {
			Sound.playWin();
		} else {
			Sound.playBug();
		}
		this.stopGameTimer();
		Sound.StopBackground();
		this.gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
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
