import React, {useContext, useEffect, useRef, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, onSetSubmitDisabled, onCheckValidation}) => {
  const [avatar, setAvatar] = useState('');
  const [isAvatarValid, setIsAvatarValid] = useState(true);
  const [errorMessageAvatar, setErrorMessageAvatar] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setAvatar(currentUser.avatar);
    setIsAvatarValid(true);
    setErrorMessageAvatar('');
    onSetSubmitDisabled(false);
  }, [currentUser, isOpen]);

  useEffect(() => {
    onSetSubmitDisabled(!isAvatarValid);
  }, [isAvatarValid]);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
    onCheckValidation(e.target, setIsAvatarValid, setErrorMessageAvatar);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen}
                   onClose={onClose} submitHeader="Сохранить" onSubmit={handleSubmit}>
      <input type="url" value={avatar} className="popup__edit-field" id="avatar-link" name="avatar"
             onChange={handleAvatarChange}
             placeholder="Ссылка на картинку"
             required/>
      <span id="avatar-link-error"
            className={`popup__input-error ${!isAvatarValid && 'popup__input-error_visible'}`}>{errorMessageAvatar}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
