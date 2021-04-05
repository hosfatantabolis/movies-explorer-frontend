class Auth {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.headers = options.headers;
  }
  register(name, password, email) {
    return fetch(this.baseURL + '/signup', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, password, email }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res);
      return Promise.reject(res);
    });
  }

  login(password, email) {
    return fetch(this.baseURL + '/signin', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  tokenCheck(jwt) {
    return fetch(this.baseURL + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: jwt,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }
}

class Api {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.headers = options.headers;
  }

  // getInitialCards() {
  //   return fetch(this.baseURL + '/cards', {
  //     headers: this.headers,
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }

  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // addCard(name, link) {
  //   return fetch(this.baseURL + '/cards/', {
  //     method: 'POST',
  //     headers: this.headers,
  //     body: JSON.stringify({
  //       name: name,
  //       link: link,
  //     }),
  //   })
  //     .then((data) => {
  //       return data.json();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // deleteCard(cardId) {
  //   return fetch(this.baseURL + '/cards/' + cardId, {
  //     method: 'DELETE',
  //     headers: this.headers,
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }

  // likeCard(cardId) {
  //   return fetch(this.baseURL + '/cards/' + cardId + '/likes/', {
  //     method: 'PUT',
  //     headers: this.headers,
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // removeCardLike(cardId) {
  //   return fetch(this.baseURL + '/cards/' + cardId + '/likes/', {
  //     method: 'DELETE',
  //     headers: this.headers,
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }

  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // changeLikeCardStatus(cardId, isLiked) {
  //   if (isLiked === true) {
  //     return this.removeCardLike(cardId);
  //   } else {
  //     return this.likeCard(cardId);
  //   }
  // }

  getUserInfo() {
    return fetch(this.baseURL + '/users/me', {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(email, name) {
    console.log(email);
    console.log(name);
    return fetch(this.baseURL + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setHeaders(jwt) {
    this.headers.authorization = jwt;
  }
}

const options = {
  baseURL: 'https://api.movie-or-film.students.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  },
};
const auth = new Auth(options);
const api = new Api(options);
module.exports = { auth, api };
