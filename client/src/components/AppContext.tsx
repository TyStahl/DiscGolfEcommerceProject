import { createContext } from 'react';
import { User } from '../App';
import { CartArray } from '../pages/Cart';
import { DiscArray } from '../pages/DiscCatalog';

export type AppContextValues = {
  user: User | undefined;
  token: string | undefined;
  cartData: CartArray;
  bagData: DiscArray;
  handleAddToBag: (discId: number) => void;
  handleAddToCart: (discId: number) => void;
  handleSignIn: (user: User, token: string) => void;
  handleSignOut: () => void;
};

export const AppContext = createContext<AppContextValues>({
  user: undefined,
  token: undefined,
  cartData: [],
  bagData: [],
  handleAddToBag: () => undefined,
  handleAddToCart: () => undefined,
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});
