import { useState, useEffect, useContext } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import FormValidation from '../../hooks/useFormValidation/useFormValidation';

function EditProfilePopup({ isPopupOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  const { error, isValid, input, handleChange } = FormValidation();

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  };

  useEffect(() => {
    if (!isPopupOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isPopupOpen, currentUser]);

  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      button="Сохранить"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        placeholder="ФИО"
        name="name"
        className={`popup__input popup__input_type_name ${
          input.name === undefined || input.name ? '' : 'popup__input-error_type_'
        }`}
        id="user-name"
        minLength={2}
        maxLength={40}
        value={name || ''}
        onChange={evt => {
          handleChange(evt);
          setName(evt.target.value);
        }}
        required
      />

      <span className="popup__input-error user-name-error">{error.name}</span>

      <input
        type="text"
        placeholder="Должность"
        name="about"
        className={`popup__input popup__input_type_occupation ${
          input.about === undefined || input.about ? '' : 'popup__input-error_type_'
        }`}
        id="user-occupation"
        minLength={2}
        maxLength={200}
        value={description || ''}
        onChange={evt => {
          handleChange(evt);
          setDescription(evt.target.value);
        }}
        required
      />
      <span className="popup__input-error user-occupation-error">{error.about}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
