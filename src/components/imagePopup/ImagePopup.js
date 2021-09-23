import React from 'react';

const ImagePopup = () => {
  return (
    <div className="popup popup_view-card">
      <div className="popup__photo-container">
        <img src="#" alt="Фотография" className="popup__image"/>
        <p className="popup__photo-caption"/>
        <button className="popup__close-button" type="button" aria-label="Закрыть"/>
      </div>
    </div>
  );
};

export default ImagePopup;
