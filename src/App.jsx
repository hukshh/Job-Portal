import './App.css';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { ApplicationPanel } from './components/ApplicationPanel';
import { Header } from './components/Header';
import { HeroPanel } from './components/HeroPanel';
import { JobList } from './components/JobList';
import { SavedJobsPanel } from './components/SavedJobsPanel';
import { SearchPanel } from './components/SearchPanel';
import { Spinner } from './components/Spinner';
import { Toast } from './components/Toast';
import LoginPanel from './components/LoginPanel';
import ProfilePanel from './components/ProfilePanel';
import ResumePanel from './components/ResumePanel';
import { jobOpenings } from './data/jobs';
import { useJobPortal } from './hooks/useJobPortal';
import { useToast } from './hooks/useToast';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('jobs');
  const { toast, showToast, hideToast } = useToast();

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
  } = useJobPortal(jobOpenings);

  const handleSubmit = (formValues) => {
    const success = submitApplication(formValues);
    if (success) {
      showToast(`Application sent for ${applyingJob?.title}!`, 'success');
      closeApplication();
    } else {
      showToast('Please fill in all required fields.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="app-shell app-shell--centered">
        <Spinner size="lg" />
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
                  onSubmit={handleSubmit}
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

      <Toast message={toast.message} type={toast.type} onClose={hideToast} />
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
