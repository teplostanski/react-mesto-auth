function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id={props.name} onClick={props.closeByOverlay}>
      <button className="popup__close" type="button" onClick={props.onClose}>
      </button>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} noValidate onSubmit={props.onSubmit}>
            {props.children}
          <button className="popup__button button" type="submit">{props.button}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;