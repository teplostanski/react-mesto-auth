import { useFormAndValidation } from "../hooks/useFormAndValidation";

function FormAuth(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  function handleSubmit(event) {
    event.preventDefault();

  }

  return (
    <form className="form form_place_auth center" action="post" name={`form-${props.name}`} onSubmit={handleSubmit} noValidate>
      <h2 className="form__title center">{props.title}</h2>
      <fieldset className="form__fields">
        <label className="form__field">
          <input value={values.email || ''} onChange={handleChange} className={`form__input form__input_place_auth ${!errors.email ? '' : 'form__input_type_error'}`} type="email" name="email" placeholder="Email" required />
          <span className={`form__input-error ${!errors.email ? '' : 'form__input-error_visible'}`}>{errors.email}</span>
        </label>
        <label className="form__field">
          <input value={values.password || ''} onChange={handleChange} className={`form__input form__input_place_auth ${!errors.password ? '' : 'form__input_type_error'}`} type="password" name="password" placeholder="Пароль" required />
          <span className={`form__input-error ${!errors.password ? '' : 'form__input-error_visible'}`}>{errors.password}</span>
        </label>
      </fieldset>
      <div className="space"></div>
      <button className={`form__submit form__submit_place_auth ${!isValid ? 'form__submit_disabled' : ''} button`} type="submit" disabled={!isValid}>{props.buttonText}</button>
      {props.additionalText}
    </form>
  );
}

export default FormAuth;
