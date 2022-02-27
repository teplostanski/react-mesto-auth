import React, { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = isOwn ? 'card__delete-button button' : 'card__delete-button card__delete-button_hidden'
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = isLiked ? 'card__like-button card__like-button_active' : 'card__like-button button'

  function handleClick() {
    props.handleClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}>
      </button>
      <img className="card__img" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__items">
        <h2 className="card__capture">{props.card.name}</h2>
        <div className="card__like-section">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
