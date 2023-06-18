function PopupWithForm({ name, title, button }) {
  return (
    <div className={`popup popup_type_${name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name="userNameAndOccupation"
          method="post"
          className="popup__form popup__form-profile"
          noValidate=""
        >
          <button type="submit" aria-label="Сохранить" className="popup__button">
            {button}
          </button>
        </form>
        <button type="button" aria-label="Закрыть" className="popup__close-icon" />
      </div>
    </div>
  );
}

export default PopupWithForm;
