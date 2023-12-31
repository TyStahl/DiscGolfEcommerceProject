import { Link, useNavigate, Outlet } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { GiDiscGolfBasket, GiBackpack } from 'react-icons/gi';
import { AppContext } from './AppContext';
import { useContext, useEffect } from 'react';
import { fetchSignIn } from '../lib/fetch';

export function Header() {
  const navigate = useNavigate();
  const { IsLoggedIn, handleSignOut, handleSignIn } = useContext(AppContext);

  function onSignOut() {
    handleSignOut();
    navigate('/sign-in');
  }

  useEffect(() => {
    function checkForUser() {
      IsLoggedIn;
    }
    checkForUser();
  }, [IsLoggedIn]);

  async function guestSignIn() {
    try {
      const { user, token } = await fetchSignIn('guest', 'guest');
      handleSignIn(user, token);
    } catch (err) {
      console.error(err);
    } finally {
      navigate('/disc-catalog');
    }
  }

  return (
    <div>
      <div className="bg-red-50 flex flex-row flex-nowrap justify-between align-center w-full">
        <div className="flex justify-center flex-wrap">
          <Link to="home">
            <GiDiscGolfBasket className="text-8xl" />
            <h1 className="w-full text-center">DG Depot</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="disc-catalog">
            <h1 className="text-2xl border-2 rounded font-extrabold">
              View Disc Catalog
            </h1>
          </Link>
        </div>
        {!IsLoggedIn && (
          <div>
            <div className="flex items-center justify-center">
              <Link to="sign-in">Sign-In</Link>
            </div>
            <div className="flex items-center">
              <button onClick={() => guestSignIn()}>Guest Sign-In</button>
            </div>
          </div>
        )}
        {IsLoggedIn && (
          <div className="flex items-center" onClick={() => onSignOut()}>
            <Link to="sign-in">Sign-Out</Link>
          </div>
        )}
        {IsLoggedIn && (
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
        )}
      </div>

      <Outlet />
    </div>
  );
}
