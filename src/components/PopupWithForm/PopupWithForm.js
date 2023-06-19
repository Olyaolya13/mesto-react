function PopupWithForm({ name, title, button, children, isPopupOpen, onClose }) {
  function handleCloseAllPopups() {
    onClose();
  }

  return (
    <div className={`popup popup_type_${name} ${isPopupOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" noValidate="">
          {children}
          <button type="submit" aria-label="Сохранить" className="popup__button">
            {button}
          </button>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-icon"
          onClick={handleCloseAllPopups}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
