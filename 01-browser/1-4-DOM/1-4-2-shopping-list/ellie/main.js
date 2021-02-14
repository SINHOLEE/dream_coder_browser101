const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

/**
 * 의도를 작성해라.
 * input
 */

function onAdd() {
	const text = input.value;
	if (text === '') {
		input.focus();
		return;
	}
	const item = createItem(text);
	items.appendChild(item);
	item.scrollIntoView({ block: 'center' });

	input.value = '';
	input.focus();
}

function createItem(text) {
	const itemRow = document.createElement('li');
	itemRow.setAttribute('class', 'item__row');

	const item = document.createElement('div');
	item.setAttribute('class', 'item');

	const itemNameSpan = document.createElement('span');
	itemNameSpan.setAttribute('class', 'item__name');
	itemNameSpan.innerText = text;

	const deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('class', 'item__delete');
	deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
	deleteBtn.addEventListener('click', () => {
		items.removeChild(itemRow);
	});

	item.appendChild(itemNameSpan);
	item.appendChild(deleteBtn);

	itemRow.appendChild(item);

	const itemDivider = document.createElement('div');
	itemDivider.setAttribute('class', 'item__divider');

	itemRow.appendChild(itemDivider);

	return itemRow;
}
addBtn.addEventListener('click', onAdd);

input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		onAdd();
	}
});
