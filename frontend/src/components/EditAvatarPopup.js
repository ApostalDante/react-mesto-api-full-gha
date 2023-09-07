import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, isLoading }) {
  const currentAvatar = React.useRef();

  React.useEffect(() => {
    currentAvatar.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: currentAvatar.current.value
    });
  };

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      buttonName={isLoading ? 'Сохранение...' : 'Создать'}
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar-input">
        <input
          ref={currentAvatar}
          className="form__input form__input_type_avatar-url"
          name="avatar-url"
          type="url"
          id="avatar-input"
          required
          placeholder="Ссылка на аватар" />
        <span className="form__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;