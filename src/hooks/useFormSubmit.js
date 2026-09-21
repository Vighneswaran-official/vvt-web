import { useState, useCallback } from 'react';

/**
 * Custom React hook for form submission with feedback.
 * @param {Function} onSuccess — callback receiving form data on valid submit
 */
export function useFormSubmit(onSuccess) {
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (onSuccess) {
      onSuccess(data);
    }

    setFeedback(data);
    e.target.reset();
  }, [onSuccess]);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  return { feedback, handleSubmit, clearFeedback };
}
