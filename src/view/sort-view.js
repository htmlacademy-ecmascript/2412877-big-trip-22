import { SortTypes } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(sortType) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input
        id="sort-${sortType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortType}"
        data-sort-type="${sortType}"
        ${sortType === SortTypes.DAY ? 'checked' : ''}
        ${sortType === SortTypes.EVENT || sortType === SortTypes.OFFER ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType === SortTypes.OFFER ? 'Offers' : sortType}</label>
    </div>`
  );
}

function createSortTemplate() {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${Object.values(SortTypes).map((item) => createSortItemTemplate(item)).join('')}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortBtnClick;

  constructor({onSortChange}) {
    super();
    this.#handleSortBtnClick = onSortChange;

    this.element.addEventListener('click', this.#sortBtnClickHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortBtnClickHandler = (evt) => {
    this.#handleSortBtnClick(evt);
  };
}
