import { useState, useCallback } from 'react';

/**
 * Generic form state manager.
 * Handles values, errors, touched state, and submission.
 *
 * @param {Object} initialValues - initial form field values
 * @param {Function} validate - receives values, returns errors object
 * @param {Function} onSubmit - called with values when form is valid
 */
export const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    const errs = validate ? validate(values) : {};
    setErrors(errs);
    setTouched(Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

    if (Object.values(errs).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
};
