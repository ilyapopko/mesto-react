//import logo from './logo.svg';
//import './App.css';
//import appLogo from './images/logo.svg';

import {useState} from "react";

import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
  }

  return (
    <div className="page__container">
      <Header/>
      <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddCard={handleAddCardClick}
            onClose={handleCloseAllPopups} isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isEditProfilePopupOpen={isEditProfilePopupOpen} isAddCardPopupOpen={isAddCardPopupOpen}/>
      <Footer/>

      <template id="card-template">
        <article className="card">
          <img src="#" alt="Фотография" className="card__image"/>
          <button className="card__delete-button" type="button" aria-label="Удалить карточку"/>
          <div className="card__description">
            <h2 className="card__caption"/>
            <div className="card__like-container">
              <button className="card__like-button" type="button" aria-label="Лайкнуть"/>
              <p className="card__like-count"/>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
