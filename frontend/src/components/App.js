import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import okImg from "../images/ok.svg";
import errorImg from "../images/error.svg";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [isLogginIn, setIsLogginIn] = React.useState(false);
  const [emailUser, setEmailUser] = React.useState(null);
  const [noticeImageTooltipPopup, setNoticeImageTooltipPopup] = React.useState('');
  const [noticeTitleTooltipPopup, setNoticeTitleTooltipPopup] = React.useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getProfileDataInServer(), api.getCardsServer()]).then(([dataUser, cardObject]) => {
      setCurrentUser(dataUser)
      setCards(cardObject)
    }).catch(console.error)
  }, []);

  function addCardLike(card) {
    api.sendLikeCardToServer(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch(console.error);
  };

  function deleteCardLike(card) {
    api.deleteLikeCardToServer(card._id).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    }).catch(console.error);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      deleteCardLike(card);
    } else {
      addCardLike(card);
    }
  };

  function handleCardDelete(card) {
    api.deleteCardInServer(card._id).then(() => {
      setCards((state) => state.filter((c) => (c._id !== card._id && c)));
    }).catch(console.error);
  };

  function handleUpdateUser(dataUser) {
    setIsLoading(true);
    api.sendProfileDataToServer(dataUser).then((newDataUser) => {
      setCurrentUser(newDataUser);
      closeAllPopups();
    }).catch(console.error).finally(backnFalseIsLoading);
  };

  function handleUpdateAvatar(dataAvata) {
    setIsLoading(true);
    api.sendAvatarDataToServer(dataAvata).then((newDataAvatar) => {
      setCurrentUser(newDataAvatar);
      closeAllPopups();
    }).catch(console.error).finally(backnFalseIsLoading);
  };

  function handleAddPlaceSubmit(cardObject) {
    setIsLoading(true);
    api.addNewCardToServer(cardObject).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch(console.error).finally(backnFalseIsLoading);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setInfoTooltipPopupOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setIsLogginIn(true);
          setEmailUser(res.data.email);
        }
      }).catch(console.error);
    }
  }, []);

  React.useEffect(() => {
    if (isLogginIn === true) {
      navigate("/");
    }
  }, [isLogginIn, navigate]);

  function handleRegister(email, password) {
    setIsLoading(true);
    auth.setUserRegistration(email, password).then(() => {
      setNoticeImageTooltipPopup(okImg);
      setNoticeTitleTooltipPopup("Вы успешно зарегистрировались!");
      //  navigate("/sign-in");
      navigate("/signin");
    }).catch(() => {
      setNoticeImageTooltipPopup(errorImg);
      setNoticeTitleTooltipPopup("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(() => {
      backnFalseIsLoading();
      handleInfoTooltipClick()
    });
  };

  function handleLogin(email, password) {
    setIsLoading(true);
    auth.setUserAuthorization(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLogginIn(true);
      setEmailUser(email);
      // navigate("/");
      navigate("/signup");
    }).catch(() => {
      setNoticeImageTooltipPopup(errorImg);
      setNoticeTitleTooltipPopup("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltipClick();
    }).finally(backnFalseIsLoading);
  };

  function handleInfoTooltipClick() {
    setInfoTooltipPopupOpen(true);
  };

  function handleSignout() {
    setIsLogginIn(false);
    setEmailUser(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  };

  function backnFalseIsLoading() {
    setIsLoading(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route path="/sign-in" element={
            <>
              <Header title="Регистрация" route="/sign-up" />
              <Login handleLogin={handleLogin} isLoading={isLoading} />
            </>
          } />
          <Route path="/sign-up" element={
            <>
              <Header title="Войти" route="/sign-in" />
              <Register handleRegister={handleRegister} isLoading={isLoading} />
            </>
          } />
          <Route exact path="/" element={
            <>
              <Header
                title="Выйти"
                email={emailUser}
                onClick={handleSignout}
                route="/sign-in"
              />
              <ProtectedRoute
                isLogged={isLogginIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </>
          } />
          <Route path="*" element={<Navigate to={isLogginIn ? "/" : "/sign-in"} />} />
        </Routes>
        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdatePlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          image={noticeImageTooltipPopup}
          title={noticeTitleTooltipPopup}
          isOpen={infoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;