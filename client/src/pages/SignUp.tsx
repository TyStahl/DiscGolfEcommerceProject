import { FormEvent } from 'react';

export function SignUp() {
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
      const res = await fetch('/api/auth/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const user = await res.json();
      console.log('Registered', user);
    } catch (err) {
      alert(`Error registering user: ${err}`);
    }
    // finally {
    //   setIsLoading(false);
    // }
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
