import React from 'react';

const ImagePopup = (props) => {
  let isOpen = false;
  let name = '';
  let link = '#';

  if (props.card !== null) {
    isOpen = true;
    name = props.card.name;
    link = props.card.link;
  }

  return (
    <div className={`popup popup_view-card ${isOpen && 'popup_opened'}`}>
      <div className="popup__photo-container">
        <img src={link} alt="Фотография" className="popup__image"/>
        <p className="popup__photo-caption">{name}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}/>
      </div>
    </div>
  );
};

export default ImagePopup;
