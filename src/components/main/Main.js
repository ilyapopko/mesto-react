import React from 'react';
import PopupWithForm from "../popupWithForm/PopupWithForm";

const Main = (props) => {

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="" alt="Аватарка"/>
          <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватарку" onClick={props.onEditAvatar}/>
        </div>
        <h1 className="profile__name"/>
        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}/>
        <p className="profile__specialization"/>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddCard}/>
      </section>

      <section className="cards">
      </section>

      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isEditAvatarPopupOpen} onClose={props.onClose}/>
      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={props.isEditProfilePopupOpen} onClose={props.onClose}/>
      <PopupWithForm title="Новое место" name="addCard" isOpen={props.isAddCardPopupOpen} onClose={props.onClose}/>

      {/*<PopupWithForm title="Вы уверены?" name="confirmDelete" isOpen={props.isEditAvatarPopupOpen}/>*/}

    </main>
  );
};

export default Main;
