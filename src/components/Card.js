import React, {useContext, useRef} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete, onHoverCardCaption, onOutHoverCardCaption}) => {
  const currentUser = useContext(CurrentUserContext);
  const imageRef = useRef();
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (`card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`);
  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active' : ''}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleSetupImageProperties() {
    if (imageRef.current.naturalWidth < 150) {
      imageRef.current.style.objectFit = 'none';
    }
  }

  function handleShowAuthorInfo(e) {
    onHoverCardCaption(card);
  }

  function handleHideAuthorInfo(e) {
    onOutHoverCardCaption();
  }

  return (
    <article className="card">
      <img src={card.link} alt={`Фотография ${card.name}`} className="card__image" ref={imageRef}
           onClick={handleClick} onLoad={handleSetupImageProperties}/>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку"
              onClick={handleDeleteClick}/>
      <div className="card__description">
        <h2
          className="card__caption">{card.name} onMouseEnter={handleShowAuthorInfo} onMouseOut={handleHideAuthorInfo}
        </h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайкнуть" onClick={handleLikeClick}/>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
