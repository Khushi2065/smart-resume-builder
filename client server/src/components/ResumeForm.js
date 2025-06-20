import React from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import SummaryForm from './SummaryForm';
import WorkExperienceForm from './WorkExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import OtherSectionsForm from './OtherSectionsForm';

const ResumeForm = ({ resumeData, onFormChange }) => {
  return (
    <div className="form-container">
      <PersonalDetailsForm
        personalDetails={resumeData.personalDetails}
        onFormChange={onFormChange}
      />
      <SummaryForm
        summary={resumeData.summary}
        onFormChange={onFormChange}
      />
      <WorkExperienceForm
        workExperience={resumeData.workExperience}
        onFormChange={onFormChange}
      />
      <EducationForm
        education={resumeData.education}
        onFormChange={onFormChange}
      />
      <SkillsForm
        skills={resumeData.skills}
        onFormChange={onFormChange}
      />
      <ProjectsForm
        projects={resumeData.projects}
        onFormChange={onFormChange}
      />
      <OtherSectionsForm
        awards={resumeData.awards}
        languages={resumeData.languages}
        certifications={resumeData.certifications}
        onFormChange={onFormChange}
      />
    </div>
  );
};

export default ResumeForm;