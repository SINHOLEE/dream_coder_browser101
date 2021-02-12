function init() {
	const input = document.querySelector('input');
	const form = document.querySelector('form');
	const section = document.querySelector('section');
	const plusBtn = document.querySelector('.plus-icon');

	// i tag와 trash span tag의 범위가 달라 div item판단하는 로직을 위해 필요한 재귀
	const getItemDivOrNull = (elem) => {
		if (elem.classList.contains('item')) {
			return elem;
		}
		if (elem.parentNode === null) {
			return null;
		}
		return getItemDivOrNull(elem.parentNode);
	};

	const removeBy = (item) => {
		item.remove();
	};
	const clickRemoveBtn = (e) => {
		const targetItem = getItemDivOrNull(e.target);
		removeBy(targetItem);
	};

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
		spanRight.addEventListener('click', clickRemoveBtn);
		section.appendChild(div);
	};

	const submit = (e) => {
		e.preventDefault();
		const value = input.value;
		if (!value) return;

		addItem(value);
		input.value = '';
	};

	form.addEventListener('submit', submit);
	plusBtn.addEventListener('click', submit);
}

init();
