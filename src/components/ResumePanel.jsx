import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './ResumePanel.css';

const ResumePanel = () => {
  const { user, updateResume } = useAuth();
  const [isEditing, setIsEditing] = useState(!user?.resume);
  const [formData, setFormData] = useState(
    user?.resume || {
      fullName: user?.profile?.fullName || '',
      email: user?.email || '',
      phone: user?.profile?.phone || '',
      location: user?.profile?.location || '',
      summary: '',
      skills: [],
      experience: [],
      education: []
    }
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [experienceInput, setExperienceInput] = useState('');
  const [educationInput, setEducationInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const addExperience = () => {
    if (experienceInput.trim()) {
      setFormData({
        ...formData,
        experience: [...formData.experience, experienceInput.trim()]
      });
      setExperienceInput('');
    }
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    if (educationInput.trim()) {
      setFormData({
        ...formData,
        education: [...formData.education, educationInput.trim()]
      });
      setEducationInput('');
    }
  };

  const removeEducation = (index) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index)
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      updateResume(formData);
      setMessage('Resume saved successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving resume');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(user?.resume || {});
    setIsEditing(false);
    setMessage('');
  };

  const handleKeyPress = (e, callback) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

  const downloadResume = () => {
    const resumeText = `
RESUME
${formData.fullName}
${formData.email} | ${formData.phone} | ${formData.location}

PROFESSIONAL SUMMARY
${formData.summary || 'Not provided'}

SKILLS
${formData.skills.map(skill => `• ${skill}`).join('\n') || 'Not provided'}

EXPERIENCE
${formData.experience.map(exp => `• ${exp}`).join('\n') || 'Not provided'}

EDUCATION
${formData.education.map(edu => `• ${edu}`).join('\n') || 'Not provided'}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(resumeText)}`);
    element.setAttribute('download', `resume_${formData.fullName.replace(/\s+/g, '_')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="resume-panel">
      <div className="resume-container">
        <div className="resume-header">
          <h1>My Resume</h1>
          <div className="resume-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
              aria-label="Toggle edit mode"
            >
              {isEditing ? 'Cancel' : 'Edit Resume'}
            </button>
            {!isEditing && user?.resume && (
              <button
                className="download-btn"
                onClick={downloadResume}
                aria-label="Download resume"
              >
                ⬇ Download
              </button>
            )}
          </div>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} className="resume-form">
            <div className="form-section">
              <h2>Contact Information</h2>

              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  aria-label="Full name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    aria-label="Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    aria-label="Phone"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  aria-label="Location"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Professional Summary</h2>
              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Brief overview of your professional background"
                  rows="4"
                  aria-label="Professional summary"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Skills</h2>
              <div className="list-input-group">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addSkill)}
                  placeholder="e.g., React, Node.js, JavaScript"
                  aria-label="Skill input"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="add-btn"
                  aria-label="Add skill"
                >
                  Add Skill
                </button>
              </div>
              <div className="tags-list">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="remove-tag"
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2>Work Experience</h2>
              <div className="list-input-group">
                <input
                  type="text"
                  value={experienceInput}
                  onChange={(e) => setExperienceInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addExperience)}
                  placeholder="e.g., Senior Developer at Tech Company (2020-Present)"
                  aria-label="Experience input"
                />
                <button
                  type="button"
                  onClick={addExperience}
                  className="add-btn"
                  aria-label="Add experience"
                >
                  Add Experience
                </button>
              </div>
              <div className="list-items">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="list-item">
                    <span>{exp}</span>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="remove-btn"
                      aria-label="Remove experience"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2>Education</h2>
              <div className="list-input-group">
                <input
                  type="text"
                  value={educationInput}
                  onChange={(e) => setEducationInput(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, addEducation)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  aria-label="Education input"
                />
                <button
                  type="button"
                  onClick={addEducation}
                  className="add-btn"
                  aria-label="Add education"
                >
                  Add Education
                </button>
              </div>
              <div className="list-items">
                {formData.education.map((edu, index) => (
                  <div key={index} className="list-item">
                    <span>{edu}</span>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="remove-btn"
                      aria-label="Remove education"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="save-btn"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? 'Saving...' : 'Save Resume'}
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
          </form>
        ) : user?.resume ? (
          <div className="resume-view">
            <div className="resume-section">
              <h2>Contact Information</h2>
              <p className="contact-info">
                {formData.fullName} | {formData.email} | {formData.phone} | {formData.location}
              </p>
            </div>

            {formData.summary && (
              <div className="resume-section">
                <h2>Professional Summary</h2>
                <p>{formData.summary}</p>
              </div>
            )}

            {formData.skills.length > 0 && (
              <div className="resume-section">
                <h2>Skills</h2>
                <div className="skills-grid">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.experience.length > 0 && (
              <div className="resume-section">
                <h2>Work Experience</h2>
                <ul className="resume-list">
                  {formData.experience.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>
            )}

            {formData.education.length > 0 && (
              <div className="resume-section">
                <h2>Education</h2>
                <ul className="resume-list">
                  {formData.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="no-resume">
            <p>No resume yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePanel;
