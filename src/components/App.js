import Header from './Header/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="content">
          <div className="content__profile">
            <div className="content__avatar">
              <img src="#" alt="" className="content__photo" />
              <div className="content__avatar-overlay" />
            </div>
            <div className="content__edit">
              <div className="content__name">
                <h1 className="content__title">Hello</h1>
                {/*Кнопка редактирование попапа*/}
                <button type="button" aria-label="Редактировать" className="content__button-edit" />
              </div>
              <p className="content__subtitle">World</p>
            </div>
          </div>
          <button type="button" aria-label="Добавить" className="content__button-add" />
        </section>
        <section className="cards" />
      </main>
      <footer className="footer">
        <p className="footer__text">© 2022 Mesto Russia</p>
      </footer>
      {/*Скрытый контент размещаем после footer*/}
      <div className="popup profile-popup">
        {/*Фон попапа*/}
        <div className="popup__container">
          {/*Сам попап и form - то, что мы отправляем после заполнения*/}
          <h2 className="popup__title">Редактировать профиль</h2>
          {/* Method post - так, как вносим изменения в ресурс*/}
          <form
            name="userNameAndOccupation"
            method="post"
            className="popup__form popup__form-profile"
            noValidate=""
          >
            <input
              type="text"
              placeholder="ФИО"
              name="name"
              className="popup__input popup__input_type_name"
              id="user-name"
              minLength={2}
              maxLength={40}
              required=""
            />
            <span className="popup__input-error user-name-error" />
            <input
              type="text"
              placeholder="Должность"
              name="about"
              className="popup__input popup__input_type_occupation"
              id="user-occupation"
              minLength={2}
              maxLength={200}
              required=""
            />
            <span className="popup__input-error user-occupation-error" />
            <button type="submit" aria-label="Сохранить" className="popup__button">
              Сохранить
            </button>
          </form>
          <button type="button" aria-label="Закрыть" className="popup__close-icon" />
        </div>
      </div>
      <div className="popup card-popup">
        {/*Фон попапа*/}
        <div className="popup__container">
          {/*Сам попап и form - то, что мы отправляем после заполнения*/}
          <h2 className="popup__title popup__title-card">Новое место</h2>
          {/* Method post - так, как вносим изменения в ресурс*/}
          <form
            name="cardNewImages"
            method="post"
            className="popup__form popup__form-card"
            noValidate=""
          >
            <input
              type="text"
              placeholder="Название"
              name="name"
              className="popup__input popup__input_type_card"
              id="card-name"
              minLength={2}
              maxLength={30}
              required=""
            />
            <span className="popup__input-error card-name-error" />
            <input
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              className="popup__input popup__input_type_link"
              id="card-link"
              required=""
            />
            <span className="popup__input-error card-link-error" />
            <button type="submit" aria-label="Создать" className="popup__button">
              Создать
            </button>
          </form>
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close-icon popup__close-card"
          />
        </div>
      </div>
      {/*Увелечение картинки*/}
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
      {/*обновление аватара*/}
      <div className="popup avatar-popup">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <form name="editAvatar" className="popup__form popup__form-avatar" noValidate="">
            <input
              type="url"
              placeholder="Ссылка на аватар"
              name="avatar"
              className="popup__input popup__input_type_avatar"
              id="user-avatar"
              required=""
            />
            <span className="popup__input-error user-avatar-error" />
            <button type="submit" aria-label="Сохранить" className="popup__button">
              Сохранить
            </button>
          </form>
          <button type="button" aria-label="Закрыть" className="popup__close-icon" />
        </div>
      </div>
      <div className="popup question-popup">
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>
          <form
            className="popup__form popup__form-question"
            name="questionPopupDelete"
            noValidate=""
          >
            <button type="submit" aria-label="Да" className="popup__button popup__button-yes">
              Да
            </button>
          </form>
          <button type="button" aria-label="Закрыть" className="popup__close-icon" />
        </div>
      </div>
    </>
  );
}

export default App;
