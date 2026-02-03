/**
 * Thin wrappers around localStorage so we don't scatter
 * raw localStorage calls all over the app.
 * Makes it easier to swap to sessionStorage or IndexedDB later.
 */

export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('storage.set failed:', err);
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
