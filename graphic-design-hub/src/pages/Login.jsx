import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div id="login-page" className="page active">
      <div className="top-wave-bg">
        <h1 className="welcome-title">Welcome to GraphicDesignHUB!</h1>
        <p className="welcome-subtitle">
          Learn professional graphic design tools and techniques with us.
        </p>
      </div>

      <div className="bottom-content-area">
        <div className="login-card">
          <h2>Sign in to GraphicDesignHUB</h2>
          <div className="social-login">
            <button type="button" className="social-btn">
              <i className="fa-brands fa-facebook-f" />
            </button>
            <button type="button" className="social-btn">
              <i className="fa-brands fa-google" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" placeholder="Username or Email" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-signin">SIGN IN</button>
            <div className="form-footer">
              <a href="#">Forgot password?</a>
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
          </form>

          <div className="divider">or</div>
          <button type="button" className="btn btn-signup">SIGN UP</button>
        </div>

        <footer className="login-footer">
          <a href="#">Download Android App</a>
          <a href="#">Download iOS App</a>
          <a href="#">About HUB</a>
          <a href="#">Our Team</a>
          <a href="#">Blog</a>
        </footer>
      </div>
    </div>
  );
}