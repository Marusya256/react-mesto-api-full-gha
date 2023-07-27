import React from 'react';
import { CurrentUserContext } from './../context/CurrentUserContext';
import PopupWithForm from './../components/PopupWithForm';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="popup-edit" onSubmit={handleSubmit} onUpdateUser={props.onUpdateUser} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'}>
      <div className="popup__input-label">
        <input className="popup__input popup__input_user_name" onChange={handleChangeName} type="text" name="username" id="username" required placeholder="Введите имя" minLength="2" maxLength="40" value={name || ''}/>
        <span className="popup__input-error username-error"></span>
      </div>      
      <div className="popup__input-label">
        <input className="popup__input popup__input_user_about" onChange={handleChangeDescription} type="text" name="aboutuser" id="aboutuser" required placeholder="Напишите о себе" minLength="2" maxLength="200" value={description || ''}/>
        <span className="popup__input-error aboutuser-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;