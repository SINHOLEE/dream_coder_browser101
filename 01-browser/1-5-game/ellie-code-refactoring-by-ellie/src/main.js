'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 2;
const BUG_COUNT = 2;
const GAME_DURATION_SEC = 1;

const gameFinishBanner = new PopUp();
const carrotGame = new Game(
	GAME_DURATION_SEC,
	CARROT_COUNT,
	BUG_COUNT,
	CARROT_SIZE
);

// popup에 콜백 등록
gameFinishBanner.setClickListener(() => {
	carrotGame.start();
});
carrotGame.setGameStopListener((reason) => {
	switch (reason) {
		case 'lose':
			gameFinishBanner.showWithText('YOU LOST 💩');
			break;
		case 'win':
			gameFinishBanner.showWithText('YOU WON 🎉');
			break;
		case 'stop':
			gameFinishBanner.showWithText('REPLAY❓');
			break;
		default:
			throw new Error('there is some problems');
	}
});
