class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //проверка на подключение сервера
  _checkResponseServer(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  //универсальный метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._checkResponseServer);
  }

  //Загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }
  //аватар
  editAvatar(user) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar
      })
    });
  }

  //обновление данных пользователя
  editProfile(user) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    });
  }
  //Загрузка карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  //добавление новой карточки
  addNewCard(element) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      'Content-Type': 'application/json',
      body: JSON.stringify({
        name: element.name,
        link: element.link
      })
    });
  }

  //удаление карточки
  removeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  //добавление лайка
  addNewLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  //удаление лайка
  removeLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      'Content-Type': 'application/json'
    });
  }
}

//Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'aee4e6c3-43e3-4bda-884a-a8c8895923c3',
    'Content-Type': 'application/json'
  }
});

export default api;
