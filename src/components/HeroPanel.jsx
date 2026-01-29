import './HeroPanel.css';

export function HeroPanel() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Find Your Next Opportunity</h1>
          <p className="hero-subtitle">
            Discover amazing job opportunities from top companies and take your career to the next level
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Candidates</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-header">
              <div className="card-dot red"></div>
              <div className="card-dot yellow"></div>
              <div className="card-dot green"></div>
            </div>
            <div className="card-content">
              <div className="featured-job">
                <div className="job-icon">💼</div>
                <div className="job-info">
                  <h3>Senior Developer</h3>
                  <p>Tech Corp Inc.</p>
                  <div className="job-meta">
                    <span className="badge">Remote</span>
                    <span className="badge">$120K-150K</span>
                  </div>
                </div>
              </div>
              <div className="featured-job">
                <div className="job-icon">🎨</div>
                <div className="job-info">
                  <h3>UI/UX Designer</h3>
                  <p>Creative Studios</p>
                  <div className="job-meta">
                    <span className="badge">On-site</span>
                    <span className="badge">$80K-100K</span>
                  </div>
                </div>
              </div>
              <div className="featured-job">
                <div className="job-icon">📊</div>
                <div className="job-info">
                  <h3>Product Manager</h3>
                  <p>Innovation Labs</p>
                  <div className="job-meta">
                    <span className="badge">Hybrid</span>
                    <span className="badge">$110K-140K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-features">
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h4>Quick Apply</h4>
          <p>Apply to jobs in seconds with our streamlined process</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💾</div>
          <h4>Save Jobs</h4>
          <p>Bookmark your favorite opportunities for later</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📄</div>
          <h4>Resume Builder</h4>
          <p>Create or upload your resume quickly and easily</p>
        </div>
        <div className="feature">
          <div className="feature-icon">👤</div>
          <h4>Profile Management</h4>
          <p>Keep your profile up-to-date with your latest info</p>
        </div>
      </div>
    </div>
  );
}
