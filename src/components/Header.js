import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({loggedIn, email, handleLogout}) {

  const { pathname } = useLocation();
  const [ linkProps, setLinkProps ] = useState({href: '', text: ''})

  useEffect(() => {
    if (pathname === '/sign-in') {
      setLinkProps({
        href: '/sign-up',
        text: 'Регистрация',
      })
    } else if (loggedIn) {
      setLinkProps({
        href: '/sign-in',
        text: 'Выйти',
        onClick: handleLogout
      })
    } else {
      setLinkProps({
        href: '/sign-in',
        text: 'Войти'
      })
    }
  }, [pathname, loggedIn, handleLogout])

  return (
    <header className="header">
      <Link to="/" className="header__logo" aria-label="Перейти на главную"></Link>
      <div className="space"></div>
      <p className="header__info">{email}</p>
      <Link to={linkProps.href} onClick={linkProps.onClick} className="header__link button">{linkProps.text}</Link>
    </header>
  );
}

export default Header;
