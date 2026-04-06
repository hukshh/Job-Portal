/**
 * Lightweight analytics helper.
 * In production this would send to an analytics service.
 * For now just logs to console in dev mode.
 *
 * Usage: track('job_viewed', { jobId: 'job-1', company: 'Bright Labs' })
 */
const isDev = import.meta.env.DEV;

export const track = (event, props = {}) => {
  if (isDev) {
    console.log(`[analytics] ${event}`, props);
  }
  // TODO: swap with real analytics (e.g. Posthog, Mixpanel)
};

export const EVENTS = {
  JOB_VIEWED: 'job_viewed',
  JOB_APPLIED: 'job_applied',
  JOB_SAVED: 'job_saved',
  JOB_UNSAVED: 'job_unsaved',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  SEARCH_PERFORMED: 'search_performed',
  FILTER_CHANGED: 'filter_changed',
};
