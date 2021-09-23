import React from 'react';

const Card = (props) => {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <article className="card">
      <img src={props.card.link} alt="Фотография" className="card__image" onClick={handleClick}/>
      <button className="card__delete-button" type="button" aria-label="Удалить карточку"/>
      <div className="card__description">
        <h2 className="card__caption">{props.card.name}</h2>
        <div className="card__like-container">
          <button className="card__like-button" type="button" aria-label="Лайкнуть"/>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
