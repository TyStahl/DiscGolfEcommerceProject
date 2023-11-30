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
  fetchRemoveDiscFromCart,
  fetchToBag,
  fetchToCart,
  fetchUpdateDiscQuantity,
  fetchUsersBag,
  fetchUsersCart,
} from './lib/fetch';

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
  const [IsLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const contextValue = {
    user,
    token,
    cartData,
    IsLoggedIn,
    setCartData,
    bagData,
    handleAddToBag,
    handleRemoveFromCart,
    handleAddToCart,
    handleSignIn,
    handleSignOut,
    handleUpdateDiscQuantity,
  };

  useEffect(() => {
    async function checkCollections() {
      const cartData: CartArray = await fetchUsersCart();
      setCartData(cartData);
      const bagData: DiscArray = await fetchUsersBag();
      setBagData(bagData);
    }
    if (IsLoggedIn) {
      checkCollections();
    }
  }, [IsLoggedIn]);

  function handleSignIn(user: User, token: string) {
    sessionStorage.setItem('token', token);
    setUser(user);
    setToken(token);
    setIsLoggedIn(true);
    console.log('user is logged in?', IsLoggedIn);
  }

  function handleSignOut() {
    sessionStorage.removeItem('token');
    setUser(undefined);
    setToken(undefined);
    setIsLoggedIn(false);
    console.log('user is logged in?', IsLoggedIn);
  }

  async function handleAddToCart(discId: number) {
    if (!IsLoggedIn) {
      return;
    }
    try {
      const data = await fetchToCart(discId);
      const disc = await fetchUsersCart();
      setCartData(disc);
      console.log('added to cart: ', data);
      console.log(cartData);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateDiscQuantity(discId: number, quantity: number) {
    if (quantity <= 0) {
      return;
    }
    try {
      const data = await fetchUpdateDiscQuantity(discId, quantity);
      const updatedCart = cartData.map((disc) => {
        if (disc.discId === data.discId) {
          return { ...disc, ...data };
        } else {
          return disc;
        }
      });
      setCartData(updatedCart);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemoveFromCart(discId: number) {
    try {
      await fetchRemoveDiscFromCart(discId);
      const updatedCart = cartData.filter((disc) => {
        if (disc.discId !== discId) {
          return true;
        } else {
          return false;
        }
      });
      setCartData(updatedCart);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddToBag(discId: number) {
    if (!IsLoggedIn) {
      return;
    }
    try {
      const data = await fetchToBag(discId);
      setBagData([...bagData, data]);
      console.log('added to bag: ', data);
    } catch (err) {
      console.error(err);
    }
  }

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
