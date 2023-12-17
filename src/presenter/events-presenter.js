import {render} from './framework/render.js';
import EventsListView from '../view/events-list.js';
import TripSortView from '../view/trip-sort.js';
import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';

export default class EventsPresenter {
  #eventsContainer = null;
  #eventsModel = null;

  #eventListComponent = new EventsListView();

  #events = [];
  #offers = [];
  #destinations = [];

  constructor({eventsContainer, eventsModel}) {

    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#events = [...this.#eventsModel.events()];
    this.#offers = this.#eventsModel.offers();
    this.#destinations = this.#eventsModel.destinations();

    render(new TripSortView, this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);

    render(new EventEditView({event: this.#events[1], offers: this.#offers, destinations: this.#destinations}), this.#eventListComponent.getElement());

    for (let i = 0; i < this.#events.length; i++) {
      render(new EventView({event: this.#events[i], offers: this.#offers, destinations: this.#destinations}), this.#eventListComponent.getElement());
    }
  }
}
