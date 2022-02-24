import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card ? "popup_opened" : ""}`}>
      {card && (
        <div className="popup__gallery">
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
          <figure className="popup__figure">
            <img
              className="popup__img-gallery"
              src={card.link}
              alt={card.name}
            />
            <figcaption className="popup__figcaption">{card.name}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;