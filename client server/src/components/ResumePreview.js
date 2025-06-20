import React, { useRef } from 'react';
import './ResumePreview.css'; 

const ResumePreview = ({ resumeData }) => {
  const componentRef = useRef();
  return (
    <div className="resume-preview-wrapper">
      <div ref={componentRef} className="resume-document">
        <div className="header-section">
          <h1>{resumeData.personalDetails?.fullName || 'Your Name'}</h1>
          <p>
            {resumeData.personalDetails?.email && <span>{resumeData.personalDetails.email} | </span>}
            {resumeData.personalDetails?.phone && <span>{resumeData.personalDetails.phone} | </span>}
            {resumeData.personalDetails?.linkedin && <a href={resumeData.personalDetails.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {resumeData.personalDetails?.github && <span> | <a href={resumeData.personalDetails.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>}
            {resumeData.personalDetails?.portfolio && <span> | <a href={resumeData.personalDetails.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></span>}
            {resumeData.personalDetails?.address && <span> | {resumeData.personalDetails.address}</span>}
          </p>
        </div>

        {resumeData.summary && resumeData.summary.trim() && (
          <div className="section">
            <h2>Summary</h2>
            <p>{resumeData.summary}</p>
          </div>
        )}

        {resumeData.workExperience && resumeData.workExperience.length > 0 && (
          <div className="section">
            <h2>Work Experience</h2>
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} className="item">
                <h3>{exp.jobTitle} at {exp.company}</h3>
                <p className="sub-info">{exp.location} | {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</p>
                <ul>
                  {exp.responsibilities && exp.responsibilities.map((resp, rIndex) => (
                    resp.trim() && <li key={rIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {resumeData.education && resumeData.education.length > 0 && (
          <div className="section">
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="item">
                <h3>{edu.degree} {edu.major && `in ${edu.major}`}</h3>
                <p className="sub-info">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                {edu.gpa && <p className="sub-info">GPA: {edu.gpa}</p>}
                {edu.description && <p>{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="section">
            <h2>Skills</h2>
            <div className="skills-grid">
              {resumeData.skills.map((skillCat, index) => (
                skillCat.category.trim() && skillCat.items && skillCat.items.length > 0 && skillCat.items.some(item => item.trim()) && (
                  <div key={index} className="skill-category">
                    <strong>{skillCat.category}:</strong> {skillCat.items.filter(item => item.trim()).join(', ')}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="section">
            <h2>Projects</h2>
            {resumeData.projects.map((proj, index) => (
              <div key={index} className="item">
                <h3>{proj.projectName}</h3>
                <p className="sub-info">{proj.startDate} - {proj.endDate}</p>
                {proj.description && <p>{proj.description}</p>}
                {proj.technologies && <p><strong>Technologies:</strong> {proj.technologies}</p>}
                {proj.projectUrl && <p><a href={proj.projectUrl} target="_blank" rel="noopener noreferrer">{proj.projectUrl}</a></p>}
              </div>
            ))}
          </div>
        )}

        {(resumeData.awards && resumeData.awards.length > 0) ||
         (resumeData.languages && resumeData.languages.length > 0) ||
         (resumeData.certifications && resumeData.certifications.length > 0) ? (
          <div className="section">
            <h2>Additional Information</h2>
            {resumeData.awards && resumeData.awards.length > 0 && (
              <>
                <h3>Awards:</h3>
                <ul>
                  {resumeData.awards.filter(award => award.trim()).map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </>
            )}
            {resumeData.languages && resumeData.languages.length > 0 && (
              <>
                <h3>Languages:</h3>
                <ul>
                  {resumeData.languages.filter(lang => lang.trim()).map((lang, index) => (
                    <li key={index}>{lang}</li>
                  ))}
                </ul>
              </>
            )}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <>
                <h3>Certifications:</h3>
                <ul>
                  {resumeData.certifications.filter(cert => cert.trim()).map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ResumePreview;