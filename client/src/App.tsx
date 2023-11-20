import './App.css';
import { DiscCatalog } from './pages/DiscCatalog';
import { Header } from './components/Header';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export default function App() {
  return (
    <>
      <SignUp />
      <SignIn />
      <Header />
      <DiscCatalog />
    </>
  );
}
