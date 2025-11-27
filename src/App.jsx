import './App.css';
import { ApplicationPanel } from './components/ApplicationPanel';
import { Header } from './components/Header';
import { JobList } from './components/JobList';
import { SavedJobsPanel } from './components/SavedJobsPanel';
import { SearchPanel } from './components/SearchPanel';
import { jobOpenings } from './data/jobs';
import { useJobPortal } from './hooks/useJobPortal';

function App() {
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

  return (
    <div className="app-shell">
      <Header />
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
    </div>
  );
}

export default App;
