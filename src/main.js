import TripListPresenter from './presenter/trip-list-presenter.js';
import EventsModel from './model/events-model.js';
import HeaderPresenter from './presenter/header-presenter.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const headerContainerElement = document.querySelector('.trip-main');

const eventsModel = new EventsModel();
const tripListPresenter = new TripListPresenter(contentContainerElement, filterContainerElement, eventsModel);
const headerPresenter = new HeaderPresenter(headerContainerElement, eventsModel);

tripListPresenter.init();
headerPresenter.init();
