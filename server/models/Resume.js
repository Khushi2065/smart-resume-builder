const mongoose = require('mongoose');

const personalDetailsSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  linkedin: { type: String },
  github: { type: String },
  portfolio: { type: String },
  address: { type: String },
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  major: { type: String },
  institution: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  gpa: { type: String },
  description: { type: String },
});

const workExperienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  isCurrent: { type: Boolean, default: false },
  responsibilities: [{ type: String }], 
});

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
  technologies: { type: String }, 
  projectUrl: { type: String },
});

const resumeSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous_user' }, 
  personalDetails: personalDetailsSchema,
  summary: { type: String },
  workExperience: [workExperienceSchema],
  education: [educationSchema],
  skills: [{
    category: { type: String, required: true }, 
    items: [{ type: String }]
  }],
  projects: [projectSchema],
  awards: [{ type: String }],
  languages: [{ type: String }],
  certifications: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', resumeSchema);