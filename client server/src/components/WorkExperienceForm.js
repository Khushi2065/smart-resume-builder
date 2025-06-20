import React from 'react';

const WorkExperienceForm = ({ workExperience, onFormChange }) => {
  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newWorkExperience = [...workExperience];
    if (name === 'isCurrent') {
      newWorkExperience[index][name] = type === 'checkbox' ? checked : value;
      if (checked) { 
        newWorkExperience[index].endDate = '';
      }
    } else {
      newWorkExperience[index][name] = value;
    }
    onFormChange({ workExperience: newWorkExperience });
  };

  const handleResponsibilityChange = (expIndex, respIndex, e) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[expIndex].responsibilities[respIndex] = e.target.value;
    onFormChange({ workExperience: newWorkExperience });
  };

  const addResponsibility = (index) => {
    const newWorkExperience = [...workExperience];
    if (!newWorkExperience[index].responsibilities) {
      newWorkExperience[index].responsibilities = [];
    }
    newWorkExperience[index].responsibilities.push('');
    onFormChange({ workExperience: newWorkExperience });
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[expIndex].responsibilities.splice(respIndex, 1);
    onFormChange({ workExperience: newWorkExperience });
  };

  const addExperience = () => {
    onFormChange({
      workExperience: [
        ...workExperience,
        { jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, responsibilities: [''] },
      ],
    });
  };

  const removeExperience = (index) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience.splice(index, 1);
    onFormChange({ workExperience: newWorkExperience });
  };

  return (
    <div className="form-section-container">
      <h2>Work Experience</h2>
      {workExperience.map((exp, index) => (
        <div key={index} className="experience-item" style={{ border: '1px solid #eee', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3>Experience #{index + 1}</h3>
          <div className="form-group">
            <label htmlFor={`jobTitle-${index}`}>Job Title:</label>
            <input type="text" id={`jobTitle-${index}`} name="jobTitle" value={exp.jobTitle || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`company-${index}`}>Company:</label>
            <input type="text" id={`company-${index}`} name="company" value={exp.company || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`location-${index}`}>Location:</label>
            <input type="text" id={`location-${index}`} name="location" value={exp.location || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`startDate-${index}`}>Start Date:</label>
            <input type="month" id={`startDate-${index}`} name="startDate" value={exp.startDate || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`endDate-${index}`}>End Date:</label>
            <input type="month" id={`endDate-${index}`} name="endDate" value={exp.endDate || ''} onChange={(e) => handleChange(index, e)} disabled={exp.isCurrent} />
          </div>
          <div className="form-group checkbox-group">
            <input type="checkbox" id={`isCurrent-${index}`} name="isCurrent" checked={exp.isCurrent || false} onChange={(e) => handleChange(index, e)} />
            <label htmlFor={`isCurrent-${index}`}>Currently working here</label>
          </div>

          <div className="form-group">
            <label>Responsibilities (Bullet Points):</label>
            {exp.responsibilities && exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <textarea
                  value={resp || ''}
                  onChange={(e) => handleResponsibilityChange(index, respIndex, e)}
                  placeholder="e.g., Developed and maintained scalable web applications..."
                  rows="2"
                  style={{ flexGrow: 1, marginRight: '10px' }}
                ></textarea>
                <button type="button" className="remove-button" onClick={() => removeResponsibility(index, respIndex)}>Remove</button>
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addResponsibility(index)}>Add Responsibility</button>
          </div>

          <button type="button" className="remove-button" onClick={() => removeExperience(index)} style={{ marginTop: '10px' }}>Remove Experience</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={addExperience}>Add Work Experience</button>
    </div>
  );
};

export default WorkExperienceForm;