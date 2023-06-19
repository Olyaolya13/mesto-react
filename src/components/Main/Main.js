import { useEffect, useState } from 'react';
import api from '../../utils/api';
import Cards from '../Cards/Cards';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        const { name, about, avatar, _id } = userInfo;
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        // initialCards.forEach(data => (data.myid = userInfo._id));
        const updatedCards = initialCards.map(card => ({
          ...card,
          id: _id
        }));
        setCards(updatedCards);
      })
      .catch(error => {
        console.log('Ошибка при получении информации:', error);
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
      <section className="cards">
        {cards.map(card => (
          <Cards key={card._id} card={card} />
        ))}
      </section>
    </main>
  );
}

export default Main;
