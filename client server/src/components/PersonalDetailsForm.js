import React from 'react';

const PersonalDetailsForm = ({ personalDetails, onFormChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ personalDetails: { ...personalDetails, [name]: value } });
  };

  return (
    <div className="form-section-container">
      <h2>Personal Details</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={personalDetails.fullName || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={personalDetails.email || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={personalDetails.phone || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="linkedin">LinkedIn Profile:</label>
        <input type="url" id="linkedin" name="linkedin" value={personalDetails.linkedin || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="github">GitHub Profile:</label>
        <input type="url" id="github" name="github" value={personalDetails.github || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="portfolio">Portfolio URL:</label>
        <input type="url" id="portfolio" name="portfolio" value={personalDetails.portfolio || ''} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={personalDetails.address || ''} onChange={handleChange} />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;