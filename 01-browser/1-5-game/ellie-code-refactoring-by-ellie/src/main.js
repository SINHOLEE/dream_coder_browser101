'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameFinishBanner = new PopUp();
const carrotGame = new Game(
	GAME_DURATION_SEC,
	gameFinishBanner, // 배너 인스턴스 주입
	CARROT_COUNT,
	BUG_COUNT,
	CARROT_SIZE
);

// popup에 콜백 등록
gameFinishBanner.setClickListener(() => {
	carrotGame.start();
});
