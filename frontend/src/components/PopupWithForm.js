function PopupWithForm(props) {
  
  return (
    <div className={`popup ${props.name}` + (props.isOpen ? ' popup_opened' : '')}>
      <div className="popup__container">
        <h3 className="popup__header">{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
        <fieldset className="popup__field">
            {props.children}            
            <button className="button button_type_sub" type="submit">{props.buttonText}</button>
          </fieldset>
        </form>
        <button type="button" className="button button_type_close close-edit" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;