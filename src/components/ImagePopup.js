function ImagePopup(props) {
  const popupClassName = props.isOpen ? "popup popup_opened" : "popup";
  return (
    <div className={popupClassName} onClick={props.closeByOverlay}>
      <button className="popup__close" type="button" onClick={props.onClose}>
      </button>
      <img className="popup__img-gallery" src={props.card.link}
           alt={props.card.name}/>
      <h3 className="popup__figcaption">{props.card.name}</h3>
    </div>
  );
}

export default ImagePopup;



