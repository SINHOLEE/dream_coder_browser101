const screen = document.querySelector('.screen');
const outer = document.querySelector('.outer');
const inner = document.querySelector('.inner');
const client = document.querySelector('.client');

function updateScreenClass() {
	screen.innerHTML = `window.screen: ${window.screen.width}, ${window.screen.height}, 브라우저 바깥의 모니터 사이즈를 말한다.`;
	outer.innerHTML = `window.outer: ${window.outerWidth}, ${window.outerHeight} 브라우저 탭, 주소창 등을 합친 사이즈`;
	inner.innerHTML = `window.inner: ${window.innerWidth}, ${window.innerHeight}, 웹페이즈 + 스크롤바 크기`;
	// 스크롤바를 못찾네..
	client.innerHTML = `documentElement.clientWith: ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}, 스크롤바를 제외한 크기`;
}
function init() {
	updateScreenClass();
	addEventListener('resize', updateScreenClass);
}
init();
