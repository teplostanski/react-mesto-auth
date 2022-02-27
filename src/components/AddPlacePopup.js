import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup(props) {
  const titleRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddNewCard(titleRef.current.value, linkRef.current.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="profileaddCard"
      button="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeByOverlay={props.closeByOverlay}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="text"
          name="place"
          id="popup-place-name"
          placeholder="Название места"
          required className="form__input"
          maxLength="30"
          minLength="2"
          ref={titleRef}
        />
        <span className="popup__error-message popup-place-name-error"></span>
      </label>
      <label className="form__field">
        <input
          type="url"
          name="link"
          id="popup-place-url"
          placeholder="Ссылка на картинку"
          required className="form__input"
          ref={linkRef}
        />
        <span className="popup__error-message popup-place-url-error"></span>
      </label>
    </PopupWithForm>
  );
}