const BASE_URL = 'https://auth.nomoreparties.co';
const noAuthHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: noAuthHeaders,
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(response => response.json())
    .then(body => {
      if (body.error) {
        return {error: body.error};
      }
      if (body.message) {
        return {error: body.message};
      }
      return {email: body.data.email};
    })
    .catch(() => {
      return {error: "Что-то пошло не так!"}
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: noAuthHeaders,
    body: JSON.stringify({email, password})
  })
    .then((response => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        return {error: "Вы ввели некорректный email или пароль"};
      }
      if (response.status === 400) {
        return {error: "Проверьте, что заполнили поля 'email' или 'пароль'"};
      }
    }))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
      if (data.error) {
        return data;
      } else {
        throw new Error('Missing jwt token in response');
      }
    })
    .catch((err) => {
      return err.message;
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    })
    .catch((err) => console.log(err));
}
