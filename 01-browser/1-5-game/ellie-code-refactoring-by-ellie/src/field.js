'use strict';
import { playCarrot } from './sound.js';
const CARROT_SIZE = 80;
export const ItemType = Object.freeze({
	carrot: 'carrot',
	bug: 'bug',
});

export class Field {
	constructor(carrotCount, bugCount) {
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.field = document.querySelector('.game__field');
		this.fieldRect = this.field.getBoundingClientRect();
		// this.field.addEventListener('click', this.onClick.bind(this));
		this.field.addEventListener('click', this.onClick);
	}
	setItemClickListener(onItemClick) {
		this.onItemClick = onItemClick;
	}
	setIsGameStarted(isGameStarted) {
		this.isGameStarted = isGameStarted;
	}

	init() {
		this.field.innerHTML = '';
		this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png');
		this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
	}
	_addItem(className, count, imgPath) {
		const x1 = 0;
		const y1 = 0;
		const x2 = this.fieldRect.width - CARROT_SIZE;
		const y2 = this.fieldRect.height - CARROT_SIZE;
		for (let i = 0; i < count; i++) {
			const item = document.createElement('img');
			item.setAttribute('class', className);
			item.setAttribute('src', imgPath);
			item.style.position = 'absolute';
			const x = randomNumber(x1, x2);
			const y = randomNumber(y1, y2);
			item.style.left = `${x}px`;
			item.style.top = `${y}px`;
			this.field.appendChild(item);
		}
	}

	// onClick(event) {
	//   const target = event.target;
	//   if (target.matches('.carrot')) {
	//     target.remove();
	//     playCarrot();
	//     this.onItemClick && this.onItemClick('carrot');
	//   } else if (target.matches('.bug')) {
	//     this.onItemClick && this.onItemClick('bug');
	//   }
	// }
	onClick = (event) => {
		if (!this.isGameStarted()) {
			//form game
			return;
		}
		const target = event.target;
		if (target.matches('.carrot')) {
			target.remove();
			playCarrot();
			this.onItemClick && this.onItemClick(ItemType.carrot); // from game
		} else if (target.matches('.bug')) {
			this.onItemClick && this.onItemClick(ItemType.bug);
		}
	};
}

function randomNumber(min, max) {
	return Math.random() * (max - min) + min;
}
