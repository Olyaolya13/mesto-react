import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useEffect, useRef } from 'react';
import FormValidation from '../../hooks/useFormValidation/useFormValidation';

function EditAvatarPopup({ isPopupOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const { error, isValid, input, handleChange } = FormValidation();

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };

  useEffect(() => {
    if (!isPopupOpen) {
      avatarRef.current.value = '';
    }
  }, [isPopupOpen]);

  return (
    <PopupWithForm
      name="avatar-popup"
      title="Обновить аватар"
      button="Сохранить"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        className={`popup__input popup__input_type_avatar ${
          input.avatar === undefined || input.avatar ? '' : 'popup__input-error_type_'
        }`}
        id="user-avatar"
        ref={avatarRef}
        onChange={evt => handleChange(evt)}
        required
      />

      <span className="popup__input-error user-avatar-error">{error.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
