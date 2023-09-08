class Auth {
  constructor(authUrl) {
    this._authUrl = authUrl;
  };

  _checkResponseProcessingServer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  };

  checkToken(jwt) {
    return fetch(`${this._authUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(this._checkResponseProcessingServer)
  };

  setUserAuthorization(email, password) {
    return fetch(`${this._authUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkResponseProcessingServer)
      .then((user) => {
        if (user.token) localStorage.setItem('token', user.token)
      })
  };

  setUserRegistration(email, password) {
    return fetch(`${this._authUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
      .then(this._checkResponseProcessingServer)
  }
};

const auth = new Auth('https://levkin.mesto.backend.nomoredomainsicu.ru');


export default auth;