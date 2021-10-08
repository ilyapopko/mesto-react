import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name,
      link
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm title="Новое место" name="addCard" isOpen={props.isOpen} onClose={props.onClose}
                   submitHeader="Добавить" onSubmit={handleSubmit}>
      <input type="text" className="popup__edit-field" id="place-name" placeholder="Название" name="name"
             minLength="2" maxLength="30" required onChange={handleNameChange}/>
      <span id="place-name-error" className="popup__input-error"/>
      <input type="url" className="popup__edit-field" id="place-link" placeholder="Ссылка на картинку" name="link"
             required onChange={handleLinkChange}/>
      <span id="place-link-error" className="popup__input-error"/>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
