import {Link} from "react-router-dom";
import React, { useState } from "react";

function FormAuth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(email, password);
  }

  return (
    <div>

      <form className="form form_place_auth center" name={`${props.name}form`} noValidate onSubmit={handleSubmit}>
      <h2 className="form__title center">{props.title}</h2>
        <label className="form__field">
          <input
            id="form__input form__input_place_auth"
            required className="form__input form__input_place_auth"
            type="email"
            name="email"
            placeholder="email"
            minLength="4"
            maxLength="40"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="form__input-error form__input-error_visible"/>
        </label>
        <label className="form__field">
          <input
            id="password-input"
            required className="form__input form__input_place_auth"
            type="password"
            name="password"
            placeholder="password"
            minLength="8"
            maxLength="200"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="form__input-error form__input-error_visible"/>
        </label>
        <div className="space"></div>
        <button className="form__submit form__submit_place_auth" type="submit">{props.button}</button>
        {props.isSignUp && <Link to="/sign-in" className="form__link">Уже зарегистрированы? Войти</Link>}
      </form>
    </div>
  )
}

export default FormAuth;
