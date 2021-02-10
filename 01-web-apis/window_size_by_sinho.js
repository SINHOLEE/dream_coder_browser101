const html = document.querySelector("html");
const screen = document.querySelector(".screen");
const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");
const client = document.querySelector(".client");

function handleResize() {
	screen.innerHTML = `window.screen: ${window.screen.width}, ${window.screen.height}`;
	outer.innerHTML = `window.outer: ${window.outerWidth}, ${window.outerHeight}`;
	inner.innerHTML = `window.inner: ${window.innerWidth}, ${window.innerHeight}`;
	// 스크롤바를 못찾네..
	client.innerHTML = `documentElement.clientWith: ${html.clientWidth}, ${html.clientHeight}`;
}
function init() {
	handleResize();
	addEventListener("resize", handleResize);
}
init();
