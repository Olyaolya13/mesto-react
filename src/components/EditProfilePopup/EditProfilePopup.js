import { useState, useEffect, useContext } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function EditProfilePopup({ isPopupOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);
  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      button="Сохранить"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="ФИО"
        name="name"
        className="popup__input popup__input_type_name"
        id="user-name"
        minLength={2}
        maxLength={40}
        value={name}
        onChange={evt => setName(evt.target.value)}
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
        value={description}
        onChange={evt => setDescription(evt.target.value)}
        required
      />
      <span className="popup__input-error user-occupation-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
