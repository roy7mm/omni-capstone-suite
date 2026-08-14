import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle2, AlertCircle, Award, Lightbulb } from 'lucide-react';
import { CareerAPI } from '../../services/api';

export default function ResumeReviewer() {
  const [resumeText, setResumeText] = useState(`Alex Mercer
Full Stack & Security Engineer | San Francisco, CA | alex.mercer@devtech.io

SUMMARY:
Results-driven Software Engineer with 4 years of hands-on experience building resilient React applications, scalable Node.js/Express REST microservices, and MongoDB databases. Strong background in OWASP top 10 security compliance and cloud deployment pipelines.

EXPERIENCE:
Software Engineer | Enterprise Tech Solutions | 2022 - Present
- Architected and deployed interactive React dashboard serving 50k daily active users.
- Built secure Node.js REST APIs with JWT authentication, rate limiting, and input sanitization.
- Reduced database query latency by 35% by optimizing MongoDB indexing and query schemas.

SKILLS:
React, Node.js, Express.js, JavaScript (ES6+), TypeScript, MongoDB, Python, Docker, Git, REST APIs, OWASP Top 10, Security Audit.`);
  
  const [targetRole, setTargetRole] = useState('Full Stack AI Engineer');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText) return;
    setLoading(true);
    try {
      const res = await CareerAPI.reviewResume(resumeText, targetRole);
      setAnalysis(res.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <Sparkles size={22} style={{ color: 'var(--accent-blue)' }} />
          <span>AI Resume Structure & Impact Evaluator</span>
        </div>
        <span className="badge badge-info">OpenAI / Groq Model Active</span>
      </div>

      <div className="grid-2" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label className="form-label">Target Career Role</label>
          <select 
            className="select-control"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          >
            <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
            <option value="Cyber Security Analyst">Cyber Security Analyst</option>
            <option value="Application Security Engineer">Application Security Engineer</option>
            <option value="DevOps & Cloud Security Engineer">DevOps & Cloud Security Engineer</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Analysis Mode</label>
          <input type="text" className="input-control" value="Deep Action-Verb & Impact Metric Engine" disabled />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Paste Resume Content or Raw Text</label>
        <textarea 
          className="textarea-control"
          style={{ minHeight: '180px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste full resume text here..."
        />
      </div>

      <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading} style={{ width: '100%', marginBottom: '24px' }}>
        {loading ? 'Evaluating Resume Content with AI...' : 'Run AI Resume Evaluation'}
      </button>

      {/* Analysis Results Display */}
      {analysis && (
        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>AI Resume Score: {analysis.overallScore} / 100</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{analysis.summary}</p>
            </div>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '1.5rem', boxShadow: 'var(--shadow-glow)' }}>
              {analysis.overallScore}%
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: '20px' }}>
            {/* Strengths */}
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--status-low)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <CheckCircle2 size={16} /> Technical Strengths
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {analysis.strengths?.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Improvement Opportunities */}
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#f97316', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <AlertCircle size={16} /> Impact Gaps & Weaknesses
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {analysis.weaknesses?.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formatting Tips */}
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Lightbulb size={16} /> Recommended ATS Formatting Adjustments
            </h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {analysis.formattingTips?.map((tip, idx) => (
                <div key={idx}>• {tip}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
