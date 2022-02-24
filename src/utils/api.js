class Api {
  constructor(options) {
    this._options = options;
  }

  _fetch(personalMethod, options) {
    return fetch(this._options.baseUrl + personalMethod, {
      headers: this._options.headers,
      ...options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._fetch("/users/me");
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  updateUserInfo(data) {
    return this._fetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  addNewCard(data) {
    return this._fetch("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  changeCardLikeStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.setLike(cardId);
  }

  setLike(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "PUT",
    });
  }

  deleteLike(cardId) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: "DELETE",
    });
  }

  changeAvatar(data) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}

export default new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '824c1506-61a7-48e4-8b2f-cd5fe1a7a429',
    'Content-Type': 'application/json'
  }
});