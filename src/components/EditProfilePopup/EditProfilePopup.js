import { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup({ isPopupOpen, onClose }) {
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);

  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      button="Сохранить"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
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
        onChange={event => setName(event.target.value)}
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
        onChange={event => setDescription(event.target.value)}
        required
      />
      <span className="popup__input-error user-occupation-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
