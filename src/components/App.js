import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';

function App() {
  //popup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isZoomPopup, setIsZoomPopup] = useState(false);
  const [isQuestionPopupOpen, setIsQuestionPopupOpen] = useState(false);
  //context
  const [currentUser, setCurrentUser] = useState({});
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
      .catch(err => {
        console.log(err);
      });
  }

  // Update user avatar
  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }
  //add card
  function handleAddPlace(newCard) {
    api
      .addNewCard(newCard)
      .then(card => {
        setCards(state => [card, ...state]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
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
          .catch(err => {
            console.log(err);
          });
      } else {
        api
          .removeLike(card._id)
          .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  //delete card
  function handleCardDelete() {
    handleQuestionPopupOpen();
  }

  function handleConfirmDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
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
      .catch(err => {
        console.log('Ошибка при получении информации:', err);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleConfirmDelete}
          onQuestuon={handleCardDelete}
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

        <AddPlacePopup
          isPopupOpen={isAddPlacePopupOpen}
          onClose={handleWindowCloseClick}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm
          name="question-popup"
          title="Вы уверены"
          button="Да"
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
