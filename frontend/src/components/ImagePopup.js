import React from "react";


function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_img ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_img">
        <button type="button" aria-label="close" className="popup__close" onClick={onClose} />
        <img className="popup__image" src={card ? card.link : ''}
          alt={card ? card.name : ''} />
        <h2 className="popup__title">{card ? card.name : ''}</h2>
      </div>
    </div>
  );
};

export default ImagePopup;