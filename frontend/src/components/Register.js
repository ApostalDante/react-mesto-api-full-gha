import React from "react";
import { Link } from 'react-router-dom';


function Register({ handleRegister, isLoading }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(evt) {
    setEmail(evt.target.value);
  };

  function handlePassword(evt) {
    setPassword(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="login">
      <form method="get" className="login__form" name="registration" onSubmit={handleSubmit}>
        <fieldset className="login__form-container">
          <h2 className="login__title">Регистрация</h2>
          <label htmlFor="email-input">
            <input
              className="login__input"
              name="registration-email"
              type="email"
              placeholder="Email"
              id="email-input"
              required
              value={email || ''}
              onChange={handleEmail}
              minLength="2"
              maxLength="40" />
            <span className="login__input-error"></span>
          </label>
          <label htmlFor="password-input">
            <input
              className="login__input"
              name="registration-password"
              type="password"
              placeholder="Пароль"
              id="password-input"
              required
              value={password || ''}
              onChange={handlePassword}
              minLength="2"
              maxLength="20" />
            <span className="login__input-error"></span>
          </label>
          <button type="submit" aria-label="save" className="login__form-save">{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}</button>
        </fieldset>
      </form>
      <p className="login__question">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link> </p>
    </div>
  );
};

export default Register;