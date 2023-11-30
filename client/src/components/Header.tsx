import { Link, Outlet } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { GiDiscGolfBasket, GiBackpack } from 'react-icons/gi';

export function Header() {
  return (
    <>
      <div className="bg-red-50 flex flex-row flex-nowrap justify-between align-center w-full">
        <div className="flex justify-center flex-wrap">
          <GiDiscGolfBasket className="text-8xl" />
          <h1 className="w-full text-center">DG Depot</h1>
        </div>
        <div>
          <Link to="disc-catalog">
            <p>View Disc Catalog</p>
          </Link>
        </div>
        <div>
          <Link to="sign-in">Sign-In</Link>
        </div>
        <div className="flex flex-wrap items-center">
          <div>
            <Link to="bag">
              <GiBackpack className="text-6xl" />
              <p>my bag</p>
            </Link>
          </div>
          <div>
            <Link to="cart">
              <FaCartShopping className="text-6xl" />
              <p>my cart</p>
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
