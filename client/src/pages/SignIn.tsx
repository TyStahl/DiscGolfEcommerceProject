import { FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignIn } from '../lib/fetch';
import { AppContext } from '../components/AppContext';

export function SignIn() {
  const navigate = useNavigate();
  const { handleSignIn } = useContext(AppContext);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());

      const { user, token } = await fetchSignIn(
        userData.username as string,
        userData.password as string
      );
      handleSignIn(user, token);
      navigate('/disc-catalog');
    } catch (err) {
      alert(`Error signing in: ${err}`);
    }
  }

  return (
    <div className="container-none m-12">
      <div className="flex justify-center flex-wrap">
        <p className="w-full text-center ">Dont have an account?</p>
        <button className="border-2 rounded">
          <Link to="/sign-up">Sign-Up</Link>
        </button>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div>Sign In!</div>
          <div>
            <div className="flex justify-end">
              <label>
                Username:
                <input
                  required
                  className="border-2 rounded"
                  name="username"
                  placeholder="username"
                  type="text"></input>
              </label>
            </div>
            <div className="flex justify-end">
              <label>
                Password:
                <input
                  required
                  className="border-2 rounded"
                  placeholder="password"
                  name="password"
                  type="password"></input>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="border-2 rounded">Sign In!</button>
          </div>
        </form>
      </div>
    </div>
  );
}
