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

  async function handleUpdateUser(data) {
    try {
      const updateData = await apiServer.updateUserProperties(data);
      setCurrentUser(updateData);
      handleCloseAllPopups();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateAvatar(link) {
    try {
      const updateData = await apiServer.updateUserAvatar(link);
      setCurrentUser(updateData);
      handleCloseAllPopups();
    } catch (err) {
      console.log(err);
    }
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

  async function handleAddCardSubmit(data) {
    try {
      const newCard = await apiServer.addCard(data);
      setCards([newCard, ...cards]);
      handleCloseAllPopups();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteCardSubmit(card) {
    try {
      await apiServer.deleteCard(card._id);
      setCards((cards) => {
        return cards.filter((c) => c._id !== card._id);
      });
      handleCloseAllPopups();
    } catch (err) {
      console.log(err);
    }
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
                           onSetSubmitDisabled={setIsSubmitButtonDisabled}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups}
                            onUpdateUser={handleUpdateUser} onCheckValidation={checkInputValidation}
                            onSetSubmitDisabled={setIsSubmitButtonDisabled}/>
          <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={handleCloseAllPopups} onAddCard={handleAddCardSubmit}
                         onCheckValidation={checkInputValidation}
                         onSetSubmitDisabled={setIsSubmitButtonDisabled}/>
          <ConfirmDeletePopup card={selectedCard} isOpen={isConfirmDeletePopupOpen} onClose={handleCloseAllPopups}
                              onDeleteCard={handleDeleteCardSubmit} onSetSubmitDisabled={setIsSubmitButtonDisabled}/>
        </StateButtonSubmit.Provider>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={handleCloseAllPopups}/>

        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
