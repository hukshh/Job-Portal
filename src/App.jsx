import './App.css';
import { useState } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { ApplicationPanel } from './components/ApplicationPanel';
import { Header } from './components/Header';
import { HeroPanel } from './components/HeroPanel';
import { JobList } from './components/JobList';
import { SavedJobsPanel } from './components/SavedJobsPanel';
import { SearchPanel } from './components/SearchPanel';
import LoginPanel from './components/LoginPanel';
import ProfilePanel from './components/ProfilePanel';
import ResumePanel from './components/ResumePanel';
import { jobOpenings } from './data/jobs';
import { useJobPortal } from './hooks/useJobPortal';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('jobs');

  const {
    searchTerm,
    setSearchTerm,
    jobType,
    setJobType,
    filteredJobs,
    savedJobs,
    toggleSaveJob,
    applyingJob,
    startApplication,
    submitApplication,
    closeApplication,
    statusMessage,
  } = useJobPortal(jobOpenings);

  if (loading) {
    return (
      <div className="app-shell">
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPanel />;
  }

  return (
    <div className="app-shell">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'jobs' && (
        <>
          <HeroPanel />
          <SearchPanel
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            selectedType={jobType}
            onSelectType={setJobType}
          />
          <div className="app-grid">
            <div className="app-grid__primary">
              <JobList
                jobs={filteredJobs}
                savedJobs={savedJobs}
                onApply={startApplication}
                onSave={toggleSaveJob}
              />
            </div>
            <div className="app-grid__sidebar">
              {applyingJob ? (
                <ApplicationPanel
                  job={applyingJob}
                  onClose={closeApplication}
                  onSubmit={submitApplication}
                  statusMessage={statusMessage}
                />
              ) : (
                <div className="apply-placeholder">
                  <h4>Select a role to apply</h4>
                  <p>Pick any job on the left to open the quick application form.</p>
                </div>
              )}
              <SavedJobsPanel jobs={savedJobs} />
            </div>
          </div>
        </>
      )}

      {currentPage === 'profile' && <ProfilePanel />}

      {currentPage === 'resume' && <ResumePanel />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
