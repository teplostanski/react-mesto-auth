import { Link } from "react-router-dom";
import FormAuth from "./FormAuth";

function Register(props) {

  return (
    <FormAuth
      {...props}
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      succesText="Вы успешно зарегистрировались!"
      additionalText={<p className="form__additional-text center">Уже зарегистрированы? <Link className="form__link button" to="/sign-in">Войти</Link></p>}
    />
  );
}

export default Register;
