import { useState } from "react";
import AuthAnimator from "../../components/auth/AuthAnimator";

function Signin() {
  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState ("")


  function handleSignIn(e) {
    e.preventDefault()

    // ? clear the form after the data has been submitted
    setSignInEmail("")
    setSignInPassword("")
  }


  return (
    <div className="auth">
      <AuthAnimator />

      <div className="form">
        <form onSubmit={handleSignIn}>
          <h1>Login</h1>
          <p>Enter your email and password to access your account</p>

          <div className="email">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              value={signInEmail}
              placeholder="your@email.com"
              onChange={(e) => setSignInEmail(e.target.value)}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
          </div>

          <div className="forgot">
            <button>Login</button>
            <a href="./forgot-password">Forgot Password?</a>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Signin