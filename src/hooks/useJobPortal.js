import { useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useDebounce } from './useDebounce';
import { useSortJobs } from './useSortJobs';

export const useJobPortal = (initialJobs = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [savedJobIds, setSavedJobIds] = useLocalStorage('savedJobs', []);
  const [applyingJob, setApplyingJob] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const debouncedSearch = useDebounce(searchTerm, 250);
  const savedIdSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);

  const filteredJobs = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return initialJobs.filter((job) => {
      const matchesTerm =
        !term ||
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.tags.some((tag) => tag.toLowerCase().includes(term));

      const matchesType =
        jobType === 'All'
          ? true
          : jobType === 'Remote'
          ? job.mode === 'Remote'
          : job.type === jobType;

      return matchesTerm && matchesType;
    });
  }, [initialJobs, jobType, debouncedSearch]);

  const sortedJobs = useSortJobs(filteredJobs, sortBy);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((current) => {
      const arr = Array.isArray(current) ? current : [];
      return arr.includes(jobId) ? arr.filter((id) => id !== jobId) : [...arr, jobId];
    });
  };

  const startApplication = (job) => { setApplyingJob(job); setStatusMessage(''); };

  const submitApplication = ({ name, email, note }) => {
    if (!name.trim() || !email.trim()) {
      setStatusMessage('Please add your name and email before submitting.');
      return false;
    }
    const noteCopy = note.trim() ? ` We noted: "${note.trim()}".` : '';
    setStatusMessage(`Thanks ${name}, your interest in ${applyingJob?.title} has been shared.${noteCopy}`);
    return true;
  };

  const closeApplication = () => { setApplyingJob(null); setStatusMessage(''); };

  const savedJobs = initialJobs.filter((job) => savedIdSet.has(job.id));

  return {
    searchTerm, setSearchTerm,
    jobType, setJobType,
    sortBy, setSortBy,
    filteredJobs: sortedJobs,
    savedJobs,
    toggleSaveJob,
    applyingJob,
    startApplication,
    submitApplication,
    closeApplication,
    statusMessage,
  };
};
