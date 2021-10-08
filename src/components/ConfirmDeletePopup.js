import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = ({isOpen, onClose, onDeleteCard, onSetSubmitDisabled, card}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onSetSubmitDisabled(false);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    onSetSubmitDisabled(true);
    onDeleteCard(card)
      .finally(() => {
        setIsLoading(false);
        onSetSubmitDisabled(false);
      });
  }

  return (
    <PopupWithForm title="Вы уверены?" name="confirmDelete" isOpen={isOpen}
                   onClose={onClose} submitDescription={isLoading ? 'Удаление...' : 'Да'}
                   onSubmit={handleSubmit}/>
  );
};

export default ConfirmDeletePopup;
