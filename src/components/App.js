import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(undefined);
  const [cardToDelete, setCardToDelete] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser(user) {
    api
      .updateUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleConfirmationSubmit(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleConfirmationClick = (card) => {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
    setCardToDelete(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(undefined);
    setCardToDelete(undefined);
  };

  return (
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}>

      <Header />
      <Routes>
        <Route
          path="/sign-up"
        />
        <Route
          path="/sign-in"
        />
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/sign-in">
              <Main
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardDelete={handleConfirmationClick}
                onCardLike={handleCardLike}
              />
              <Footer />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />

              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddNewCard={handleAddPlaceSubmit}
              />

              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />

              <ConfirmationPopup
                isOpen={isConfirmationPopupOpen}
                onClose={closeAllPopups}
                onSubmit={handleConfirmationSubmit}
                card={cardToDelete}
              />
            </RequireAuth>
          }
        />
      </Routes>

    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;