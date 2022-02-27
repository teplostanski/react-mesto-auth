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
        console.log(data);
        if (data.error) {
          props.handleInfoTooltip(false, data.error);
        } else if (data.email) {
          props.handleInfoTooltip(true, successMessage);
          navigate("/sign-in")
        } else {
          props.handleInfoTooltip(false, 'Что-то пошло не так');
        }
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
