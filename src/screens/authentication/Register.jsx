import AuthAnimator from "../../components/auth/AuthAnimator";

function Register() {
  return (
    <div className="auth">
      <AuthAnimator />

      <div className="form">
        <form>
          <h1>Signup</h1>
          <p>Enter your details below to create an account</p>

          <fieldset className="personal_information">
            <legend>Personal Information</legend>
            <label htmlFor="name">Full Name</label>
            <input type="text" placeholder="Full Name" />

            <label htmlFor="matricule">Matricule</label>
            <input type="text" placeholder="Matricule" />

            <label htmlFor="gender">Gender</label>
            <select name="gender" id="">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="dob">Date of Birth</label>
            <input type="date" />
          </fieldset>

          <fieldset className="contact_information">
            <legend>Contact Information</legend>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="your.email@gmail.com" />

            <label htmlFor="phone">Telephone</label>
            <input type="tel" placeholder="600 000 000" />

            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="" />
          </fieldset>


          <fieldset className="education">
            <legend>Education</legend>
            <label htmlFor="specialty">Specialty</label>
            <select>
              <option value="engineering">Engineering</option>
              <option value="agriculture">Agriculture</option>
              <option value="business">Business</option>
              <option value="medicine">Medicine</option>
            </select>

            <label htmlFor="education">Highest Education Level</label>
            <input type="text" placeholder="Education" />
          </fieldset>

          <fieldset className="parent">
            <legend>Parent Information</legend>

            <label htmlFor="parent_name">Parent's Name</label>
            <input type="text" name="parentName" id="parentName" />

            <label htmlFor="parentEmail">Parent's Email</label>
            <input type="email" name="parentEmail" id="parentEmail" />
          </fieldset>

          <fieldset className="password">
            <legend>Password Information</legend>

            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" />

          </fieldset>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register