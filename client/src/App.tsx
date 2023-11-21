import './App.css';
import { DiscCatalog } from './pages/DiscCatalog';
import { Header } from './components/Header';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { DiscDetails } from './pages/DiscDetails';
import { Route, Routes } from 'react-router-dom';
import { Collection } from './pages/Collection';
import { Cart } from './pages/Cart';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="disc-catalog" element={<DiscCatalog />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="disc-details/:discId" element={<DiscDetails />} />
        <Route path="collection" element={<Collection />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}
