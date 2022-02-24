import FormAuth from "./FormAuth";

function Login(props) {

  return (
    <FormAuth
      {...props}
      name="login"
      title="Вход"
      buttonText="Вход"
      additionalText={<p className="form__additional-text center"></p>}
    />
  );
}

export default Login;