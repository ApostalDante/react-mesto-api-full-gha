class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
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
      headers: this._headers,
      method: 'GET',
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  addNewCardToServer({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })

      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  deleteCardInServer(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  getProfileDataInServer() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'GET',
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  sendProfileDataToServer(profileData) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.name, about: profileData.description })
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  sendAvatarDataToServer(avatarData) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarData.avatar })
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  sendLikeCardToServer(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };

  deleteLikeCardToServer(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._checkResponseProcessingServer(res); })
  };
};


const apiData = {
  link: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: '3b08e0b6-8adb-49dc-9f21-be9371b35bfc',
    'Content-Type': 'application/json'
  }
};

const api = new Api(apiData);

export default api;