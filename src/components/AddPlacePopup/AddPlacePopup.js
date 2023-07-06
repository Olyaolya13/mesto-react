import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import FormValidation from '../FormValidation/FormValidation';

function AddPlacePopup({ isPopupOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const { error, isValid, input, handleChange } = FormValidation();

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
      isValid={isValid}
    >
      <input
        type="text"
        placeholder="Название"
        name="name"
        className={`popup__input popup__input_type_card ${
          input.name === undefined || input.name ? '' : 'popup__input-error_type_'
        }`}
        id="card-name"
        minLength={2}
        maxLength={30}
        value={name || ''}
        onChange={evt => {
          handleChange(evt);
          setName(evt.target.value);
        }}
        required
      />

      <span className="popup__input-error card-name-error">{error.name}</span>

      <input
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className={`popup__input popup__input_type_link ${
          input.link === undefined || input.link ? '' : 'popup__input-error_type_'
        }`}
        id="card-link"
        value={link || ''}
        onChange={evt => {
          handleChange(evt);
          setLink(evt.target.value);
        }}
        required
      />

      <span className="popup__input-error card-link-error">{error.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
