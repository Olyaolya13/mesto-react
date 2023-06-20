function PopupImage({ card, onClose, isPopupOpen }) {
  return (
    <div className={`popup zoom-popup ${isPopupOpen ? 'popup_opened' : ''}`}>
      <div className="popup__zoom-container">
        <img src={`${card.link}`} alt={`${card.name}`} className="popup__zoom-image" />
        <h2 className="popup__zoom-image-text">{`${card.name}`}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-icon popup__close-zoom"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupImage;
