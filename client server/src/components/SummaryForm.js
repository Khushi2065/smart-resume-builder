import React from 'react';

const SummaryForm = ({ summary, onFormChange }) => {
  const handleChange = (e) => {
    onFormChange({ summary: e.target.value });
  };

  return (
    <div className="form-section-container">
      <h2>Summary / Objective</h2>
      <div className="form-group">
        <label htmlFor="summary">Write a concise summary of your skills and experience:</label>
        <textarea
          id="summary"
          name="summary"
          value={summary || ''}
          onChange={handleChange}
          rows="5"
          placeholder="e.g., Highly motivated software engineer with 5+ years of experience in full-stack development..."
        ></textarea>
      </div>
    </div>
  );
};

export default SummaryForm;