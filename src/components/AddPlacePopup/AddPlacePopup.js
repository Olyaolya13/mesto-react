import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormValidation from '../FormValidation/FormValidation';

function AddPlacePopup({ isPopupOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const nameValidation = FormValidation();
  const linkValidation = FormValidation();

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
        onChange={evt => {
          setName(evt.target.value);
          nameValidation.handleChange(evt);
        }}
        required
      />
      {nameValidation.error && (
        <span className="popup__input-error card-name-error">{nameValidation.error}</span>
      )}
      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input popup__input_type_link"
        id="card-link"
        value={link}
        onChange={evt => {
          setLink(evt.target.value);
          linkValidation.handleChange(evt);
        }}
        required
      />
      {linkValidation.error && (
        <span className="popup__input-error card-link-error">{linkValidation.error}</span>
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
