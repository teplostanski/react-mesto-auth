import logoPath from '../images/logo.svg';
import React from "react";
import {Link, useNavigate} from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    props.handleLogout();
    navigate('/sign-in');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Лого"/>
      <div className="header__auth">
        {props.isLoggedIn
          ?
          <>
            <div className="header__info">{props.currentUserEmail}</div>
            <Link to="/sign-in" className="header__link" onClick={signOut}> Выйти </Link>
          </>
          :
          <>
            {window.location.pathname === "/sign-up" && <Link to="/sign-in" className="header__link"> Войти </Link>}
            {window.location.pathname === "/sign-in" &&
            <Link to="/sign-up" className="header__link"> Зарегистрироваться </Link>}
          </>
        }
      </div>

    </header>
  );
}

export default Header;

