import { useContext } from 'react';
import Card from '../Card/Card';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onTrashClick, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="content">
        <div className="content__profile">
          <div className="content__avatar">
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              alt=""
              className="content__photo"
            />
            <div className="content__avatar-overlay" onClick={onEditAvatar} />
          </div>
          <div className="content__edit">
            <div className="content__name">
              <h1 className="content__title">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Редактировать"
                className="content__button-edit"
                onClick={onEditProfile}
              />
            </div>
            <p className="content__subtitle">{currentUser.about}</p>
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
          <Card key={card._id} card={card} onCardClick={onCardClick} onTrashClick={onTrashClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
