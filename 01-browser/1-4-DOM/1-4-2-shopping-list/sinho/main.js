function init() {
	const input = document.querySelector('input');
	const form = document.querySelector('form');
	const section = document.querySelector('section');
	const plusBtn = document.querySelector('.plus-icon');

	// i tag와 trash span tag의 범위가 달라 div item판단하는 로직을 위해 필요한 재귀

	const removeBy = (item) => {
		item.remove();
	};
	function clickRemoveBtn(e) {
		const targetItem = e.target.closest('.item');
		if (!targetItem) {
			return;
		}
		if (!section.contains(targetItem)) {
			return;
		}
		if (
			!e.target.classList.contains('trash') &&
			!e.target.classList.contains('fa-trash-alt')
		) {
			return;
		}
		removeBy(targetItem);
	}

	section.addEventListener('click', clickRemoveBtn);

	const addItem = (item) => {
		const div = document.createElement('div');
		div.setAttribute('class', 'item');

		const spanLeft = document.createElement('span');
		spanLeft.setAttribute('class', 'item-text');
		spanLeft.textContent = `${item}`;

		const spanRight = document.createElement('span');
		spanRight.setAttribute('class', 'trash');
		spanRight.innerHTML = '<i class="far fa-trash-alt"></i>';

		div.appendChild(spanLeft);
		div.appendChild(spanRight);

		// add event remove
		// 이벤트 위임으로 성능 향상 가능할듯
		section.appendChild(div);

		div.scrollIntoView({ block: 'center', behavior: 'smooth' });
	};

	const submit = (e) => {
		e.preventDefault();
		const value = input.value;
		if (!value) return;

		addItem(value);
		input.value = '';
		input.focus();
	};

	form.addEventListener('submit', submit);
	plusBtn.addEventListener('click', submit);
}

init();
