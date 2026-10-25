import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export default function Signup() {
  const { registerDemoAccount } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    const email = values.email.trim();

    if (values.name.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (values.password.length < 8) nextErrors.password = "Use at least 8 characters for your password.";
    if (!values.confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (values.confirmPassword !== values.password) nextErrors.confirmPassword = "Passwords do not match.";
    if (!values.acceptedTerms) nextErrors.acceptedTerms = "Accept the terms to create your demo account.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = await registerDemoAccount(values);
    if (!result.ok) {
      setErrors((current) => ({ ...current, [result.field]: result.message }));
      return;
    }

    navigate("/");
  };

  return (
    <div id="login-page" className="page active">
      <div className="top-wave-bg">
        <h1 className="welcome-title">Join GraphicDesignHUB</h1>
        <p className="welcome-subtitle">Create your student account and start building your design skills.</p>
      </div>

      <div className="bottom-content-area">
        <section className="login-card" aria-labelledby="signup-title">
          <h2 id="signup-title">Create your account</h2>
          <p className="signup-demo-note">Demo accounts stay in this browser and are not synced to a server.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                autoComplete="name"
                aria-label="Full name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "signup-name-error" : undefined}
                placeholder="Full name"
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
              {errors.name && <p className="field-error" id="signup-name-error" role="alert">{errors.name}</p>}
            </div>
            <div className="input-group">
              <input
                type="email"
                autoComplete="email"
                aria-label="Email address"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "signup-email-error" : undefined}
                placeholder="Email address"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
              {errors.email && <p className="field-error" id="signup-email-error" role="alert">{errors.email}</p>}
            </div>
            <div className="input-group">
              <input
                type="password"
                autoComplete="new-password"
                aria-label="Password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "signup-password-error" : undefined}
                placeholder="Password (at least 8 characters)"
                value={values.password}
                onChange={(event) => updateField("password", event.target.value)}
              />
              {errors.password && <p className="field-error" id="signup-password-error" role="alert">{errors.password}</p>}
            </div>
            <div className="input-group">
              <input
                type="password"
                autoComplete="new-password"
                aria-label="Confirm password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "signup-confirm-error" : undefined}
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={(event) => updateField("confirmPassword", event.target.value)}
              />
              {errors.confirmPassword && <p className="field-error" id="signup-confirm-error" role="alert">{errors.confirmPassword}</p>}
            </div>
            <div className="signup-terms">
              <label>
                <input type="checkbox" checked={values.acceptedTerms} onChange={(event) => updateField("acceptedTerms", event.target.checked)} />
                I agree to the demo terms
              </label>
              {errors.acceptedTerms && <p className="field-error" role="alert">{errors.acceptedTerms}</p>}
            </div>
            <button type="submit" className="btn btn-signin">CREATE ACCOUNT</button>
          </form>
          <p className="signup-login-link">Already have an account? <Link to="/login">Sign in</Link></p>
        </section>
      </div>
    </div>
  );
}