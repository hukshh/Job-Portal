import { useMemo, useState } from 'react';

export const useJobPortal = (initialJobs = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('All');
  const [savedJobIds, setSavedJobIds] = useState(() => new Set());
  const [applyingJob, setApplyingJob] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const filteredJobs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
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
  }, [initialJobs, jobType, searchTerm]);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds((current) => {
      const next = new Set(current);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  const startApplication = (job) => {
    setApplyingJob(job);
    setStatusMessage('');
  };

  const submitApplication = ({ name, email, note }) => {
    if (!name.trim() || !email.trim()) {
      setStatusMessage('Please add your name and email before submitting.');
      return false;
    }

    const trimmedNote = note.trim();
    const noteCopy = trimmedNote ? ` We noted: “${trimmedNote}”.` : '';

    setStatusMessage(
      `Thanks ${name}, your interest in ${applyingJob?.title} has been shared.${noteCopy}`
    );
    return true;
  };

  const closeApplication = () => {
    setApplyingJob(null);
    setStatusMessage('');
  };

  const savedJobs = initialJobs.filter((job) => savedJobIds.has(job.id));

  return {
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
  };
};

