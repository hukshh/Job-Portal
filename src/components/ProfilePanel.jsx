import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './ProfilePanel.css';

const ProfilePanel = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user?.profile || {});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      updateProfile(formData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(user?.profile || {});
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="profile-panel">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button
            className="edit-btn"
            onClick={() => setIsEditing(!isEditing)}
            aria-label="Toggle edit mode"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} className="profile-form">
            <div className="form-section">
              <h2>Basic Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  aria-label="Full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={user?.email}
                  disabled
                  aria-label="Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  aria-label="Phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  aria-label="Location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="headline">Professional Headline</label>
                <input
                  id="headline"
                  type="text"
                  name="headline"
                  value={formData.headline || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Software Developer"
                  aria-label="Professional headline"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="5"
                  aria-label="Bio"
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="save-btn"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <div className="profile-section">
              <h2>Basic Information</h2>
              <div className="profile-info">
                <div className="info-item">
                  <span className="label">Full Name:</span>
                  <span className="value">{formData.fullName || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{formData.phone || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Location:</span>
                  <span className="value">{formData.location || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Professional Headline:</span>
                  <span className="value">{formData.headline || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Bio:</span>
                  <span className="value bio-text">{formData.bio || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;
