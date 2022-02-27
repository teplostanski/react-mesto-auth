import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="changeAvatar"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      closeByOverlay={props.closeByOverlay}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          type="url"
          name="photo"
          id="popup-change-avatar-url"
          placeholder="Ссылка на картинку"
          required className="form__input"
          ref={avatarRef}
        />
        <span className="popup__error-message popup-change-avatar-url-error"></span>
      </label>
    </PopupWithForm>
  );
}