import React from 'react';

const ViewAuthorPopup = ({isOpen, card}) => {
  return (
    <div className={`popup popup_type_view-author ${isOpen && 'popup_opened'}`}>
      <img className="popup__card-author-avatar" src="#" alt="Аватарка"/>
      <p className="popup__card-author-name"/>
      <p className="popup__card-author-about"/>
    </div>
  );
};

export default ViewAuthorPopup;

