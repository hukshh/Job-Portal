import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

export const Header = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setShowUserMenu(false);
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-brand">
          <p className="eyebrow">Job Portal</p>
        </div>
        {user && (
          <div className="header-nav">
            <nav className="nav-links">
              <button
                className={`nav-link ${currentPage === 'jobs' ? 'active' : ''}`}
                onClick={() => handleNavigation('jobs')}
                aria-label="Go to jobs"
              >
                Jobs
              </button>
              <button
                className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                onClick={() => handleNavigation('profile')}
                aria-label="Go to profile"
              >
                Profile
              </button>
              <button
                className={`nav-link ${currentPage === 'resume' ? 'active' : ''}`}
                onClick={() => handleNavigation('resume')}
                aria-label="Go to resume"
              >
                Resume
              </button>
            </nav>

            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="User menu"
                aria-expanded={showUserMenu}
              >
                <span className="user-avatar">{user.email.charAt(0).toUpperCase()}</span>
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-email">{user.email}</p>
                  </div>
                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {currentPage === 'jobs' && (
        <div className="header-content">
          <h1>Find roles that fit the way you want to work.</h1>
          <p className="subtitle">
            Explore open positions, internships, and contract roles. Save the ones you
            like and send your interest in a few clicks.
          </p>
        </div>
      )}

      {currentPage === 'profile' && (
        <div className="header-content">
          <h1>Your Profile</h1>
          <p className="subtitle">Manage your professional information</p>
        </div>
      )}

      {currentPage === 'resume' && (
        <div className="header-content">
          <h1>Your Resume</h1>
          <p className="subtitle">Create and manage your resume</p>
        </div>
      )}
    </header>
  );
};



