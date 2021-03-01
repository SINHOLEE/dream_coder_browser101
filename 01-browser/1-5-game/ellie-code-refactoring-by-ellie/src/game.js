'use strict';
import { Field, ItemType } from './field.js';
import * as Sound from './sound.js';

export const Reason = Object.freeze({
	win: 'win',
	lose: 'lose',
	stop: 'stop',
});

// 생성자 함수에 3개 이상 변수가 들어갈 경우 사용하는 패턴
// 가독성을 높인다.
export class GameBuilder {
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
		// 상수
		this.gameDurationSec = gameDurationSec;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;

		//상태값
		this.started = false;
		this.score = 0;
		this.timer = undefined;

		// 돔 요소들
		this.gameBtn = document.querySelector('.game__button');
		this.timerIndicator = document.querySelector('.game__timer');
		this.gameScore = document.querySelector('.game__score');

		// 돔 요소에 리스너 등록
		this.gameBtn.addEventListener('click', this.onClickGamePlayBtn);

		// ioc injection of dependency
		this.gameField = new Field(this.carrotCount, this.bugCount);
		this.gameField.setItemClickListener(this.onItemClick);
		this.gameField.setIsGameStarted(this.isStarted);
	}

	onClickGamePlayBtn = () => {
		if (this.started) {
			this._stop(Reason.stop);
		} else {
			this.start();
		}
	};

	setGameStopListener = (onGameStop) => {
		this.onGameStop = onGameStop;
	};
	onItemClick = (item) => {
		if (!this.isStarted()) {
			return;
		}
		if (item === ItemType.carrot) {
			this.increaseScore();
			this.updateScoreBoard();
			if (this.isScroreEqualCarrotCount()) {
				this._stop(Reason.win);
			}
		} else if (item === ItemType.bug) {
			this._stop(Reason.lose);
		}
	};

	start() {
		this.started = true;
		this.init();
		this._showStopButton();
		this.showTimerAndScore();
		this._startTimer();
		Sound.playBackground();
	}

	_stop(reason) {
		this.started = false;
		this._hideGameButton();
		this.stopGameTimer();
		Sound.StopBackground();

		// from main for using gameFinishBanner instance
		this.onGameStop && this.onGameStop(reason);
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
				this._stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
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
		this.score = 0;
		this.gameScore.innerText = this.carrotCount;
		this.gameField.init();
	}
	updateScoreBoard() {
		this.gameScore.innerText = this.carrotCount - this.score;
	}
	increaseScore() {
		this.score++;
	}
	isStarted = () => {
		return this.started;
	};
	isScroreEqualCarrotCount() {
		return this.score === this.carrotCount;
	}
}
