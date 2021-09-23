import React from 'react';

const Main = () => {

  function handleEditAvatarClick() {
    console.log('click for avatar')
  }

  function handleEditProfileClick() {
    console.log('click for profile')
  }

  function handleAddPlaceClick() {
    console.log('click for add card')
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="" alt="Аватарка"/>
          <button className="profile__edit-avatar-button" type="button" aria-label="Редактировать аватарку" onClick={handleEditAvatarClick}/>
        </div>
        <h1 className="profile__name"/>
        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={handleEditProfileClick}/>
        <p className="profile__specialization"/>
        <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={handleAddPlaceClick}/>
      </section>
      <section className="cards">
      </section>
      <article className="popup popup_edit-profile">
        <form action="#" className="popup__container" name="formEditProfile" id="formEditProfile" noValidate>
          <h2 className="popup__heading">Редактировать профиль</h2>
          <fieldset className="popup__container-info">
            <input type="text" className="popup__edit-field" id="author-name" placeholder="Автор" name="name"
                   minLength="2" maxLength="40" required/>
            <span id="author-name-error" className="popup__input-error"/>
            <input type="text" className="popup__edit-field" id="author-specialization" placeholder="О себе"
                   name="about" minLength="2" maxLength="200" required/>
            <span id="author-specialization-error" className="popup__input-error"/>
            <button className="popup__save-button" type="submit" aria-label="Сохранить изменения">Сохранить</button>
          </fieldset>
          <button className="popup__close-button" type="button" aria-label="Закрыть"/>
        </form>
      </article>
      <article className="popup popup_add-card">
        <form action="#" className="popup__container" name="formAddCard" id="formAddCard" noValidate>
          <h2 className="popup__heading">Новое место</h2>
          <fieldset className="popup__container-info">
            <input type="text" className="popup__edit-field" id="place-name" placeholder="Название" name="name"
                   minLength="2" maxLength="30" required/>
            <span id="place-name-error" className="popup__input-error"/>
            <input type="url" className="popup__edit-field" id="place-link" placeholder="Ссылка на картинку"
                   name="link" required/>
            <span id="place-link-error" className="popup__input-error"/>
            <button className="popup__save-button" type="submit" aria-label="Добавить карточку">Создать</button>
          </fieldset>
          <button className="popup__close-button" type="button" aria-label="Закрыть"/>
        </form>
      </article>
      <div className="popup popup_view-card">
        <div className="popup__photo-container">
          <img src="#" alt="Фотография" className="popup__image"/>
          <p className="popup__photo-caption"/>
          <button className="popup__close-button" type="button" aria-label="Закрыть"/>
        </div>
      </div>
      <div className="popup popup_confirm-delete">
        <form action="#" className="popup__container" name="formConfirmDelete" id="formConfirmDelete" noValidate>
          <h2 className="popup__heading">Вы уверены?</h2>
          <button className="popup__save-button" type="submit">Да</button>
          <button className="popup__close-button" type="button"/>
        </form>
      </div>
      <div className="popup popup_edit-avatar">
        <form action="#" className="popup__container" name="formEditAvatar" id="formEditAvatar" noValidate>
          <h2 className="popup__heading">Обновить аватар</h2>
          <fieldset className="popup__container-info">
            <input type="url" className="popup__edit-field" id="avatar-link" name="avatar"
                   placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error" id="avatar-link-error"/>
          </fieldset>
          <button className="popup__save-button" type="submit">Сохранить</button>
          <button className="popup__close-button" type="button"/>
        </form>
      </div>
    </main>
  );
};

export default Main;
