import React from "react";


function PopupWithForm({ name, title, children, onClose, isOpen, buttonName, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button type="button" aria-label="close" className="popup__close" onClick={onClose} />
        <form className={`form form_type_${name}`} name={name} onSubmit={onSubmit}>
          <fieldset className="form__set">
            <h2 className="form__header">{title}</h2>
            {children}
            <button type="submit" aria-label="save" className="form__save">{buttonName}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;