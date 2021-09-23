import React, {useEffect, useState} from 'react';
import PopupWithForm from "../popupWithForm/PopupWithForm";

import {apiServer} from "../../utils/Api";

const Main = (props) => {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    apiServer.getUserProperties()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    apiServer.getAllCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch(err => {
        console.log(err);
      });//.finally(()=>{console.log(cards)});
  }, []);


  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={userAvatar} alt="Аватарка"/>
          <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватарку"
                  onClick={props.onEditAvatar}/>
        </div>
        <h1 className="profile__name">{userName}</h1>
        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль"
                onClick={props.onEditProfile}/>
        <p className="profile__specialization">{userDescription}</p>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddCard}/>
      </section>

      <section className="cards">
        {cards.map(item => {
          return (
            <article key={item._id} className="card">
              <img src={item.link} alt="Фотография" className="card__image"/>
              <button className="card__delete-button" type="button" aria-label="Удалить карточку"/>
              <div className="card__description">
                <h2 className="card__caption">{item.name}</h2>
                <div className="card__like-container">
                  <button className="card__like-button" type="button" aria-label="Лайкнуть"/>
                  <p className="card__like-count">{item.likes.length}</p>
                </div>
              </div>
            </article>
          )
        })
        }
      </section>

      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isEditAvatarPopupOpen}
                     onClose={props.onClose}/>
      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={props.isEditProfilePopupOpen}
                     onClose={props.onClose}/>
      <PopupWithForm title="Новое место" name="addCard" isOpen={props.isAddCardPopupOpen} onClose={props.onClose}/>

      {/*<PopupWithForm title="Вы уверены?" name="confirmDelete" isOpen={props.isEditAvatarPopupOpen}/>*/}

    </main>
  );
};

export default Main;
