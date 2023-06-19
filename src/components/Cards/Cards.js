function Cards({ card }) {
  return (
    <article className="card">
      <img src={card.link} alt={`${card.name}`} className="card__image" />
      <div className="card__text">
        <h2 className="card__title">{`${card.name}`}</h2>
        <div className="card__like">
          <button type="button" className="card__heart" />
          <span className="card__heart-count" />
        </div>
      </div>
      <button type="button" className="card__delete" />
    </article>
  );
}

export default Cards;
