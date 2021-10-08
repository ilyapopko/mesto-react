import React, {useContext, useRef} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const imageRef = useRef();
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (`card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`);
  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active' : ''}`);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function setupImageProperties() {
    if (imageRef.current.naturalWidth < 150) {
      imageRef.current.style.objectFit = 'none';
    }
  }

  return (
    <article className="card">
      <img src={props.card.link} alt={`Фотография ${props.card.name}`} className="card__image" ref={imageRef}
           onClick={handleClick} onLoad={setupImageProperties}/>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку"
              onClick={handleDeleteClick}/>
      <div className="card__description">
        <h2 className="card__caption">{props.card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайкнуть" onClick={handleLikeClick}/>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
