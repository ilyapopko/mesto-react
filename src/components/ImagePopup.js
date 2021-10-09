import React, {useEffect, useCallback} from 'react';

const ImagePopup = ({isOpen, onClose, card}) => {

  function handleCloseByOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const handleCloseByEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleCloseByEsc);
      return () => {
        document.removeEventListener('keydown', handleCloseByEsc);
      };
    }
  }, [isOpen, handleCloseByEsc]);

  return (
    <div className={`popup popup_view-card ${isOpen && 'popup_opened'}`} onMouseDown={handleCloseByOverlay}>
      <div className="popup__photo-container">
        <img src={isOpen && card.link} alt={`Фотография ${isOpen && card.name}`} className="popup__image"/>
        <p className="popup__photo-caption">{isOpen && card.name}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}/>
      </div>
    </div>
  );
};

export default ImagePopup;
