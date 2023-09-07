import React from "react";


function InfoTooltip({ isOpen, onClose, image, title }) {
  return (
    <div className={`popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button type="button" aria-label="close" className="popup__close" onClick={onClose} />
        <div className="popup__status">
          <img src={image} className="popup__status-image" alt={title} />
          <h2 className="popup__status-info">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;