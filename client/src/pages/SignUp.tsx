import { FormEvent } from 'react';
import { fetchSignUp } from '../lib/fetch';

export function SignUp() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const { username, password } = userData;
    await fetchSignUp(username as string, password as string);
  }

  return (
    <div>
      <p>Sign Up!</p>
      <form onSubmit={handleSubmit}>
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
          <button>Sign Up!</button>
        </div>
      </form>
    </div>
  );
}
