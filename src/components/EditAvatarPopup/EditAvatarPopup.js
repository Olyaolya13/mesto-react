import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useEffect, useRef } from 'react';

function EditAvatarPopup({ isPopupOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = evt => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  };
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isPopupOpen]);

  return (
    <PopupWithForm
      name="avatar-popup"
      title="Обновить аватар"
      button="Сохранить"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        className="popup__input popup__input_type_avatar"
        id="user-avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error user-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
