import { DiscArray, DiscCatalog } from './pages/DiscCatalog';
import { Header } from './components/Header';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { DiscDetails } from './pages/DiscDetails';
import { Route, Routes } from 'react-router-dom';
import { Cart, CartArray } from './pages/Cart';
import { Bag } from './pages/Bag';
import { AppContext } from './components/AppContext';
import { useEffect, useState } from 'react';
import {
  fetchToBag,
  fetchToCart,
  fetchUsersBag,
  fetchUsersCart,
} from './lib/fetch';
// import { AppContext } from './components/AppContext';

export type User = {
  userId: number;
  username: string;
};

export type Auth = {
  user: User;
  token: string;
};

export default function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [cartData, setCartData] = useState<CartArray>([]);
  const [bagData, setBagData] = useState<DiscArray>([]);

  //setter functions - user login/signin set user/ set token/ add to sessionstorage
  //move add to a cart add to bag functions here and remove from cart/bag functions
  //useEffect, read cartData, bagData

  useEffect(() => {
    // const auth = sessionStorage.getItem('token');
    // if (auth) {
    //   const current = JSON.parse(auth);
    //   setUser(current.user);
    //   setToken(current.token);
    async function checkCollections() {
      const cartData: CartArray = await fetchUsersCart();
      setCartData(cartData);
      const bagData: DiscArray = await fetchUsersBag();
      setBagData(bagData);
    }
    checkCollections();
  }, []);

  function handleSignIn(user: User, token: string) {
    sessionStorage.setItem('token', token);
    setUser(user);
    setToken(token);
  }

  function handleSignOut() {
    sessionStorage.removeItem('token');
    setUser(undefined);
    setToken(undefined);
  }

  async function handleAddToCart(discId: number) {
    try {
      const data = await fetchToCart(discId);
      setCartData([...cartData, data]);
      console.log('added to cart: ', data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddToBag(discId: number) {
    try {
      const data = await fetchToBag(discId);
      setBagData([...bagData, data]);
      console.log('added to bag: ', data);
    } catch (err) {
      console.error(err);
    }
  }

  const contextValue = {
    user,
    token,
    cartData,
    bagData,
    handleAddToBag,
    handleAddToCart,
    handleSignIn,
    handleSignOut,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="disc-catalog" element={<DiscCatalog />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="disc-details/:discId" element={<DiscDetails />} />
          <Route path="bag" element={<Bag />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}
