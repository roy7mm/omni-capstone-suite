import express from 'express';
import { mockCareerData } from '../data/mockDb.js';
import { 
  analyzeResume, 
  calculateATSScore, 
  generateInterviewQuestions, 
  evaluateInterviewAnswer 
} from '../services/aiService.js';

const router = express.Router();

// POST analyze resume
router.post('/resume-review', async (req, res) => {
  const { resumeText, targetRole } = req.body;
  if (!resumeText) {
    return res.status(400).json({ success: false, message: 'Resume text is required' });
  }

  const analysis = await analyzeResume(resumeText, targetRole);
  res.json({ success: true, analysis });
});

// POST ATS match analysis
router.post('/ats-score', async (req, res) => {
  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ success: false, message: 'Both resume text and job description are required' });
  }

  const result = await calculateATSScore(resumeText, jobDescription);
  res.json({ success: true, result });
});

// GET interview questions
router.get('/mock-interview/questions', async (req, res) => {
  const { role, difficulty } = req.query;
  const questions = await generateInterviewQuestions(role, difficulty);
  res.json({ success: true, questions });
});

// POST evaluate interview response
router.post('/mock-interview/evaluate', async (req, res) => {
  const { question, userAnswer } = req.body;
  if (!userAnswer) {
    return res.status(400).json({ success: false, message: 'User answer is required' });
  }

  const evaluation = await evaluateInterviewAnswer(question, userAnswer);
  res.json({ success: true, evaluation });
});

// GET career roadmap
router.get('/roadmap/:roleId', (req, res) => {
  const roadmap = mockCareerData.roadmaps[req.params.roleId] || mockCareerData.roadmaps['fullstack-ai'];
  res.json({ success: true, roadmap });
});

// GET skill gap analysis
router.get('/skill-gap', (req, res) => {
  const skillGapData = {
    targetRole: "Full Stack Security Engineer",
    currentSkills: [
      { name: "React / Frontend", level: 88, required: 90 },
      { name: "Node.js & Express", level: 82, required: 85 },
      { name: "MongoDB & Database Security", level: 75, required: 80 },
      { name: "SIEM & Log Monitoring", level: 50, required: 75 },
      { name: "AI LLM Integrations", level: 70, required: 85 }
    ],
    recommendedCourses: [
      "Splunk Certified Cybersecurity Analyst Path",
      "OWASP AppSec API Security Hardening",
      "LangChain & OpenAI API Production Deployment"
    ]
  };
  res.json({ success: true, skillGapData });
});

// GET job recommendations
router.get('/jobs', (req, res) => {
  res.json({ success: true, jobs: mockCareerData.jobListings });
});

export default router;
