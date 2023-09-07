import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({ isOpen, onUpdatePlace, onClose, isLoading }) {
  const cardName = React.useRef();
  const cardUrl = React.useRef();

  React.useEffect(() => {
    cardName.current.value = '';
    cardUrl.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdatePlace({
      name: cardName.current.value,
      link: cardUrl.current.value
    });
  };

  return (
    <PopupWithForm
      name={'card'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      buttonName={isLoading ? 'Сохранение...' : 'Создать'}
      onSubmit={handleSubmit}
    >
      <label htmlFor="card-input">
        <input
          ref={cardName}
          className="form__input form__input_type_card-name"
          name="card-name"
          type="text"
          placeholder="Название"
          id="card-input"
          required minLength="2"
          maxLength="30" />
        <span className="form__input-error card-input-error"></span>
      </label>
      <label htmlFor="url-input">
        <input
          ref={cardUrl}
          className="form__input form__input_type_card-url"
          name="card-url"
          type="url"
          id="url-input"
          required
          placeholder="Ссылка на картинку" />
        <span className="form__input-error url-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;