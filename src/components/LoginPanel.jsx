import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './LoginPanel.css';

const LoginPanel = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-panel">
      <div className="login-background">
        <div className="gradient-orb top-left"></div>
        <div className="gradient-orb bottom-right"></div>
      </div>

      <div className="login-container">
        <div className="login-header">
          <div className="logo-section">
            <div className="logo-icon">💼</div>
            <div>
              <h1>JobPortal</h1>
              <p className="logo-tagline">Your Career Gateway</p>
            </div>
          </div>
        </div>

        <div className="login-card">
          <h2 className="card-title">Welcome Back</h2>
          <p className="card-subtitle">Sign in to your account</p>

          {error && (
            <div className="error-message" role="alert">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  disabled={loading}
                  aria-label="Email address"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  aria-label="Password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex="-1"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="divider">
            <span>Demo Credentials</span>
          </div>

          <div className="demo-section">
            <div className="demo-item">
              <span className="demo-label">Email:</span>
              <code>demo@example.com</code>
            </div>
            <div className="demo-item">
              <span className="demo-label">Password:</span>
              <code>password123</code>
            </div>
          </div>

          <div className="features-grid">
            <div className="feature-box">
              <span>🔒</span>
              <p>Secure</p>
            </div>
            <div className="feature-box">
              <span>⚡</span>
              <p>Fast</p>
            </div>
            <div className="feature-box">
              <span>🎯</span>
              <p>Easy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPanel;
