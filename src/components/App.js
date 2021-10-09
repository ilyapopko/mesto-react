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
import ViewAuthorPopup from "./ViewAuthorPopup";
import {apiServer} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

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

  const [isViewAuthorPopupOpen, setIsViewAuthorPopupOpen] = useState(false);

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

  function tempToggleLikeCard(card, isLiked) {
    if (isLiked) {
      card.likes = card.likes.filter((user) => user._id !== currentUser._id);
    } else {
      card.likes.push(currentUser);
    }
    setCards((cards) => {
      return cards.map((c) => {
        return c._id === card._id ? card : c;
      })
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    //Добавляем/удаляем текущего юзера в массив лайков карточки временно до получения ответа
    // от сервера для ускорения реакции интерфейса
    tempToggleLikeCard(card, isLiked);
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
        //обратим действие временной функции так как сервер вернул ошибку
        tempToggleLikeCard(card, !isLiked);
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
    setIsViewAuthorPopupOpen(false);
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

  function handleHoverCardCaption(card) {
    // console.log(isViewAuthorPopupOpen);
    // if (isViewAuthorPopupOpen) {
    //   return;
    // }
    // console.log('naveli');
    // setSelectedCard(card);
    // setIsViewAuthorPopupOpen(true);
  }

  function handleOutHoverCardCaption() {
    // console.log('closed');
    // handleCloseAllPopups();
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
              onCardDelete={handleCardDelete} onHoverCardCaption={handleHoverCardCaption}
              onOutHoverCardCaption={handleOutHoverCardCaption}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={handleCloseAllPopups}
                         onUpdateAvatar={handleUpdateAvatar} onCheckValidation={checkInputValidation}/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseAllPopups}
                          onUpdateUser={handleUpdateUser} onCheckValidation={checkInputValidation}/>
        <AddPlacePopup isOpen={isAddCardPopupOpen} onClose={handleCloseAllPopups} onAddCard={handleAddCardSubmit}
                       onCheckValidation={checkInputValidation}/>
        <ConfirmDeletePopup card={selectedCard} isOpen={isConfirmDeletePopupOpen} onClose={handleCloseAllPopups}
                            onDeleteCard={handleDeleteCardSubmit}/>
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={handleCloseAllPopups}/>

        <ViewAuthorPopup card={selectedCard} isOpen={isViewAuthorPopupOpen}/>

        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
