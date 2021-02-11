// 문제점1: 서와 텍스트의 반응속도차이로 텍스트가 커서를 쫒는다.
// 문제점2: 커서 이미지는 120px, 커서의 default position은 top0,left0이므로 영점조정하는 properties가 있지만 잘 동작하지 않는것같음.
// 문제점3: hr 제대로 구현이 안된다.
function init() {
	const body = document.querySelector('body');
	const textBox = document.createElement('div');
	const hr = document.createElement('hr');
	const vr = document.createElement('hr');
	vr.classList.add('#vertical');
	body.appendChild(textBox);
	body.appendChild(vr);
	body.appendChild(hr);
	textBox.classList.add('text-box');
	function isOutOfAim(e) {
		return e.pageX < 60 || e.pageX > 1940 || e.pageY < 60 || e.pageY > 1940;
	}
	body.addEventListener('mousemove', (e) => {
		if (isOutOfAim(e)) {
			textBox.innerHTML = '';
			return;
		}
		textBox.innerHTML = `${e.pageX}px, ${e.pageY}px`;
		textBox.style.top = `${e.pageY + 25}px`;
		textBox.style.left = `${e.pageX + 25}px`;
		vr.style.left = `${e.pageX}px`;
		hr.style.top = `${e.pageY - 23}px`;
		// console.log(textBox.style);
		// console.log(e);
	});
}

init();
