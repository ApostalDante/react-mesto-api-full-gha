import React from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


function EditProfilePopup({ isOpen, onUpdateUser, onClose, isLoading }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name, description
    });
  };

  function handleName(evt) {
    setName(evt.target.value);
  };

  function handleDescription(evt) {
    setDescription(evt.target.value);
  };

  return (
    <PopupWithForm
      name={'user'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label htmlFor="user-input">
        <input
          className="form__input form__input_type_user-name"
          name="user-name"
          type="text"
          placeholder="Имя"
          id="user-input"
          required
          value={name || ''}
          onChange={handleName}
          minLength="2"
          maxLength="40" />
        <span className="form__input-error user-input-error"></span>
      </label>
      <label htmlFor="myself-input">
        <input
          className="form__input form__input_type_user-myself"
          name="user-myself"
          type="text"
          placeholder="Занятие"
          id="myself-input"
          required
          value={description || ''}
          onChange={handleDescription}
          minLength="2"
          maxLength="200" />
        <span className="form__input-error myself-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;