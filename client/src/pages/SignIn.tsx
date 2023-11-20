import { FormEvent } from 'react';

export function SignIn() {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      // setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      sessionStorage.setItem('token', token);
      console.log('Signed In', user, '; received token:', token);
    } catch (err) {
      alert(`Error signing in: ${err}`);
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  return (
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
  );
}
