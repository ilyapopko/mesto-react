import React, {useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page__container">
      <Header/>
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddCard={handleAddCardClick}
            onClose={handleCloseAllPopups} onCardClick={handleCardClick} card={selectedCard}/>

      <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isEditAvatarPopupOpen}
                     onClose={handleCloseAllPopups} submitHeader="Сохранить">
        <input type="url" className="popup__edit-field" id="avatar-link" name="avatar" placeholder="Ссылка на картинку"
               required/>
        <span className="popup__input-error" id="avatar-link-error"/>
      </PopupWithForm>
      <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isEditProfilePopupOpen}
                     onClose={handleCloseAllPopups} submitHeader="Сохранить">
        <input type="text" className="popup__edit-field" id="author-name" placeholder="Автор" name="name" minLength="2"
               maxLength="40" required/>
        <span id="author-name-error" className="popup__input-error"/>
        <input type="text" className="popup__edit-field" id="author-specialization" placeholder="О себе" name="about"
               minLength="2" maxLength="200" required/>
        <span id="author-specialization-error" className="popup__input-error"/>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="addCard" isOpen={isAddCardPopupOpen} onClose={handleCloseAllPopups}
                     submitHeader="Добавить">
        <input type="text" className="popup__edit-field" id="place-name" placeholder="Название" name="name"
               minLength="2" maxLength="30" required/>
        <span id="place-name-error" className="popup__input-error"/>
        <input type="url" className="popup__edit-field" id="place-link" placeholder="Ссылка на картинку" name="link"
               required/>
        <span id="place-link-error" className="popup__input-error"/>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={handleCloseAllPopups}/>

      {/*<PopupWithForm title="Вы уверены?" name="confirmDelete" isOpen={isEditAvatarPopupOpen}/>*/}

      <Footer/>
    </div>
  );
}

export default App;
