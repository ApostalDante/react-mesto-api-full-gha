import React from "react";


function Login({ handleLogin, isLoading }) {
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
    handleLogin(email, password);
  };

  return (
    <div className="login">
      <form method="get" className="login__form" name="login" onSubmit={handleSubmit}>
        <fieldset className="login__form-container">
          <h2 className="login__title">Вход</h2>
          <label htmlFor="email-login">
            <input
              className="login__input"
              name="login-email"
              type="email"
              placeholder="Email"
              id="email-login"
              required
              value={email || ''}
              onChange={handleEmail}
              minLength="2"
              maxLength="40" />
            <span className="login__input-error"></span>
          </label>
          <label htmlFor="password-login">
            <input
              className="login__input"
              name="login-password"
              type="password"
              placeholder="Пароль"
              id="password-login"
              required
              value={password || ''}
              onChange={handlePassword}
              minLength="2"
              maxLength="20" />
            <span className="login__input-error"></span>
          </label>
          <button type="submit" aria-label="save" className="login__form-save">{isLoading ? 'Вход...' : 'Войти'}</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;