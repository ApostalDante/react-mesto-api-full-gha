import React from 'react';
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={currentUser.avatar} alt="аватар" />
          <button type="button" aria-label="change" className="profile__change-avatar-btm" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button type="button" aria-label="open" className="profile__edit-btm" onClick={onEditProfile}>
          </button>
          <p className="profile__user-myself">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="open" className="profile__add-btm" onClick={onAddPlace}>
        </button>
      </section>
      <section className="cards">
        <section className="elements">
          {cards.map((card) => (
            < Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Main;