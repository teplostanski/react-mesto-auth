import {useNavigate} from "react-router-dom";
import React from "react";
import * as auth from "../utils/auth"
import FormAuth from "./FormAuth";

function Login(props) {
  const navigate = useNavigate()

  function handleSubmit(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          props.handleLogin();
          navigate('/');
        } else {
          throw new Error(data.error)
        }

      })
      .catch((data) => {
        props.handleInfoTooltip(false, data.message);
      });
  }

  return (
    <FormAuth name="SignIn" title="Вход" button="Войти" isSignUp={false} onSubmit={handleSubmit}/>
  )
}

export default Login;
