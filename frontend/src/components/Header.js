import './../App.css';
import logoMesto from './../images/Logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
      <header className="header">
        <img className="logo"  src={logoMesto} alt="Логотип"/>
        <div className="header__conteiner-user">
          <p className="header__user-email">{props.userEmail || ''}</p>
          <Link className="button_type_header button_type_profile-exit" to={props.toLink || ''} onClick={props.onClick}>{props.buttonText}</Link>
        </div>
      </header>
  );
}

export default Header;
