'use strict';
const CARROT_SIZE = 80;
const BUG_SIZE = 50;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const carrotSound = new Audio('../carrot/sound/carrot_pull.mp3');
const alertSound = new Audio('../carrot/sound/alert.wav');
const bgSound = new Audio('../carrot/sound/bg.mp3');
const bugSound = new Audio('../carrot/sound/bug_pull.mp3');
const gameWinSound = new Audio('../carrot/sound/game_win.mp3');
let started = false;
let score = 0;
let timer = undefined;

function startGame() {
	playSound(bgSound);
	started = true;
	initGame();
	showStopButton();
	showTimerAndScoreVisible();
	startGameTimer();
	hidePopUp();
}
function stopGame() {
	stopSound(bgSound);
	playSound(alertSound);

	started = false;
	showPlayButton();
	// hideTimerAndScore();
	stopGameTimer();
	hideGameButton();
	showPopUpWithText('REPLAY?');
}

function stopSound(sound) {
	sound.pause();
}
function finishGame(finishState) {
	stopSound(bgSound);

	started = false;
	stopGameTimer();
	hideGameButton();
	if (finishState === 'win') {
		showPopUpWithText('you won');
		playSound(gameWinSound);
	} else {
		showPopUpWithText('you Lost');
		playSound(bugSound);
	}
}
popUpRefresh.addEventListener('click', () => {
	showGameButton();
	startGame();
});

function updateScoreBoard() {
	gameScore.innerText = CARROT_COUNT - score;
}
function onFieldClick(event) {
	if (!started) {
		return;
	}
	const target = event.target;
	if (target.matches('.carrot')) {
		target.remove();
		score++;
		playSound(carrotSound);
		updateScoreBoard();
		if (score === CARROT_COUNT) {
			finishGame('win');
		}
	} else if (target.matches('.bug')) {
		finishGame('lost');
	}
}
function playSound(sound) {
	// sound.load();
	sound.currentTime = 0;
	sound.play();
}
field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
	if (started) {
		stopGame();
	} else {
		startGame();
	}
});

function hidePopUp() {
	// 미쳤네 classList add 메서드 최고다; 있으면 추가 안한대
	popUp.classList.add('pop-up--hide');
	popUp.classList.add('pop-up--hide');
	popUp.classList.add('pop-up--hide');
}
function hideTimerAndScore() {
	gameScore.style.visibility = 'hidden';
	gameTimer.style.visibility = 'hidden';
}
function showTimerAndScoreVisible() {
	gameScore.style.visibility = 'visible';
	gameTimer.style.visibility = 'visible';
}
function showPlayButton() {
	const icon = gameBtn.querySelector('.fas');
	icon.classList.add('fa-play');
	icon.classList.remove('fa-stop');
}

function showStopButton() {
	const icon = gameBtn.querySelector('.fas');
	icon.classList.add('fa-stop');
	icon.classList.remove('fa-play');
}

function stopGameTimer() {
	clearInterval(timer);
}

function hideGameButton() {
	gameBtn.style.visibility = 'hidden';
}
function showGameButton() {
	gameBtn.style.visibility = 'visible';
}
function showPopUpWithText(text) {
	popUpText.innerText = text;
	popUp.classList.remove('pop-up--hide');
}

function startGameTimer() {
	let remainingTimeSec = GAME_DURATION_SEC;
	updateTimerText(remainingTimeSec);
	timer = setInterval(() => {
		if (remainingTimeSec <= 0) {
			clearInterval(timer);
			const gameState = score === CARROT_COUNT ? 'win' : 'lost';
			finishGame(gameState);
			return;
		}
		updateTimerText(--remainingTimeSec);
	}, 1000);
}

function updateTimerText(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	gameTimer.innerText = `${minutes}:${seconds}`;
}
function initGame() {
	// reset values
	score = 0;
	field.innerHTML = '';
	gameScore.innerText = CARROT_COUNT;
	// 벌래 + 당근 생성
	// 필드에 생성
	addItem('carrot', CARROT_COUNT, '../carrot/img/carrot.png', CARROT_SIZE);
	addItem('bug', BUG_COUNT, '../carrot/img/bug.png', BUG_SIZE);
}
/**
 * create {count} of img tags in field element, by imgPath's directory png file
 * @since 1.0
 * @param {stirng} className 이미지 태그의 클래스 이름
 * @param {number} count count 개수만큼 만듬
 * @param {string} imgPath 이미지 파일이 저장되어 있는 디렉토리 정보
 * @param {number} imgSize 이미지 사이즈
 *
 */
function addItem(className, count, imgPath, imgSize) {
	const x1 = 0;
	const y1 = 0;
	const x2 = fieldRect.width;
	const y2 = fieldRect.height;

	for (let i = 0; i < count; i++) {
		const item = document.createElement('img');
		item.setAttribute('class', className);
		item.setAttribute('src', imgPath);
		item.style.position = 'absolute';
		const x = randomNumber(x1, x2 - imgSize);
		const y = randomNumber(y1, y2 - imgSize);
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;
		field.appendChild(item);
	}
}
/**
 * min, max 사이의 임의의 숫자를 반환한다.
 * @param {number} min 랜덤숫자의 시작범위
 * @param {number} max 랜덤숫자의 끝범위
 * @returns {number} 임의의 숫자
 * */
function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}
