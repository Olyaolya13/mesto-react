import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  //popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isZoomPopup, setIsZoomPopup] = useState(false);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  //context
  const [currentUser, setCurrentUser] = useState([]);
  //cards
  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsZoomPopup(true);
  }

  function handleQuestionPopupOpen() {
    setIsQuestionPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsZoomPopup(false);
    setIsQuestionPopupOpen(false);
  }

  function handleWindowCloseClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleEscKey(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isZoomPopup ||
      isQuestionPopupOpen
    ) {
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.removeEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isZoomPopup,
    isQuestionPopupOpen
  ]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch(error => {
        console.log('Ошибка при получении информации:', error);
      });
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onTrashClick={handleQuestionPopupOpen}
          cards={cards}
        />

        <Footer />

        <PopupWithForm
          name="profile-popup"
          title="Редактировать профиль"
          button="Сохранить"
          isPopupOpen={isEditProfilePopupOpen}
          onClose={handleWindowCloseClick}
        >
          <input
            type="text"
            placeholder="ФИО"
            name="name"
            className="popup__input popup__input_type_name"
            id="user-name"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="popup__input-error user-name-error" />
          <input
            type="text"
            placeholder="Должность"
            name="about"
            className="popup__input popup__input_type_occupation"
            id="user-occupation"
            minLength={2}
            maxLength={200}
            required
          />
          <span className="popup__input-error user-occupation-error" />
        </PopupWithForm>

        <PopupWithForm
          name="card-popup"
          title="Новое место"
          button="Создать"
          isPopupOpen={isAddPlacePopupOpen}
          onClose={handleWindowCloseClick}
        >
          <input
            type="text"
            placeholder="Название"
            name="name"
            className="popup__input popup__input_type_card"
            id="card-name"
            minLength={2}
            maxLength={30}
            required
          />
          <span className="popup__input-error card-name-error" />
          <input
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            className="popup__input popup__input_type_link"
            id="card-link"
            required
          />
          <span className="popup__input-error card-link-error" />
        </PopupWithForm>

        <PopupWithForm
          name="avatar-popup"
          title="Обновить аватар"
          button="Сохранить"
          isPopupOpen={isEditAvatarPopupOpen}
          onClose={handleWindowCloseClick}
        >
          <input
            type="url"
            placeholder="Ссылка на аватар"
            name="avatar"
            className="popup__input popup__input_type_avatar"
            id="user-avatar"
            required
          />
          <span className="popup__input-error user-avatar-error" />
        </PopupWithForm>

        <PopupWithForm
          name="question-popup"
          title="Вы уверены"
          button="Да"
          onClose={handleWindowCloseClick}
          isPopupOpen={isQuestionPopupOpen}
        />

        <ImagePopup
          card={selectedCard}
          isPopupOpen={isZoomPopup}
          onClose={handleWindowCloseClick}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
