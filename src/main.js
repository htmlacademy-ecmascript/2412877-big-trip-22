import TripListPresenter from './presenter/trip-list-presenter.js';
import EventsModel from './model/events-model.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');

const eventsModel = new EventsModel();
const tripListPresenter = new TripListPresenter(contentContainerElement, filterContainerElement, eventsModel);

tripListPresenter.init();
