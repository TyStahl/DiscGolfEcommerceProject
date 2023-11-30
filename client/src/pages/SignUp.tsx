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
    <div className="container-none m-12">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <p className="text-center ">Sign Up!</p>
          <div>
            <div className="flex justify-end">
              <label>
                Username:
                <input
                  required
                  className="border-2 rounded"
                  placeholder="username"
                  name="username"
                  type="text"></input>
              </label>
            </div>
            <div className="flex justify-end">
              <label>
                Password:
                <input
                  required
                  className="border-2 rounded"
                  placeholder="username"
                  name="password"
                  type="text"></input>
              </label>
            </div>
            <div className="flex justify-end">
              <button className="border-2 rounded">Sign Up!</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
