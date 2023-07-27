import React from 'react';
import './../App.css';
import { CurrentUserContext } from './../context/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import Card from './../components/Card';
import Header from './../components/Header';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleAddPlaceClick() {
    props.openAddPlace();
  };

  function handleEditProfileClick() {
    props.openEditProfile();
  };

  function handleEditAvatarClick() {
    props.editAvatar();
  };

  //delete token

  const navigate = useNavigate();

  function signOut(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('token');
    navigate('/sign-in', {replace: true});
  }


  return (
    <main>
      <Header buttonText={'Выйти'} userEmail={props.userEmail} onClick={signOut}/>
      <div className="content">
        <section className="profile">
          <img className="profile__photo" src={currentUser.avatar} alt="Фото пользователя"/>
          <button type="button" className="profile__button-edit-photo" onClick={handleEditAvatarClick}></button>
          <div className="profile__info">
              <div className="profile__cover">
                <h1 className="profile__info-name" id="infoname">{currentUser.name}</h1>
                <button type="button" className="button button_type_edit" onClick={handleEditProfileClick}></button>
              </div>
              <p className="profile__info-about" id="infoabout">{currentUser.about}</p>
          </div>
          <button type="button" className="button button_type_add" onClick={handleAddPlaceClick}></button>
        </section>
        <section className="gallery">
          <div className="gallery__list">
            {props.cards.map((card, i) => {
              return <Card card={card} onCardClick={props.handleCardClick} onCardLike={props.handleCardLike} onCardDelete={props.handleCardDelete} key={card._id}/>
            })}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Main;

