'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as Sound from './sound.js';

const CARROT_COUNT = 2;
const BUG_COUNT = 2;
const GAME_DURATION_SEC = 1;

const gameFinishBanner = new PopUp();
const carrotGame = new GameBuilder()
	.gameDuration(GAME_DURATION_SEC)
	.carrotCount(CARROT_COUNT)
	.bugCount(BUG_COUNT)
	.build();

const onGameStop = (reason) => {
	let message;
	switch (reason) {
		case Reason.lose:
			message = 'YOU LOST 💩';
			Sound.playBug();

			break;
		case Reason.win:
			message = 'YOU WON 🎉';
			Sound.playWin();

			break;
		case Reason.stop:
			message = 'REPLAY❓';
			Sound.playAlert();

			break;
		default:
			throw new Error('there is some problems');
	}
	gameFinishBanner.showWithText(message);
};
carrotGame.setGameStopListener(onGameStop);

const onClickRefreshBtn = () => {
	carrotGame.start();
};

// popup에 콜백 등록
gameFinishBanner.setClickRefreshBtnListener(onClickRefreshBtn);
