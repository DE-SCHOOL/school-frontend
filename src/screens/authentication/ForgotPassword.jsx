import { useState } from "react";
import AuthAnimator from "../../components/auth/AuthAnimator";

function ForgotPassword() {
  const [passResetEmail, setPassResetEmail] = useState("")

  function handleResetPassword(e) {
    e.preventDefault()

    setPassResetEmail("")
  }

  return (
    <div className="auth">
      <AuthAnimator />

      <div className="form">
        <form onSubmit={handleResetPassword}>
          <h1>Recover Password</h1>
          <p>
            Enter your email address and we'll send you an email with
            instructions to reset your password
          </p>

          <div className="email">

          <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={passResetEmail}
              onChange={(e) => setPassResetEmail(e.target.value)
            } />
          </div>

          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword