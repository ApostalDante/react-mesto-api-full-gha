import React from "react";
import headerLogo from "../images/logo__header.svg";
import { Link } from "react-router-dom";


function Header({ email, route, onClick, title }) {
  return (
    <header className="header">
      <img className="header__logo" alt='Место' src={headerLogo} />
      <nav className="header__links">
        <p className="header__title">{email}</p>
        <Link to={route} className="header__link" type="button" onClick={onClick}>{title}</Link>
      </nav>
    </header>
  );
};

export default Header;