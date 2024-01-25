import TripListPresenter from './presenter/trip-list-presenter.js';
import EventsModel from './model/events-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsApiService from './service/events-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const contentContainerElement = document.querySelector('.trip-events');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const headerContainerElement = document.querySelector('.trip-main');

const eventsApiService = new EventsApiService(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel({eventsApiService});
const destinationsModel = new DestinationsModel({eventsApiService});
const eventsModel = new EventsModel({eventsApiService, offersModel, destinationsModel});
const filterModel = new FilterModel();

const tripListPresenter = new TripListPresenter(contentContainerElement, headerContainerElement, eventsModel, offersModel, destinationsModel, filterModel);
const headerPresenter = new HeaderPresenter(headerContainerElement, eventsModel, destinationsModel);
const filterPresenter = new FilterPresenter(filterContainerElement, eventsModel, filterModel);

eventsModel.init();

tripListPresenter.init();
headerPresenter.init();
filterPresenter.init();
