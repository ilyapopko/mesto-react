import React, {useContext, useEffect, useRef, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditAvatarPopup = (props) => {
  const [avatar, setAvatar] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isOpen}
                   onClose={props.onClose} submitHeader="Сохранить" onSubmit={handleSubmit}>
      <input type="url" value={avatar} className="popup__edit-field" id="avatar-link" name="avatar"
             onChange={handleAvatarChange}
             placeholder="Ссылка на картинку"
             required/>
      <span className="popup__input-error" id="avatar-link-error"/>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
