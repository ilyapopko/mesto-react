import React, {useContext, useRef, useState} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete, onHoverCardCaption, onHoverLikeCard, onOutHover}) => {
  const currentUser = useContext(CurrentUserContext);
  const imageRef = useRef();
  const captionRef = useRef();
  const likeRef = useRef();
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (`card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`);
  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active' : ''}`);
  const needUpdateCard = useState(false);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, needUpdateCard[1]);
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
    const element = captionRef.current;
    onHoverCardCaption(card,
      {
        left: element.offsetParent.offsetLeft + element.offsetLeft,
        top: element.offsetParent.offsetTop + element.offsetTop,
        right: document.documentElement.clientWidth - element.offsetParent.offsetLeft - element.offsetLeft,
        bottom: document.documentElement.clientHeight - element.offsetParent.offsetTop - element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
        clientY: e.clientY,
      });
  }

  function handleShowLikeInfo(e) {
    const element = likeRef.current;
    onHoverLikeCard(card,
      {
        left: element.offsetParent.offsetLeft + element.offsetLeft,
        top: element.offsetParent.offsetTop + element.offsetTop,
        right: document.documentElement.clientWidth - element.offsetParent.offsetLeft - element.offsetLeft,
        bottom: document.documentElement.clientHeight - element.offsetParent.offsetTop - element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
        clientY: e.clientY
      });
  }

  function handleHideInfo() {
    onOutHover();
  }

  return (
    <article className="card">
      <img src={card.link} alt={`Фотография ${card.name}`} className="card__image" ref={imageRef}
           onClick={handleClick} onLoad={handleSetupImageProperties}/>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку"
              onClick={handleDeleteClick}/>
      <div className="card__description">
        <h2 className="card__caption" ref={captionRef} onMouseEnter={handleShowAuthorInfo}
            onMouseOut={handleHideInfo}>{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайкнуть" onClick={handleLikeClick}
                  ref={likeRef} onMouseEnter={handleShowLikeInfo} onMouseOut={handleHideInfo}/>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
