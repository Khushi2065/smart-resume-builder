import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ResumePDF from './components/ResumePDF';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function App() {
  const [resumeData, setResumeData] = useState({
    personalDetails: {},
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    awards: [],
    languages: [],
    certifications: [],
  });

  const [aiSuggestions, setAiSuggestions] = useState('');
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [viewMode, setViewMode] = useState('form');
  const [resumeId, setResumeId] = useState(null);
  const [loadId, setLoadId] = useState(''); 

  useEffect(() => {
    document.title = "Smart Resume Builder";
  }, []); 

  const handleFormChange = (newData) => {
    setResumeData(prevData => ({ ...prevData, ...newData }));
  };

  const handleSaveResume = async () => {
    console.log('handleSaveResume called!');
    setSaveMessage('Saving...');
    try {
      const payload = resumeId ? { ...resumeData, _id: resumeId } : resumeData;
      console.log('Payload being sent:', payload);
      console.log('API URL:', `${API_BASE_URL}/resume`);

      const response = await axios.post(`${API_BASE_URL}/resume`, payload);

      if (response.data && response.data._id) {
        setResumeId(response.data._id);
        setSaveMessage('Resume saved successfully! ID: ' + response.data._id);
        console.log('Resume saved:', response.data);
      } else {
        setSaveMessage('Resume saved, but ID was not returned. Check console.');
        console.warn('Resume saved, but _id not found in response:', response.data);
      }

    } catch (error) {
      console.error('Error saving resume:', error);
      if (error.response) {
        setSaveMessage(`Failed to save resume: ${error.response.data.message || error.response.statusText}. Please check backend.`);
        console.error('Backend Error Response:', error.response.data);
      } else if (error.request) {
        setSaveMessage('Failed to save resume: No response from server. Is backend running?');
      } else {
        setSaveMessage(`Failed to save resume: ${error.message}.`);
      }
    } finally {
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  const handleLoadResume = async (id) => {
    if (!id) {
      setSaveMessage('Please enter an ID to load.');
      setTimeout(() => setSaveMessage(''), 3000); 
      return;
    }
    setSaveMessage('Loading...');
    try {
      const response = await axios.get(`${API_BASE_URL}/resume/${id}`);
      if (response.data) {
        setResumeData(response.data);
        setResumeId(response.data._id);
        setSaveMessage('Resume loaded successfully!');
        setViewMode('form');
        setLoadId('');
      } else {
        setSaveMessage('No data found for that ID.');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      if (error.response && error.response.status === 404) {
        setSaveMessage('Failed to load: Resume not found for that ID.');
      } else if (error.response) {
        setSaveMessage(`Failed to load resume: ${error.response.data.message || error.response.statusText}.`);
      } else {
        setSaveMessage(`Failed to load resume: ${error.message}.`);
      }
    } finally {
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  const handleGetSuggestions = async () => {
    console.log('handleGetSuggestions called!');
    setLoadingSuggestions(true);
    setAiSuggestions('Getting AI suggestions...');
    try {
      console.log('Sending resumeData for AI suggestions:', resumeData);
      console.log('API URL for AI suggestions:', `${API_BASE_URL}/ai-suggestions`);

      const response = await axios.post(`${API_BASE_URL}/ai-suggestions`, resumeData);
      setAiSuggestions(response.data.suggestions); 
    } catch (error) {
      console.error('Error in handleGetSuggestions catch block:', error);

      if (error.response && error.response.data && error.response.data.error) {
        setAiSuggestions(`AI suggestion error: ${error.response.data.error.message || 'Unknown error.'}`);
      } else if (error.request) {
        setAiSuggestions('No response from AI server. Check backend connection.');
      } else {
        setAiSuggestions(`Failed to get AI suggestions: ${error.message}.`);
      }
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handlePrintResume = () => {
    window.print(); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Resume Builder</h1>
        <div className="action-buttons">
          {/* Navigation buttons for different views */}
          <button onClick={() => setViewMode('form')} className={viewMode === 'form' ? 'active' : ''}>Edit Form</button>
          <button onClick={() => setViewMode('preview')} className={viewMode === 'preview' ? 'active' : ''}>Preview & Print</button>
          <button onClick={() => setViewMode('pdf')} className={viewMode === 'pdf' ? 'active' : ''}>PDF Viewer</button>

          {/* Save/Load resume functionality */}
          <button onClick={handleSaveResume}>Save Resume</button>
          <input
            type="text"
            placeholder="ENTER ID TO LOAD"
            value={loadId} 
            onChange={(e) => setLoadId(e.target.value)} 
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleLoadResume(loadId); 
            }}
            autocomplete="off" 
          />
          <button onClick={() => handleLoadResume(loadId)}>Load Resume</button>

          {/* Re-enable the AI Suggestions button */}
          <button onClick={handleGetSuggestions} disabled={loadingSuggestions}>
            {loadingSuggestions ? 'Generating...' : 'Get AI Suggestions'}
          </button>
        </div>
        {/* Display save/load messages */}
        {saveMessage && <p className="save-message">{saveMessage}</p>}
      </header>

      <main className="App-main">
        {viewMode === 'form' && (
          <div className="form-section">
            <ResumeForm resumeData={resumeData} onFormChange={handleFormChange} />
            {aiSuggestions && (
              <div className="ai-suggestions-panel">
                <h2>AI Suggestions:</h2>
                <pre>{aiSuggestions}</pre>
              </div>
            )}
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="preview-section">
            <ResumePreview resumeData={resumeData} />
            <button onClick={handlePrintResume} className="download-pdf-button print-button-hide-on-print">
                Print This Resume
            </button>
          </div>
        )}

        {viewMode === 'pdf' && (
          <div className="pdf-viewer-section">
            <h2>PDF Preview</h2>
            <PDFDownloadLink document={<ResumePDF data={resumeData} />} fileName="my_resume.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Preparing PDF...' : <button className="download-pdf-button">Download PDF</button>
              }
            </PDFDownloadLink>
            <div style={{ height: '70vh', width: '100%', border: '1px solid #ddd', marginTop: '10px' }}>
              <PDFViewer style={{ width: '100%', height: '100%' }}>
                <ResumePDF data={resumeData} />
              </PDFViewer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
