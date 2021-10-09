import Popup from "./Popup";

const ImagePopup = ({isOpen, onClose, card}) => {
  return (
    <Popup isOpen={isOpen} name="view-card" onClose={onClose}>
      <div className="popup__photo-container">
        <img src={isOpen ? card.link : ''} alt={`Фотография ${isOpen ? card.name : ''}`} className="popup__image"/>
        <p className="popup__photo-caption">{isOpen ? card.name : ''}</p>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}/>
      </div>
    </Popup>
  );
};

export default ImagePopup;
