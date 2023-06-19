import { useEffect, useState } from 'react';
import api from '../../utils/api';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  //const [card,setCard] = useState('')

  useEffect(() => {
    // Выполните запрос в API для получения информации о пользователе
    api
      .getUserInfo()
      .then(response => {
        const { name, about, avatar } = response;
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch(error => {
        console.log('Ошибка при получении информации о пользователе:', error);
      });
  }, []);

  return (
    <main>
      <section className="content">
        <div className="content__profile">
          <div className="content__avatar">
            <div
              style={{ backgroundImage: `url(${userAvatar})` }}
              alt=""
              className="content__photo"
            />
            <div className="content__avatar-overlay" onClick={onEditAvatar} />
          </div>
          <div className="content__edit">
            <div className="content__name">
              <h1 className="content__title">{userName}</h1>
              <button
                type="button"
                aria-label="Редактировать"
                className="content__button-edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="content__subtitle">{userDescription}</p>
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
