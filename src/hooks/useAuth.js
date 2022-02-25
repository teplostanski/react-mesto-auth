import { useState } from 'react';
import { useNavigate } from 'react-router';

export function useAuth() {

  const emptyAuthInfo = {
    loggedIn: false,
  }

  const navigate = useNavigate();

  const [authInfo, setAuthInfo] = useState(emptyAuthInfo);
  const baseUrl = 'https://auth.nomoreparties.co';

  const sendQuery = (url, queryParams) => {

    if (!queryParams.headers) {
      queryParams.headers = {}
    }

    queryParams.headers['Content-Type'] = 'application/json';

    return fetch(`${baseUrl}/${url}`, queryParams)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json()
          .then(errorObject => Promise.reject({text: errorObject.error? errorObject.error: errorObject.message}))
      })

  }

  const signup = (userInfo) => {
    const queryParams = {
      method: 'POST',
      body: JSON.stringify(userInfo),
    }
    return sendQuery('signup', queryParams)
  }

  const signin = (userInfo) => {
    const queryParams = {
      method: 'POST',
      body: JSON.stringify(userInfo),
    }
    return sendQuery('signin', queryParams)
  }

  const getUserInfo = (token) => {
    const queryParams = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }
    return sendQuery('users/me', queryParams)
  }

  const handleSignup = (userInfo) => {
    return signup(userInfo)
      .then(res => {
        handleSignin(userInfo);
      })
  }

  const handleSignin = (userInfo) => {
    return signin(userInfo)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          handleGetUserInfo(res.token);
        }
      })
  }

  const handleGetUserInfo = (token) => {
    return getUserInfo(token)
      .then(res => {
        setAuthInfo({
          ...authInfo,
          loggedIn: true,
          email: res.data.email,
        });
        navigate('/')
      })
  }

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      handleGetUserInfo(token)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthInfo(emptyAuthInfo);
  }

  return { authInfo, setAuthInfo, handleSignup, handleSignin, checkToken, handleLogout };
}
