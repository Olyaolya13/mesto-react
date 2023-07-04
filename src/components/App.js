import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import { useState, useEffect, useCallback } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';

import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';

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
  // Open Edit Profile Popup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Open Edit Avatar Popup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Open Add Place Popup
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Open Zoom Popup with selected card
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsZoomPopup(true);
  }
  // Open Question Popup
  function handleQuestionPopupOpen() {
    setIsQuestionPopupOpen(true);
  }
  // Close all popups
  const closeAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsZoomPopup(false);
    setIsQuestionPopupOpen(false);
  }, []);
  // Close popups when clicking outside the popup
  const handleWindowCloseClick = useCallback(
    evt => {
      if (evt.target === evt.currentTarget) {
        closeAllPopups();
      }
    },
    [closeAllPopups]
  );
  // Close popups when pressing the Escape key
  function handleEscKey(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  // Update user information
  function handleUpdateUser(userInfo) {
    api
      .editProfile(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => {
        console.log('Ошибка при обновлении информации пользователя:', error);
      });
  }

  // Update user avatar
  function handleUpdateAvatar(user) {
    api
      .editAvatar(user)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(error => {
        console.log('Ошибка при обновлении аватара:', error);
      });
  }

  // Handle like on a card
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    {
      if (!isLiked) {
        api
          .addNewLike(card._id)
          .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
          })
          .catch(error => {
            console.log('Ошибка при добавлении лайка:', error);
          });
      } else {
        api
          .removeLike(card._id)
          .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
          })
          .catch(error => {
            console.log('Ошибка при удалении лайка:', error);
          });
      }
    }
  }

  //delete card
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(error => {
        console.log('Ошибка при удалении карточки:', error);
      });
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
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditProfilePopup
          isPopupOpen={isEditProfilePopupOpen}
          onClose={handleWindowCloseClick}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isPopupOpen={isEditAvatarPopupOpen}
          onClose={handleWindowCloseClick}
          onUpdateAvatar={handleUpdateAvatar}
        />

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
          name="question-popup"
          title="Вы уверены"
          button="Да"
          isPopupOpen={isQuestionPopupOpen}
          onClose={handleWindowCloseClick}
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
