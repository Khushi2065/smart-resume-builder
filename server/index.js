require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Resume = require('./models/Resume');
const { getResumeSuggestions } = require('./services/openaiService'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Resume Builder Backend is running with MongoDB!');
});

app.post('/api/resume', async (req, res) => {
  try {
    const { _id, ...resumeData } = req.body;
    let resume;
    if (_id) {
      resume = await Resume.findByIdAndUpdate(_id, { ...resumeData, updatedAt: Date.now() }, { new: true });
      if (!resume) {
        return res.status(404).json({ message: 'Resume not found for update.' });
      }
      res.status(200).json(resume);
    } else {
      resume = new Resume(resumeData);
      await resume.save();
      res.status(201).json(resume);
    }
  } catch (error) {
    console.error('Error saving/updating resume:', error);
    res.status(500).json({ message: 'Failed to save/update resume.', error: error.message });
  }
});

app.get('/api/resume/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Failed to fetch resume.', error: error.message });
  }
});

app.post('/api/ai-suggestions', async (req, res) => {
  try {
    const resumeData = req.body;
    if (!resumeData || Object.keys(resumeData).length === 0) {
      return res.status(400).json({ message: 'Resume data is required for suggestions.' });
    }
    const suggestions = await getResumeSuggestions(resumeData); 
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('Error in /api/ai-suggestions:', error);
 
    res.status(500).json({ error: { message: error.message || 'Failed to get AI suggestions.' } });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});