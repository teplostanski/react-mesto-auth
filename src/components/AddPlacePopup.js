import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddNewCard }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddNewCard({ name, link });
    //setName("");
    //setLink("");
  }

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    };
   }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="profileaddCard"
      submitText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className="popup__input"
          type="text"
          name="place"
          id="popup-place-name"
          placeholder="Название места"
          required
          maxLength="30"
          minLength="2"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <span className="popup__error-message popup-place-name-error"></span>
      </label>
      <label>
        <input
          className="popup__input"
          type="url"
          name="url"
          id="popup-place-url"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={(evt) => setLink(evt.target.value)}
        />
        <span className="popup__error-message popup-place-url-error"></span>
      </label>
    </PopupWithForm>
  );
}