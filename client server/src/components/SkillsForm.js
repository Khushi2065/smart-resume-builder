import React from 'react';

const SkillsForm = ({ skills, onFormChange }) => {
  const handleCategoryChange = (index, e) => {
    const { name, value } = e.target;
    const newSkills = [...skills];
    newSkills[index][name] = value;
    onFormChange({ skills: newSkills });
  };

  const handleItemChange = (catIndex, itemIndex, e) => {
    const newSkills = [...skills];
    newSkills[catIndex].items[itemIndex] = e.target.value;
    onFormChange({ skills: newSkills });
  };

  const addSkillCategory = () => {
    onFormChange({
      skills: [
        ...skills,
        { category: '', items: [''] },
      ],
    });
  };

  const removeSkillCategory = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    onFormChange({ skills: newSkills });
  };

  const addSkillItem = (catIndex) => {
    const newSkills = [...skills];
    if (!newSkills[catIndex].items) {
      newSkills[catIndex].items = [];
    }
    newSkills[catIndex].items.push('');
    onFormChange({ skills: newSkills });
  };

  const removeSkillItem = (catIndex, itemIndex) => {
    const newSkills = [...skills];
    newSkills[catIndex].items.splice(itemIndex, 1);
    onFormChange({ skills: newSkills });
  };

  return (
    <div className="form-section-container">
      <h2>Skills</h2>
      {skills.map((skillCategory, catIndex) => (
        <div key={catIndex} className="skill-category-item" style={{ border: '1px solid #eee', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
          <h3>Skill Category #{catIndex + 1}</h3>
          <div className="form-group">
            <label htmlFor={`category-${catIndex}`}>Category Name (e.g., Programming Languages, Frameworks, Tools):</label>
            <input type="text" id={`category-${catIndex}`} name="category" value={skillCategory.category || ''} onChange={(e) => handleCategoryChange(catIndex, e)} />
          </div>
          <div className="form-group">
            <label>Skills:</label>
            {skillCategory.items && skillCategory.items.map((item, itemIndex) => (
              <div key={itemIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <input
                  type="text"
                  value={item || ''}
                  onChange={(e) => handleItemChange(catIndex, itemIndex, e)}
                  placeholder="e.g., JavaScript, Python, React, Node.js"
                  style={{ flexGrow: 1, marginRight: '10px' }}
                />
                <button type="button" className="remove-button" onClick={() => removeSkillItem(catIndex, itemIndex)}>Remove</button>
              </div>
            ))}
            <button type="button" className="add-button" onClick={() => addSkillItem(catIndex)}>Add Skill</button>
          </div>
          <button type="button" className="remove-button" onClick={() => removeSkillCategory(catIndex)} style={{ marginTop: '10px' }}>Remove Category</button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={addSkillCategory}>Add Skill Category</button>
    </div>
  );
};

export default SkillsForm;