import React from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = (props) => {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm title="Вы уверены?" name="confirmDelete" isOpen={props.isOpen}
                   onClose={props.onClose} submitHeader="Да" onSubmit={handleSubmit}/>
  );
};

export default ConfirmDeletePopup;
