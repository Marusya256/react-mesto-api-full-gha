import React from 'react';
import PopupWithForm from './../components/PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
      <PopupWithForm title="Новое место" name="popup-place" onAddPlace={props.onAddPlace} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText={'Создать'}>
        <div className="popup__input-label">
          <input className="popup__input popup__input_img_name" onChange={handleChangeName} type="text" name="imgname" id="imgname" required placeholder="Название" minLength="2" maxLength="30" value={name || ''}/>
          <span className="popup__input-error imgname-error"></span>
        </div>
        <div className="popup__input-label">
          <input className="popup__input popup__input_img_link"  onChange={handleChangeLink} type="url" name="imglink" id="imglink" required placeholder="Ссылка на картинку" value={link || ''}/>
          <span className="popup__input-error imglink-error"></span>
        </div>
      </PopupWithForm>
  )
}

export default AddPlacePopup;