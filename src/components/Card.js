import React, { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card({ card, onCardClick, onLikeClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button button ${
    isOwn ? "card__delete-button_visible" : ""
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={() => onDeleteClick(card)}
      ></button>
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }}
      />
      <div className="card__items">
        <h2 className="card__capture">{card.name}</h2>
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => onLikeClick(card)}
        ></button>
        <p className="card__like-counter">{card.likes.length}</p>
      </div>
    </li>
  );
}

export default Card;