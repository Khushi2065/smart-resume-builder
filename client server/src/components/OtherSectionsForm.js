import React from 'react';

const OtherSectionsForm = ({ awards, languages, certifications, onFormChange }) => {
  const handleArrayChange = (section, index, e) => {
    const newItems = [...(section === 'awards' ? awards : section === 'languages' ? languages : certifications)];
    newItems[index] = e.target.value;
    onFormChange({ [section]: newItems });
  };

  const addArrayItem = (section) => {
    const newItems = [...(section === 'awards' ? awards : section === 'languages' ? languages : certifications)];
    newItems.push('');
    onFormChange({ [section]: newItems });
  };

  const removeArrayItem = (section, index) => {
    const newItems = [...(section === 'awards' ? awards : section === 'languages' ? languages : certifications)];
    newItems.splice(index, 1);
    onFormChange({ [section]: newItems });
  };

  return (
    <div className="form-section-container">
      <h2>Other Sections (Awards, Languages, Certifications)</h2>

      {/* Awards */}
      <h3>Awards</h3>
      <div className="form-group">
        {awards && awards.map((award, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <input
              type="text"
              value={award || ''}
              onChange={(e) => handleArrayChange('awards', index, e)}
              placeholder="e.g., Dean's List (2022), Company Innovation Award (2023)"
              style={{ flexGrow: 1, marginRight: '10px' }}
            />
            <button type="button" className="remove-button" onClick={() => removeArrayItem('awards', index)}>Remove</button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={() => addArrayItem('awards')}>Add Award</button>
      </div>

      {/* Languages */}
      <h3>Languages</h3>
      <div className="form-group">
        {languages && languages.map((lang, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <input
              type="text"
              value={lang || ''}
              onChange={(e) => handleArrayChange('languages', index, e)}
              placeholder="e.g., English (Native), Spanish (Conversational)"
              style={{ flexGrow: 1, marginRight: '10px' }}
            />
            <button type="button" className="remove-button" onClick={() => removeArrayItem('languages', index)}>Remove</button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={() => addArrayItem('languages')}>Add Language</button>
      </div>

      {/* Certifications */}
      <h3>Certifications</h3>
      <div className="form-group">
        {certifications && certifications.map((cert, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <input
              type="text"
              value={cert || ''}
              onChange={(e) => handleArrayChange('certifications', index, e)}
              placeholder="e.g., AWS Certified Solutions Architect, PMP"
              style={{ flexGrow: 1, marginRight: '10px' }}
            />
            <button type="button" className="remove-button" onClick={() => removeArrayItem('certifications', index)}>Remove</button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={() => addArrayItem('certifications')}>Add Certification</button>
      </div>
    </div>
  );
};

export default OtherSectionsForm;