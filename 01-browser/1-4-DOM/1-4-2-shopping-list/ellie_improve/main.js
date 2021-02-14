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

const removeItem = (e) => {
	const id = e.target.dataset.id;
	const target = e.target;
	const isClickedDeleteBtn = target.matches('.delete__btn');
	const isClickedTrashIcon = target.matches('.item__delete');

	if (id && (isClickedDeleteBtn || isClickedTrashIcon)) {
		const toBeDeleted = e.target.closest(`.item__row[data-id="${id}"]`);
		toBeDeleted.remove();
	}
};
items.addEventListener('click', removeItem);

let id = 0;
function createItem(text) {
	const itemRow = document.createElement('li');
	itemRow.setAttribute('class', 'item__row');
	itemRow.setAttribute('data-id', id);

	itemRow.innerHTML = `
		<div class="item" >
			<span class="item__name">${text}</span>
			<button class="item__delete" data-id=${id}>
				<i class="far fa-trash-alt delete__btn" data-id=${id}></i>
			</button>
		</div>
		<div class="item__divider"></div>
	`;
	id++;
	return itemRow;
}
addBtn.addEventListener('click', onAdd);

input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		onAdd();
	}
});
