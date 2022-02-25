import { useEffect } from "react";

function Popup(props) {

  function closePopupOnEscButtonKeyDown(event) {
    if (event.key === 'Escape') {
      props.setOpenState(false);
    }
  }

  function handleClosePopup(event) {

    if (!(event.target === event.currentTarget || event.target.classList.contains('popup__close'))) {
      return;
    };
    props.setOpenState(false);
  }

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keydown', closePopupOnEscButtonKeyDown);
    } else {
      document.removeEventListener('keydown', closePopupOnEscButtonKeyDown);
    }
  }, [props.isOpen])

  return (
    <div className={`popup ${props.isOpen?"popup_opened":""}`} onClick={handleClosePopup}>
      <div className="popup__container">
        <button className="popup__close button" type="button" aria-label="Закрыть"></button>
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
