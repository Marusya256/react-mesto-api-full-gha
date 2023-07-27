import React from 'react';
import PopupWithForm from './../components/PopupWithForm';

function DeleteCard() {

  return (
    <PopupWithForm title="Вы уверены?" name="popup-delete" buttonText={'Да'}/>
  )
}

export default DeleteCard;

