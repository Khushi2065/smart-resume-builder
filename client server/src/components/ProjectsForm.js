import React from 'react';

const ProjectsForm = ({ projects, onFormChange }) => {
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;
    onFormChange({ projects: newProjects });
  };

  const addProject = () => {
    onFormChange({
      projects: [
        ...projects,
        { projectName: '', startDate: '', endDate: '', description: '', technologies: '', projectUrl: '' },
      ],
    });
  };

  const removeProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    onFormChange({ projects: newProjects });
  };

  return (
    <div className="form-section-container">
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="project-item" style={{ border: '1px solid #eee', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3>Project #{index + 1}</h3>
          <div className="form-group">
            <label htmlFor={`projectName-${index}`}>Project Name:</label>
            <input type="text" id={`projectName-${index}`} name="projectName" value={project.projectName || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`projectStartDate-${index}`}>Start Date:</label>
            <input type="month" id={`projectStartDate-${index}`} name="startDate" value={project.startDate || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`projectEndDate-${index}`}>End Date:</label>
            <input type="month" id={`projectEndDate-${index}`} name="endDate" value={project.endDate || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <div className="form-group">
            <label htmlFor={`projectDescription-${index}`}>Description:</label>
            <textarea
              id={`projectDescription-${index}`}
              name="description"
              value={project.description || ''}
              onChange={(e) => handleChange(index, e)}
              rows="4"
              placeholder="Briefly describe the project, your role, and key outcomes."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor={`technologies-${index}`}>Technologies Used (comma-separated):</label>
            <input type="text" id={`technologies-${index}`} name="technologies" value={project.technologies || ''} onChange={(e) => handleChange(index, e)} placeholder="e.g., React, Node.js, MongoDB, AWS" />
          </div>
          <div className="form-group">
            <label htmlFor={`projectUrl-${index}`}>Project URL / GitHub Link:</label>
            <input type="url" id={`projectUrl-${index}`} name="projectUrl" value={project.projectUrl || ''} onChange={(e) => handleChange(index, e)} />
          </div>
          <button type="button" className="remove-button" onClick={() => removeProject(index)}>Remove Project</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={addProject}>Add Project</button>
    </div>
  );
};

export default ProjectsForm;