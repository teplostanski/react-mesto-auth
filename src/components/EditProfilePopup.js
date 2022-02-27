import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      closeByOverlay={props.closeByOverlay}
    >
      <label className="form__field">
        <input
          type="text"
          name="name"
          id="popup-profile-title"
          placeholder="Ваше имя"
          value={name}
          required className="form__input"
          maxLength="40"
          minLength="2"
          onChange={handleNameChange}
        />
        <span className="popup__error-message popup-profile-title-error"></span>
      </label>
      <label className="form__field">
        <input
          type="text"
          name="about"
          id="popup-profile-description"
          placeholder="Расскажите о себе"
          value={description}
          required className="form__input"
          maxLength="200"
          minLength="2"
          onChange={handleDescriptionChange}
        />
        <span className="popup__error-message popup-profile-description-error"></span>
      </label>
    </PopupWithForm>
  );
}
