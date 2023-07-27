import React from 'react';
import registerDone from './../images/done.png';
import registerBad from './../images/badRequest.png';

function InfoTooltip(props) {

  return (
    <div className={`popup` + (props.isOpen ? ' popup_opened' : '')}>
      <div className="popup__container">        
        <img className="tooltip__img" src={props.isGoodRequest ? registerDone : registerBad} alt="Информационный символ"></img>
        <h3 className="popup__header tooltip__header">{props.isGoodRequest ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
        <button type="button" className="button button_type_close close-edit" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;

