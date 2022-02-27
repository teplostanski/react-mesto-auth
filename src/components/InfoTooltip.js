import SuccessPath from '../images/success.svg';
import ErrorPath from '../images/error.svg';

function InfoTooltip(props) {
  const popupClassName = props.isOpen ? "popup popup_opened" : "popup";
  const imagePath = props.isStatusSucces ? SuccessPath : ErrorPath
  return (
    <div className={popupClassName} id="InfoTooltip" onClick={props.closeByOverlay}>
      <button className="popup__close button" type="button" onClick={props.onClose}>
      </button>
      <div className="popup__container">
        <div className="info-tooltip">
          <img className="info-tooltip__icon" src={imagePath} alt={"Лого ответа"}/>
          <span className="info-tooltip__text">{props.message}</span>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
