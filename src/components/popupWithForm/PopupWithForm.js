import React, {useState} from 'react';

const PopupWithForm = (props) => {
  // const [title, setTitle] = useState('');
  // const [name, setName] = useState('');

  function handleCloseClick() {
    const popupDialog = document.querySelector(`.popup_type_${props.name}`);
    popupDialog.classList.remove('popup_opened');

  }

  return (
    <article className={`popup popup_type_${props.name}`}>
      <form action="#" className="popup__container" name={`form_${props.name}`} noValidate>
        <h2 className="popup__heading">{props.title}</h2>
        <fieldset className="popup__container-info">

          {props.children}

          {/*<input type="text" className="popup__edit-field" id="author-name" placeholder="Автор" name="name"*/}
          {/*       minLength="2" maxLength="40" required/>*/}
          {/*<span id="author-name-error" className="popup__input-error"/>*/}

          {/*<input type="text" className="popup__edit-field" id="author-specialization" placeholder="О себе"*/}
          {/*       name="about" minLength="2" maxLength="200" required/>*/}
          {/*<span id="author-specialization-error" className="popup__input-error"/>*/}


          <button className="popup__save-button" type="submit" aria-label="Сохранить изменения">Сохранить</button>
        </fieldset>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={handleCloseClick}/>
      </form>
    </article>
  );
};

export default PopupWithForm;

