import React from 'react';
import PopupWithForm from './../components/PopupWithForm';

function EditAvatarPopup(props) {

  const userAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: userAvatar.current.value,
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="popup-update" onSubmit={handleSubmit} onUpdateAvatar={props.onUpdateAvatar} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Сохранить'}>
      <div className="popup__input-label">
        <input className="popup__input popup__input_img_update" ref={userAvatar} type="url" name="imgupdate" id="imgupdate" required placeholder="Ссылка на картинку"/>
        <span className="popup__input-error imgupdate-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

