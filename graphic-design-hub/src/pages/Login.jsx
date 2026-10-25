import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function Login() {
  const { authenticateDemoAccount } = useAuth();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const identifier = credentials.identifier.trim();
    const nextErrors = {};

    if (!identifier) {
      nextErrors.identifier = "Enter your username or email address.";
    } else if (identifier.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      nextErrors.identifier = "Enter a valid email address or use your username.";
    }

    if (!credentials.password) {
      nextErrors.password = "Enter your password.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = await authenticateDemoAccount({ ...credentials, rememberMe });
    if (!result.ok) {
      setErrors((current) => ({ ...current, [result.field]: result.message }));
      return;
    }

    navigate("/");
  };

  const updateCredential = (field, value) => {
    setCredentials((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
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
            <button type="button" className="social-btn" aria-label="Continue with Facebook" title="Continue with Facebook">
              <svg className="social-facebook-icon" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="17" />
                <path d="M20.2 29V19.5h3.2l.5-3.7h-3.7v-2.4c0-1.1.3-1.8 1.9-1.8H24V8.3c-.8-.1-1.8-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9v2.8h-3.2v3.7h3.2V29z" />
              </svg>
            </button>
            <button type="button" className="social-btn" aria-label="Continue with Google" title="Continue with Google">
              <svg className="social-google-icon" viewBox="0 0 36 36" aria-hidden="true">
                <defs>
                  <linearGradient id="google-g-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#4285F4" />
                    <stop offset="35%" stopColor="#34A853" />
                    <stop offset="62%" stopColor="#FBBC05" />
                    <stop offset="82%" stopColor="#EA4335" />
                    <stop offset="100%" stopColor="#4285F4" />
                  </linearGradient>
                </defs>
                <text x="18" y="28" textAnchor="middle" fill="url(#google-g-gradient)">G</text>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username or Email"
                aria-label="Username or email"
                aria-invalid={Boolean(errors.identifier)}
                aria-describedby={errors.identifier ? "login-identifier-error" : undefined}
                autoComplete="username"
                value={credentials.identifier}
                onChange={(event) => updateCredential("identifier", event.target.value)}
              />
              {errors.identifier && <p className="field-error" id="login-identifier-error" role="alert">{errors.identifier}</p>}
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "login-password-error" : undefined}
                autoComplete="current-password"
                value={credentials.password}
                onChange={(event) => updateCredential("password", event.target.value)}
              />
              {errors.password && <p className="field-error" id="login-password-error" role="alert">{errors.password}</p>}
            </div>
            <button type="submit" className="btn btn-signin">SIGN IN</button>
            <div className="form-footer">
              <a href="#">Forgot password?</a>
              <label>
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /> Remember me
              </label>
            </div>
          </form>

          <div className="divider">or</div>
          <Link to="/signup" className="btn btn-signup">SIGN UP</Link>
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