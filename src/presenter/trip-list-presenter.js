import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import { render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class TripListPresenter {
  #tripListComponent = new ListView();
  #listContainer = null;
  #filterContainer = null;
  #eventsModel = null;
  #pointPresenters = new Map();

  constructor(listContainer, filterContainer, eventsModel) {
    this.#listContainer = listContainer;
    this.#filterContainer = filterContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.eventsList = [...this.#eventsModel.events];
    this.offersList = [...this.#eventsModel.offers];
    this.destinationsList = [...this.#eventsModel.destinations];

    this.#renderFilters();

    if (this.eventsList.length === 0) {
      render(new EmptyListView(), this.#listContainer);
      return;
    }

    this.#renderPointsBoard();
  }

  #renderFilters() {
    render(new FilterView({points: this.eventsList}), this.#filterContainer);
  }

  #renderPointsBoard() {
    render(new SortView(), this.#listContainer);
    render(this.#tripListComponent, this.#listContainer);

    for (let i = 0; i < this.eventsList.length; i++) {
      this.#renderPoint(this.eventsList[i]);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsContainer: this.#tripListComponent.element,
      offers: this.offersList,
      destinations: this.destinationsList,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.eventsList = updateItem(this.eventsList, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetFormView());
  };

}
