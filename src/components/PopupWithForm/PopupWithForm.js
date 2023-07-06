import { useEffect, useState } from 'react';

function PopupWithForm({
  name,
  title,
  button,
  children,
  isPopupOpen,
  onClose,
  onSubmit,
  isValid = true
}) {
  const [isSaving, setIsSaving] = useState(false);

  const handleFormSubmit = evt => {
    evt.preventDefault();
    setIsSaving(true);
    onSubmit(evt);
  };

  useEffect(() => {
    if (!isPopupOpen) {
      setIsSaving(false);
    }
  }, [isPopupOpen]);

  return (
    <div
      className={`popup popup_type_${name} ${isPopupOpen ? 'popup_opened' : ''}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" noValidate="" onSubmit={handleFormSubmit}>
          {children}
          <button
            type="submit"
            aria-label="Сохранить"
            className={`popup__button ${!isValid || isSaving ? 'popup__button_disabled' : ''}`}
            disabled={!isValid || isSaving}
          >
            {isSaving ? 'Сохранение...' : button}
          </button>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-icon"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
