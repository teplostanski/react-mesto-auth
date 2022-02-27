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

import { Route, Routes, useNavigate } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth"
import InfoTooltip from "./InfoTooltip";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isStatusSucces, setisStatusSucces] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    api
    .getUserInfo()
      .then((resultUserInfo) => {
        setCurrentUser({
          name: resultUserInfo.name,
          about: resultUserInfo.about,
          avatar: resultUserInfo.avatar,
          _id: resultUserInfo._id
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((resultInitialCards) => {
        setCards(resultInitialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setCurrentUserEmail(res.data.email);
          setLoggedIn(true);
          navigate("/");
        }
      })
    }
  }, [loggedIn, setCurrentUserEmail, setLoggedIn, navigate]);

  function handleUpdateUser(name, about) {
    api
    .updateUserInfo(name, about)
    .then((resultUserInfo) => {
      setCurrentUser({
        name: resultUserInfo.name,
        about: resultUserInfo.about,
      });
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api.changeAvatar(link)
    .then((resultUserInfo) => {
      setCurrentUser({
        name: resultUserInfo.name,
        about: resultUserInfo.about,
        avatar: resultUserInfo.avatar,
        _id: resultUserInfo._id
      });
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }



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

  function handleAddPlaceSubmit(title, link) {
    api
    .addNewCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
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
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  };

  function handleLogin() {
    setLoggedIn(true)
  }

  function handleLogout() {
    setLoggedIn(false)
  }

  function handleFormAuthPopup(isStatusSucces, message) {
    setIsInfoTooltipPopupOpen(true);
    setisStatusSucces(isStatusSucces);
    setInfoMessage(message);
  }

  return (

      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <Header isLoggedIn={loggedIn} currentUserEmail={currentUserEmail} handleLogout={handleLogout}/>

          <Routes>
            <Route
              path="/sign-up"
              element={
                <Register handleInfoTooltip={handleFormAuthPopup} />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login handleLogin={handleLogin} handleInfoTooltip={handleFormAuthPopup} />
              }
            />

            <Route
              path="/"
              element={
                <RequireAuth redirectTo="./sign-up" loggedIn={loggedIn}>
                  <Main
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardDelete={handleConfirmationClick}
                    onCardLike={handleCardLike}
                  />
                </RequireAuth>
              }
            />
          </Routes>
          <Footer />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            closeByOverlay={closeOverlay}
            isOpen={isImagePopupOpen}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            closeByOverlay={closeOverlay}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewCard={handleAddPlaceSubmit}
            closeByOverlay={closeOverlay}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            closeByOverlay={closeOverlay}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isStatusSucces={isStatusSucces}
            onClose={closeAllPopups}
            closeByOverlay={closeOverlay}
            message={infoMessage}
          />

          <ConfirmationPopup
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleConfirmationSubmit}
            card={cardToDelete}
            closeByOverlay={closeOverlay}
          />
          </div>
      </CurrentUserContext.Provider>

  );
}

export default App;