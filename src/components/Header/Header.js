import logo from '../../images/logo/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="логотип Место" src={logo} />
    </header>
  );
}

export default Header;
