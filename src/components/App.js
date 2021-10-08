import React, {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Spinner from "./Spinner";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {apiServer} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    apiServer.getUserProperties()
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoading(false);
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
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    apiServer.updateUserProperties(data)
      .then((updateData) => {
        setCurrentUser(updateData);
        handleCloseAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    apiServer.updateUserAvatar(link)
      .then(updateData => {
        setCurrentUser(updateData);
        handleCloseAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    apiServer.setLikeCard(isLiked, card._id)
      .then((updateCard) => {
        setCards((cards) => {
          return cards.map((c) => {
            return c._id === card._id ? updateCard : c;
          })
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    //TODO: Добавить поддержку подтверждения удаления
    apiServer.deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter((c) => c._id !== card._id);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleAddCardSubmit(data) {
    apiServer.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(null);
  }

  if (isLoading) {
    return (<Spinner/>);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header/>
        <Main cards={cards} card={selectedCard} onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onClose={handleCloseAllPopups} onCardClick={handleCardClick} onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups}
                          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={handleCloseAllPopups} onAddCard={handleAddCardSubmit}/>

        <ImagePopup card={selectedCard} onClose={handleCloseAllPopups}/>

        {/*<PopupWithForm title="Вы уверены?" name="confirmDelete" isOpen={isEditAvatarPopupOpen}/>*/}

        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
