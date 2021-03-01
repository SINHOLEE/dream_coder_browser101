'use strict';
import PopUp from './popup.js';
import gameBuilder from './game.js';

const CARROT_COUNT = 2;
const BUG_COUNT = 2;
const GAME_DURATION_SEC = 1;

const gameFinishBanner = new PopUp();
const carrotGame = new gameBuilder()
	.gameDuration(GAME_DURATION_SEC)
	.carrotCount(CARROT_COUNT)
	.bugCount(BUG_COUNT)
	.build();

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
