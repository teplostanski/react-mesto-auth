import Popup from "./Popup";

function InfoTooltip(props) {
  return (
    <Popup {...props}>
      <figure className="info-tooltip">
        <div className={`info-tooltip__icon ${props.ok? 'info-tooltip__icon_type_success': 'info-tooltip__icon_type_error'}`}></div>
        <figcaption className="info-tooltip__text">{props.text}</figcaption>
      </figure>
    </Popup>
  );
}

export default InfoTooltip;
