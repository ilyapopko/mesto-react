import React from 'react';

const PopupWithForm = (props) => {
  return (
    <article className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <form action="#" className="popup__container" name={`form_${props.name}`}>
        <h2 className="popup__heading">{props.title}</h2>
        <fieldset className="popup__container-info">
          {props.children}
          <button className="popup__save-button" type="submit" aria-label="Сохранить изменения">{props.submitHeader}</button>
        </fieldset>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}/>
      </form>
    </article>
  );
};

export default PopupWithForm;

