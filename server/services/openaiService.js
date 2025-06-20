if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}
require('dotenv').config(); 

const GEMINI_API_KEY = "AIzaSyAT1W5GjrDVcTHxlrL4D3R0qiew792U80c"; 

async function getResumeSuggestions(resumeData) {
  const prompt = `Review the following resume data and provide specific, actionable suggestions for improvement. Focus on enhancing clarity, conciseness, impact, and relevance to modern job applications. Quantify achievements where possible.

Resume Sections:

1.  **Personal Details:**
    Name: ${resumeData.personalDetails?.fullName || 'N/A'}
    Email: ${resumeData.personalDetails?.email || 'N/A'}
    Phone: ${resumeData.personalDetails?.phone || 'N/A'}
    LinkedIn: ${resumeData.personalDetails?.linkedin || 'N/A'}
    GitHub: ${resumeData.personalDetails?.github || 'N/A'}
    Portfolio: ${resumeData.personalDetails?.portfolio || 'N/A'}

2.  **Summary/Objective:**
    ${resumeData.summary || 'N/A'}

3.  **Work Experience:**
    ${resumeData.workExperience && resumeData.workExperience.length > 0 ?
      resumeData.workExperience.map(exp => `
      - Title: ${exp.jobTitle || ''}
      - Company: ${exp.company || ''}
      - Dates: ${exp.startDate || ''} - ${exp.endDate || (exp.isCurrent ? 'Present' : '')}
      - Responsibilities:
        ${exp.responsibilities && exp.responsibilities.length > 0 ? exp.responsibilities.map(r => `  * ${r}`).join('\n') : '  * No responsibilities listed.'}
      `).join('\n') : 'No work experience listed.'
    }

4.  **Education:**
    ${resumeData.education && resumeData.education.length > 0 ?
      resumeData.education.map(edu => `
      - Degree: ${edu.degree || ''}
      - Major: ${edu.major || ''}
      - Institution: ${edu.institution || ''}
      - Dates: ${edu.startDate || ''} - ${edu.endDate || ''}
      - GPA: ${edu.gpa || 'N/A'}
      - Description: ${edu.description || 'N/A'}
      `).join('\n') : 'No education listed.'
    }

5.  **Skills:**
    ${resumeData.skills && resumeData.skills.length > 0 ?
      resumeData.skills.map(skillCat => `
      - ${skillCat.category}: ${skillCat.items.join(', ') || 'N/A'}
      `).join('\n') : 'No skills listed.'
    }

6.  **Projects:**
    ${resumeData.projects && resumeData.projects.length > 0 ?
      resumeData.projects.map(proj => `
      - Project Name: ${proj.projectName || ''}
      - Dates: ${proj.startDate || ''} - ${proj.endDate || ''}
      - Description: ${proj.description || 'N/A'}
      - Technologies: ${proj.technologies || 'N/A'}
      - URL: ${proj.projectUrl || 'N/A'}
      `).join('\n') : 'No projects listed.'
    }

7.  **Awards/Certifications/Languages:**
    Awards: ${resumeData.awards?.join(', ') || 'N/A'}
    Certifications: ${resumeData.certifications?.join(', ') || 'N/A'}
    Languages: ${resumeData.languages?.join(', ') || 'N/A'}

Please provide suggestions in a clear, bullet-point format, categorized by resume section, focusing on areas for improvement. If a section is well-done, mention that too.

Example Suggestions Format:
**Summary:**
* Suggestion 1
* Suggestion 2
**Work Experience:**
* Suggestion 1
* Suggestion 2
...
`;

  try {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error response:', errorData);
        throw new Error(`Gemini API returned status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const text = result.candidates[0].content.parts[0].text;
      return text;
    } else {
      console.error('Gemini API response structure unexpected:', result);
      throw new Error('Unexpected response format from Gemini API.');
    }
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    throw new Error(`Failed to get AI suggestions from Gemini: ${error.message}`);
  }
}

module.exports = { getResumeSuggestions };