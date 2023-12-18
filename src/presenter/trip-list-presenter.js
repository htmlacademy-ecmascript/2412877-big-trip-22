import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render, replace } from '../framework/render.js';

export default class TripListPresenter {
  #tripListComponent = new ListView();
  #listContainer = null;
  #filterContainer = null;
  #eventsModel = null;

  constructor(listContainer, filterContainer, eventsModel) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.offersList = [...this.#eventsModel.offers];
    this.destinationsList = [...this.#eventsModel.destinations];

    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#listContainer);
    render(this.#tripListComponent, this.#listContainer);

    for (let i = 0; i < this.eventsList.length; i++) {
      this.#renderPoint(this.eventsList[i]);
    }
  }

  #renderPoint(point) {
    const escapeKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      onEditBtnClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escapeKeydownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      offers: this.offersList,
      destinations: this.destinationsList,
      onFormSubmit: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escapeKeydownHandler);
      },
      onFormReset: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escapeKeydownHandler);
      }
    });

    function replacePointToEditForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#tripListComponent.element);
  }
}
