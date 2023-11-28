import { Link, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <>
      <div className="h-12 bg-red-50 flex flex-row flex-nowrap justify-between align-center w-full">
        <div>
          <Link to="disc-catalog">
            <h1>DgExpo</h1>
          </Link>
        </div>
        <div>
          <Link to="disc-catalog">Disc Catalog</Link>
        </div>
        <div>
          <Link to="sign-in">Sign-in/Up</Link>
        </div>
        <div>
          <Link to="bag">Bag</Link>
        </div>
        <div>
          <Link to="cart">cart</Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
