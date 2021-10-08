import React, {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Spinner from "./Spinner";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import {apiServer} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {StateButtonSubmit} from "../contexts/StateButtonSubmit";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

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
    setIsImagePopupOpen(true);
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
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true);
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

  function handleDeleteCardSubmit(card) {
    apiServer.deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter((c) => c._id !== card._id);
        });
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
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  function checkInputValidation(input, setValid, setErrorMessage) {
    if (!input.validity.valid) {
      setValid(false);
      setErrorMessage(input.validationMessage);
    } else {
      setValid(true);
    }
  }

  function handleSetSubmitDisabled(condition) {
    setIsSubmitButtonDisabled(condition);
  }

  //Ибо тернарный оператор выглядит уродливо
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

        <StateButtonSubmit.Provider value={isSubmitButtonDisabled}>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopups}
                           onUpdateAvatar={handleUpdateAvatar} onCheckValidation={checkInputValidation}
                           onSetSubmitDisabled={handleSetSubmitDisabled}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups}
                            onUpdateUser={handleUpdateUser} onCheckValidation={checkInputValidation}
                            onSetSubmitDisabled={handleSetSubmitDisabled}/>
          <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={handleCloseAllPopups} onAddCard={handleAddCardSubmit}
                         onCheckValidation={checkInputValidation}
                         onSetSubmitDisabled={handleSetSubmitDisabled}/>
        </StateButtonSubmit.Provider>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={handleCloseAllPopups}/>

        <ConfirmDeletePopup card={selectedCard} isOpen={isConfirmDeletePopupOpen} onClose={handleCloseAllPopups}
                            onDeleteCard={handleDeleteCardSubmit}/>

        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
