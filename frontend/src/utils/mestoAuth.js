export const BASE_URL = 'http://api.mesto.galamm.nomoreparties.sbs';
// export const BASE_URL = 'https://localhost:3001';

class MestoAuth {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(result) {
    if (result.ok)
        return result.json();
    else
        return Promise.reject(`Ошибка ${result.status}`);
  }

  register (email, password) {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then(this._checkResponse);
  };

  authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse);
  };

  getContent(token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET', 
      headers: {
        "Content-Type": "application/json",
        // "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }
}

const mestoAuth = new MestoAuth();

export default mestoAuth;