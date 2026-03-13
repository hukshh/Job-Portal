/**
 * Shared form validators — returns error string or '' if valid.
 */

export const validators = {
  required: (value, label = 'This field') =>
    !value?.toString().trim() ? `${label} is required.` : '',

  email: (value) => {
    if (!value?.trim()) return 'Email is required.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? '' : 'Enter a valid email address.';
  },

  minLength: (value, min, label = 'This field') =>
    value?.trim().length < min
      ? `${label} must be at least ${min} characters.`
      : '',

  phone: (value) => {
    if (!value?.trim()) return '';  // optional field
    const re = /^[+\d\s\-().]{7,15}$/;
    return re.test(value) ? '' : 'Enter a valid phone number.';
  },

  url: (value) => {
    if (!value?.trim()) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Enter a valid URL (include https://).';
    }
  },
};
