import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      submitText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className="popup__input"
          type="text"
          name="name"
          id="popup-profile-title"
          placeholder="Ваше имя"
          value={name || ''}
          required
          maxLength="40"
          minLength="2"
          onChange={(evt) => setName(evt.target.value)}
        />
        <span className="popup__error-message popup-profile-title-error"></span>
      </label>
      <label>
        <input
          className="popup__input"
          type="text"
          name="about"
          id="popup-profile-description"
          placeholder="Расскажите о себе"
          value={description || ''}
          required
          maxLength="200"
          minLength="2"
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <span className="popup__error-message popup-profile-description-error"></span>
      </label>
    </PopupWithForm>
  );
}
