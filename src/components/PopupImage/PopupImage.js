function PopupImage() {
  return (
    <div className="popup zoom-popup">
      <div className="popup__zoom-container">
        <img src="#" className="popup__zoom-image" alt="#" />
        <h2 className="popup__zoom-image-text"> </h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-icon popup__close-zoom"
        />
      </div>
    </div>
  );
}

export default PopupImage;
