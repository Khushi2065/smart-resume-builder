import React from 'react';

const EducationForm = ({ education, onFormChange }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEducation = [...education];
    newEducation[index][name] = value;
    onFormChange({ education: newEducation });
  };

  const addEducation = () => {
    onFormChange({
      education: [
        ...education,
        { degree: '', major: '', institution: '', startDate: '', endDate: '', gpa: '', description: '' },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    onFormChange({ education: newEducation });
  };

  return (
    <div className="form-section-container">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="education-item" style={{ border: '1px solid #eee', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3>Education #{index + 1}</h3>
          <div className="form-group">
            <label htmlFor={`degree-${index}`}>Degree:</label>
            <input type="text" id={`degree-${index}`} name="degree" value={edu.degree || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`major-${index}`}>Major/Field of Study:</label>
            <input type="text" id={`major-${index}`} name="major" value={edu.major || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`institution-${index}`}>Institution:</label>
            <input type="text" id={`institution-${index}`} name="institution" value={edu.institution || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`eduStartDate-${index}`}>Start Date:</label>
            <input type="month" id={`eduStartDate-${index}`} name="startDate" value={edu.startDate || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`eduEndDate-${index}`}>End Date:</label>
            <input type="month" id={`eduEndDate-${index}`} name="endDate" value={edu.endDate || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`gpa-${index}`}>GPA/Score:</label>
            <input type="text" id={`gpa-${index}`} name="gpa" value={edu.gpa || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`eduDescription-${index}`}>Description/Achievements:</label>
            <textarea
              id={`eduDescription-${index}`}
              name="description"
              value={edu.description || ''}
              onChange={(e) => handleChange(index, e)}
              rows="3"
            ></textarea>
          </div>
          <button type="button" className="remove-button" onClick={() => removeEducation(index)}>Remove Education</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={addEducation}>Add Education</button>
    </div>
  );
};

export default EducationForm;