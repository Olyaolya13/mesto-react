function Card({ card, onCardClick, onTrashClick }) {
  return (
    <article className="card">
      <div
        style={{ backgroundImage: `url(${card.link})` }}
        alt={`${card.name}`}
        className="card__image"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="card__text">
        <h2 className="card__title">{`${card.name}`}</h2>
        <div className="card__like">
          <button type="button" className="card__heart" />
          <span className="card__heart-count" />
        </div>
      </div>
      <button type="button" className="card__delete" onClick={onTrashClick} />
    </article>
  );
}

export default Card;
