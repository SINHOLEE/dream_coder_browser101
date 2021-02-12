function init() {
	const vertical = document.querySelector('.vertical');
	const horizontal = document.querySelector('.horizontal');
	const target = document.querySelector('.target');
	const tag = document.querySelector('.tag');

	function changeCoordiates(obj, x, y) {
		const className = obj.className;
		switch (className) {
			case 'target':
				obj.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
				break;
			case 'tag':
				obj.style.transform = `translate(${x}px, ${y}px) translate(20px, 20px)`;
				break;
			default:
				obj.style.transform = `translate(${x}px, ${y}px)`;
		}
	}

	document.addEventListener('mousemove', (e) => {
		const x = e.clientX;
		const y = e.clientY;
		changeCoordiates(vertical, x, 0);
		changeCoordiates(horizontal, 0, y);
		changeCoordiates(target, x, y);
		changeCoordiates(tag, x, y);
		tag.innerHTML = `${x}px, ${y}px`;
	});
}

init();
