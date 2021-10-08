import React from 'react';

const ImagePopup = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <div className={`popup popup_view-card ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__photo-container">
        <img src={props.card.link} alt={`Фотография ${props.card.name}`} className="popup__image"/>
        <p className="popup__photo-caption">{props.card.name}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}/>
      </div>
    </div>
  );
};

export default ImagePopup;
