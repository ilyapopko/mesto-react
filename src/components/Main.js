import React, {useContext, useEffect, useState} from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка"/>
          <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватарку"
                  onClick={props.onEditAvatar}/>
        </div>
        <h1 className="profile__name">{currentUser.name}</h1>
        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль"
                onClick={props.onEditProfile}/>
        <p className="profile__specialization">{currentUser.about}</p>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddCard}/>
      </section>
      <section className="cards">
        {props.cards.map(item => {
          return (
            <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}/>
          )
        })
        }
      </section>
    </main>
  );
};

export default Main;
