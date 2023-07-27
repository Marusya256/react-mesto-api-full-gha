import React from 'react';
import { CurrentUserContext } from './../context/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `button button_type_like ${isLiked && 'button_type_like_active'}` 
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  };

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentId = props.card._id;

  function handleDelteClick(e) {
    e.preventDefault();

    props.onCardDelete(currentId);
  }

  return (
      <div className="gallery-item">
        <img className="gallery-item__photo" src={ props.card.link } alt={ props.card.name } onClick={handleCardClick}/>
        <div className="gallery-item__parameter">
          <h2 className="gallery-item__text">{ props.card.name }</h2>
          <div className="gallery-item__cover-like">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="gallery-item__count-like">{ props.card.likes.length }</p>
          </div>
        </div>
        {isOwn && <button type="button" className="button button_type_icon-basket" onClick={handleDelteClick}></button>}
        </div>
            
  )
}

export default Card;
