function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  return (
    <main>
      <section className="content">
        <div className="content__profile">
          <div className="content__avatar">
            <img src="#" alt="" className="content__photo" />
            <div className="content__avatar-overlay" onClick={onEditAvatar} />
          </div>
          <div className="content__edit">
            <div className="content__name">
              <h1 className="content__title">Hello</h1>
              <button
                type="button"
                aria-label="Редактировать"
                className="content__button-edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="content__subtitle">World</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="content__button-add"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards" />
    </main>
  );
}

export default Main;
