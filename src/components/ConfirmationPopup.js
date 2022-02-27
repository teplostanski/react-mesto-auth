import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      button="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      closeByOverlay={props.closeByOverlay}
    ></PopupWithForm>
  );
}