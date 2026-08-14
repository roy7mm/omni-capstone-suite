import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, Search, Award } from 'lucide-react';
import { CareerAPI } from '../../services/api';

export default function ATSAnalyzer() {
  const [resumeText, setResumeText] = useState(`Alex Mercer - Full Stack AI Developer. Experienced in React, Node.js, Express, REST APIs, MongoDB, OWASP Security, Docker, Python.`);
  const [jobDescription, setJobDescription] = useState(`Senior Full Stack AI Developer position requiring strong proficiency in React, Node.js, Express REST microservices, MongoDB database modeling, OpenAI/Groq API integration, Docker, CI/CD pipelines, and OWASP Top 10 web security.`);
  
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) return;
    setLoading(true);
    try {
      const res = await CareerAPI.getATSScore(resumeText, jobDescription);
      setAtsResult(res.result);
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
          <Target size={22} style={{ color: 'var(--accent-teal)' }} />
          <span>ATS Score & Job Description Keyword Matcher</span>
        </div>
        <span className="badge badge-low">Parser Engine Ready</span>
      </div>

      <div className="grid-2" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label className="form-label">Your Resume Text</label>
          <textarea 
            className="textarea-control"
            style={{ minHeight: '140px', fontSize: '0.85rem' }}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Target Job Description (Paste from Job Board)</label>
          <textarea 
            className="textarea-control"
            style={{ minHeight: '140px', fontSize: '0.85rem' }}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading} style={{ width: '100%', marginBottom: '24px' }}>
        {loading ? 'Calculating ATS Keyword Density & Match Rate...' : 'Analyze ATS Compatibility Score'}
      </button>

      {atsResult && (
        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Match Rating</div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{atsResult.matchRating}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Keyword Density: {atsResult.keywordDensityRating} | Readability: {atsResult.readabilityScore}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--accent-blue)', lineHeight: 1 }}>{atsResult.atsScore}%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ATS Score Index</div>
            </div>
          </div>

          {/* Matched vs Missing Keywords */}
          <div className="grid-2">
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <CheckCircle2 size={16} /> Matched Keywords ({atsResult.matchedSkills?.length})
              </h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {atsResult.matchedSkills?.map((skill, idx) => (
                  <span key={idx} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <XCircle size={16} /> Missing Key Skills ({atsResult.missingSkills?.length})
              </h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {atsResult.missingSkills?.map((skill, idx) => (
                  <span key={idx} style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase' }}>
                    + Add {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
