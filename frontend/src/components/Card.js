import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_type_active'}`
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  };

  function handleClick() {
    props.onCardClick(props.card);
  };

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  };

  return (
    <article className="element">
      {isOwn && <button type="button" aria-label="trash" className="element__trash" onClick={handleDeleteClick} />}
      <img className="element__img" src={props.link}
        alt={props.name} onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__text">{props.name}</h2>
        <div className="element__row">
          <button type="button" aria-label="like" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="element__like-count">{props.likes}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;