import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(0);
  const currentUser = useContext(CurrentUserContext);
  const [link, setLink] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
      name: currentUser.name,
      about: currentUser.about,
    });

    evt.target.reset();
  }

  useEffect(() => {
    if (isOpen) {
      setLink("");
    };
  }, [isOpen]);


  return (
    <PopupWithForm
      title="Обновить аватар"
      name="changeAvatar"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className="popup__input"
          type="url"
          name="avatar"
          id="popup-change-avatar-url"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="popup__error-message popup-change-avatar-url-error"></span>
      </label>
    </PopupWithForm>
  );
}