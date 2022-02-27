import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__user-container">
          <div className="profile__avatar-container" title="Изменить аватар">
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар"/>
            <div className="profile__img-wrapper" onClick={props.onEditAvatar}/>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button button" title="Редактировать профиль" onClick={props.onEditProfile}>
            </button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button button" type="button" onClick={props.onAddPlace}>
        </button>
      </section>
      <section className="cards">
        {props.cards.map((card, i) => (
          <Card
            key={i} card={card}
            handleClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
