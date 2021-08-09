class Api {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.headers = options.headers;
  }

  register(name, password, email) {
    return fetch(this.baseURL + "/signup", {
      method: "POST",
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
    return fetch(this.baseURL + "/signin", {
      method: "POST",
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
    return fetch(this.baseURL + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: jwt,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  getSavedMovies() {
    return fetch(this.baseURL + "/movies", {
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
      });
  }

  saveMovie(movie) {
    return fetch(this.baseURL + "/movies", {
      method: "POST",
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
    }).then((data) => {
      if (data.ok) {
        return data.json();
      }
      return Promise.reject(`Ошибка: ${data.status}`);
    });
  }

  deleteMovie(movieId) {
    return fetch(this.baseURL + "/movies/" + movieId, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(this.baseURL + "/users/me", {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserInfo(email, name) {
    return fetch(this.baseURL + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then((res) => {
      if (res.ok) {
        return res;
      }

      return Promise.reject({ message: `Ошибка: ${res.status}` });
    });
  }

  setHeaders(jwt) {
    this.headers.authorization = jwt;
  }
}

const options = {
  baseURL: "https://apimovies.hosfatantabolis.ru",
  headers: {
    "Content-Type": "application/json",
  },
};

const api = new Api(options);
export default api;
