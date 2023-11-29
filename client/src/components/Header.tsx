import { Link, Outlet } from 'react-router-dom';
import { FaCartShopping, FaSuitcase } from 'react-icons/fa6';

export function Header() {
  return (
    <>
      <div className="h-12 bg-red-50 flex flex-row flex-nowrap justify-between align-center w-full">
        <div>
          <h1>DgExpo</h1>
        </div>
        <div>
          <Link to="disc-catalog">Disc Catalog</Link>
        </div>
        <div>
          <Link to="sign-in">Sign-in/Up</Link>
        </div>
        <div>
          <Link to="bag">
            <FaSuitcase />
          </Link>
        </div>
        <div>
          <Link to="cart">
            <FaCartShopping />
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
