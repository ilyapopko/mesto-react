import {useContext, useEffect, useRef, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, onCheckValidation}) => {
  // const [avatar, setAvatar] = useState('');
  const avatar = useRef();

  const [isAvatarValid, setIsAvatarValid] = useState(true);
  const [errorMessageAvatar, setErrorMessageAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    avatar.current.value = currentUser.avatar;
    setIsAvatarValid(true);
    setErrorMessageAvatar('');
    setIsSubmitDisabled(false);
  }, [currentUser, isOpen]);

  useEffect(() => {
    setIsSubmitDisabled(!isAvatarValid);
  }, [isAvatarValid]);

  function handleAvatarChange(e) {
    onCheckValidation(e.target, setIsAvatarValid, setErrorMessageAvatar);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitDisabled(true);
    onUpdateAvatar(avatar.current.value)
      .finally(() => {
        setIsLoading(false);
        setIsSubmitDisabled(false);
      });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen}
                   onClose={onClose} submitDescription={isLoading ? 'Сохранение...' : 'Сохранить'}
                   onSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled}>
      <input type="url" ref={avatar} className="popup__edit-field" id="avatar-link" name="avatar"
             onChange={handleAvatarChange}
             placeholder="Ссылка на картинку"
             required/>
      <span id="avatar-link-error"
            className={`popup__input-error ${!isAvatarValid ? 'popup__input-error_visible' : ''}`}>{errorMessageAvatar}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
