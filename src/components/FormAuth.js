import { useState } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import InfoTooltip from "./InfoTooltip";

function FormAuth(props) {

  const { values, handleChange, errors, isValid } = useFormAndValidation()

  const defaultErrorText = 'Что-то пошло не так! Попробуйте ещё раз.';

  const [ status, setStatus ] = useState({ok: false, text: defaultErrorText});
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSubmit(values)
      .then(res => {
        setStatus({
          ok: true,
          text: props.succesText || 'Успешно!',
        })
        setIsInfoTooltipOpen(true);
      })
      .catch(err => {
        setStatus({
          ok: false,
          text: err.text || defaultErrorText,
        })
        setIsInfoTooltipOpen(true);
      })
  }

  return (
    <>
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
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        setOpenState={setIsInfoTooltipOpen}
        {...status}
      />
    </>
  );
}

export default FormAuth;
