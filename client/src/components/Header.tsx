import { Link, Outlet } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <>
      <div className="nav-bar-row">
        <div className="col15">
          <p>
            <Link to="disc-catalog">DgExpo</Link>
          </p>
        </div>
        <div className="col15">
          <p>
            <Link to="disc-catalog">Disc Catalog</Link>
          </p>
        </div>
        <div className="col15">
          <p>
            <Link to="collection">Bag</Link>
          </p>
        </div>
        <div className="col15">
          <p>
            <Link to="sign-in">Sign-in/Up</Link>
          </p>
        </div>
        <div className="col15">
          <p>
            <Link to="cart">Cart</Link>
          </p>
        </div>
      </div>
      <Outlet />
    </>
  );
}
