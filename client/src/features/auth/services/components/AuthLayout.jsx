import { Link } from "react-router-dom";

import "../../../../styles/auth.css";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="auth-page">
      <section className="auth-brand">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-icon">L</span>
          <span>LokChat</span>
        </Link>

        <div className="auth-brand-content">
          <span className="auth-eyebrow">CONNECT WITHOUT BARRIERS</span>

          <h1>
            Conversations that
            <br />
            bring people closer.
          </h1>

          <p>
            Connect with your people, share moments and communicate
            across languages.
          </p>
        </div>

        <div className="auth-brand-footer">
          Private conversations. Meaningful connections.
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-form-container">
          <div className="auth-mobile-logo">
            <span className="auth-logo-icon">L</span>
            <span>LokChat</span>
          </div>

          <div className="auth-heading">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}
        </div>
      </section>
    </main>
  );
}