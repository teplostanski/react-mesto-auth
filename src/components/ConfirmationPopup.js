import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({ isOpen, onClose, onSubmit, card }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      submitText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}