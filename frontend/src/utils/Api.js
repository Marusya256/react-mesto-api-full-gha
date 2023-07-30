class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(result) {
    if (result.ok)
        return result.json();
    else
        return Promise.reject(`Ошибка ${result.status}`);
  }

  _makeRequest(endpoint, options) {
      return fetch(this._options.baseUrl + endpoint, options).then(this._checkResponse);
  }

  getInfoOwner() {
    return this._makeRequest('/users/me', {
      credentials: 'include',
      headers: this._options.headers
    });
  }

  getInitialCards() {
    return this._makeRequest('/cards/', {
      credentials: 'include',
      headers: this._options.headers
    });
  }

  setInfoUser(name, about) {
    return this._makeRequest('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  postCards(item) {
    return this._makeRequest('/cards/', {
      method: 'POST',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    });
  }

  deleteCard(cardId) {
    return this._makeRequest('/cards/' + cardId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._options.headers
    });
  }

  updateAvatar(link) {
    return this._makeRequest('/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  }

  updateLike(cardId, isLiked) {
    return this._makeRequest('/cards/' + cardId + '/likes', {
        method: isLiked ? 'DELETE' : 'PUT',
        credentials: 'include',
        headers: this._options.headers
    });
  }

  logOut() {
    return this._makeRequest('/users/me/logout', {
      method: 'POST',
      credentials: 'include',
      headers: this._options.headers,
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.galamm.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;