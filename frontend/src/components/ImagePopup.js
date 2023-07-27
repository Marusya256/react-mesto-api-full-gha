
function ImagePopup (props) {
  return (
    <div className={`popup popup-view` + (props.card ? ' popup_opened' : '')}>
      <div className="popup-image">
        <img className="popup__photo" src={props.card?.link} alt={props.card?.name}/>
        <h3 className="popup__label">{props.card?.name}</h3>
        <button type="button" className="button button_type_close" id="close-img" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
