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

  getSavedMovies() {
    return fetch(this.baseURL + '/movies', {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject({ message: `Ошибка: ${res.status}` });
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  saveMovie(movie) {
    return fetch(this.baseURL + '/movies', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: parseInt(movie.year),
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: parseInt(movie.id),
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      }),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(`Ошибка: ${data.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteMovie(movieId) {
    return fetch(this.baseURL + '/movies/' + movieId, {
      method: 'DELETE',
      headers: this.headers,
    }).catch((err) => {
      console.log(err);
    });
  }

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

        return Promise.reject({ message: `Ошибка: ${res.status}` });
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
