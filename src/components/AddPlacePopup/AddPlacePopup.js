import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({ isPopupOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const handleSubmit = evt => {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  };

  useEffect(() => {
    if (!isPopupOpen) {
      setName('');
      setLink('');
    }
  }, [isPopupOpen]);

  return (
    <PopupWithForm
      name="card-popup"
      title="Новое место"
      button="Создать"
      isPopupOpen={isPopupOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        name="name"
        className="popup__input popup__input_type_card"
        id="card-name"
        minLength={2}
        maxLength={30}
        value={name}
        onChange={evt => setName(evt.target.value)}
        required
      />
      <span className="popup__input-error card-name-error" />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input popup__input_type_link"
        id="card-link"
        value={link}
        onChange={evt => setLink(evt.target.value)}
        required
      />
      <span className="popup__input-error card-link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
