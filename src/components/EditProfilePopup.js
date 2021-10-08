import React, {useContext, useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, onSetSubmitDisabled, onCheckValidation}) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAboutValid, setIsAboutValid] = useState(true);
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageAbout, setErrorMessageAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    setIsNameValid(true);
    setIsAboutValid(true);
    setErrorMessageName('');
    setErrorMessageAbout('');
    onSetSubmitDisabled(false);
  }, [currentUser, isOpen]);

  useEffect(() => {
    onSetSubmitDisabled(!(isNameValid && isAboutValid));
  }, [isNameValid, isAboutValid]);

  function handleNameChange(e) {
    setName(e.target.value);
    onCheckValidation(e.target, setIsNameValid, setErrorMessageName);
  }


  function handleAboutChange(e) {
    setAbout(e.target.value);
    onCheckValidation(e.target, setIsAboutValid, setErrorMessageAbout);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen}
                   onClose={onClose} submitHeader="Сохранить" onSubmit={handleSubmit}>
      <input value={name} type="text" className="popup__edit-field" id="author-name" placeholder="Автор" name="name"
             onChange={handleNameChange}
             minLength="2"
             maxLength="40" required/>
      <span id="author-name-error"
            className={`popup__input-error ${!isNameValid && 'popup__input-error_visible'}`}>{errorMessageName}</span>
      <input value={about} type="text" className="popup__edit-field" id="author-specialization" placeholder="О себе"
             onChange={handleAboutChange}
             name="about"
             minLength="2" maxLength="200" required/>
      <span id="author-specialization-error"
            className={`popup__input-error ${!isAboutValid && 'popup__input-error_visible'}`}>{errorMessageAbout}</span>
    </PopupWithForm>

  );
};

export default EditProfilePopup;
