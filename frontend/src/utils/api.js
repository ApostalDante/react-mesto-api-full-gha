class Api {
  constructor(apihUrl) {
    this._link = apihUrl;
  };

  _checkResponseProcessingServer(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  };

  getCardsServer() {
    return fetch(`${this._link}cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  addNewCardToServer({ name, link }) {
    return fetch(`${this._link}cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  deleteCardInServer(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  getProfileDataInServer() {
    return fetch(`${this._link}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  sendProfileDataToServer(profileData) {
    return fetch(`${this._link}users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: profileData.name, about: profileData.description })
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  sendAvatarDataToServer(avatarData) {
    return fetch(`${this._link}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ avatar: avatarData.avatar })
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  sendLikeCardToServer(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  deleteLikeCardToServer(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };
};


const api = new Api('https://levkin.mesto.backend.nomoredomainsicu.ru/');

export default api;