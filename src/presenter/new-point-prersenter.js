import { UpdateType, UserAction } from '../const';
import { RenderPosition, remove, render } from '../framework/render';
import AddPointView from '../view/add-point-view';


export default class NewPointPresenter {
  #container = null;
  #offers = null;
  #destinations = null;
  #handleDataChange = null;
  #handleResetForm = null;
  #addPointFormComponent = null;

  constructor({container, offers, destinations, onDataChange, onResetForm}) {
    this.#container = container;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleResetForm = onResetForm;
  }

  init() {
    this.#addPointFormComponent = new AddPointView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onFormReset: this.#closeAddPointForm,
    });
    render(this.#addPointFormComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(UserAction.ADD_EVENT, UpdateType.MAJOR, point);
    this.#closeAddPointForm();
  };

  #closeAddPointForm = () => {
    remove(this.#addPointFormComponent);
    this.#handleResetForm();
  };
}
