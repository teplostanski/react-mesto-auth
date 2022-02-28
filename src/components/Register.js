import {useNavigate} from "react-router-dom";
import React from "react";
import * as auth from "../utils/auth"
import FormAuth from "./FormAuth";

function Register(props) {
  const navigate = useNavigate()
  const successMessage = "Вы успешно зарегистрировались!"

  function handleSubmit(email, password) {
    auth.register(email, password)
      .then(data => {
        if (data.email) {
          props.handleInfoTooltip(true, successMessage);
          navigate("/sign-in")
        } else if (data.error) {
          throw new Error(data.error)
        } else {
          throw new Error('Что-то пошло не так');
        }
      })
      .catch((data) => {
        props.handleInfoTooltip(false, data.message);
      });
  }
  return (
    <FormAuth
      name="SignUp"
      title="Регистрация"
      button="Зарегистрироваться"
      isSignUp={true}
      onSubmit={handleSubmit}
    />
  )
}

export default Register;
