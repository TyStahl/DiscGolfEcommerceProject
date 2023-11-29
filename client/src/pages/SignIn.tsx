import { FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchSignIn } from '../lib/fetch';
import { AppContext } from '../components/AppContext';

export function SignIn() {
  const { handleSignIn } = useContext(AppContext);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      // setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { user, token } = await fetchSignIn(
        userData.username as string,
        userData.password as string
      );
      handleSignIn(user, token);
      // const req = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // };
      // const res = await fetch('/api/auth/sign-in', req);
      // if (!res.ok) {
      //   throw new Error(`fetch Error ${res.status}`);
      // }
      // const { user, token } = await res.json();
      // sessionStorage.setItem('token', token);
      // console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
    <>
      <div>
        <p>Dont have an account?</p>
        <button>
          <Link to="/sign-up">Sign-Up</Link>
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Sign In!</p>
          <div>
            <div>
              <label>
                Username:
                <input required name="username" type="text"></input>
              </label>
            </div>
            <div>
              <label>
                Password:
                <input required name="password" type="text"></input>
              </label>
            </div>
            <button>Sign In!</button>
          </div>
        </form>
      </div>
    </>
  );
}
