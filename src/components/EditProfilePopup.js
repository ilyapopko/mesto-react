import React, {useContext, useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about
    });
  }
  return (
    <PopupWithForm title="Редактировать профиль" name="profile" isOpen={props.isOpen}
                   onClose={props.onClose} submitHeader="Сохранить" onSubmit={handleSubmit}>
      <input value={name} type="text" className="popup__edit-field" id="author-name" placeholder="Автор" name="name"
             onChange={handleNameChange}
             minLength="2"
             maxLength="40" required/>
      <span id="author-name-error" className="popup__input-error"/>
      <input value={about} type="text" className="popup__edit-field" id="author-specialization" placeholder="О себе"
             onChange={handleAboutChange}
             name="about"
             minLength="2" maxLength="200" required/>
      <span id="author-specialization-error" className="popup__input-error"/>
    </PopupWithForm>

  );
};

export default EditProfilePopup;
