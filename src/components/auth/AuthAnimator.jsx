import { lmuLogo } from "../../assets/logos";

function AuthAnimator() {
  return (
    <div className="auth-animate">
      <div className="first">
        <div className="biggest">
          <div className="bigger">
            <div className="big">
              <span className="img">
                <img className="image" src={lmuLogo} alt="LMU" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthAnimator