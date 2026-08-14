import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { CareerAPI } from '../../services/api';

export default function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedId, setAppliedId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await CareerAPI.getJobs();
      setJobs(res.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId) => {
    setAppliedId(jobId);
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <Briefcase size={22} style={{ color: 'var(--accent-blue)' }} />
          <span>AI Profile-Matched Job Recommendations</span>
        </div>
        <span className="badge badge-info">{jobs.length} Matches Found</span>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Matching Profile to High-Relevance Openings...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {jobs.map((job) => {
            const isApplied = appliedId === job.id;
            return (
              <div 
                key={job.id} 
                style={{ 
                  background: 'var(--bg-surface)', 
                  padding: '20px', 
                  borderRadius: 'var(--radius-lg)', 
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{job.title}</h3>
                    <span className="badge badge-low" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={12} /> {job.matchScore}% Match
                    </span>
                  </div>

                  <div style={{ fontSize: '0.88rem', color: 'var(--accent-blue)', fontWeight: '600', marginBottom: '8px' }}>
                    {job.company} • <span style={{ color: 'var(--text-secondary)' }}>{job.location}</span> • <span style={{ color: 'var(--accent-teal)' }}>{job.salary}</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px', maxWidth: '680px' }}>
                    {job.description}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {job.skills?.map((s, idx) => (
                      <span key={idx} style={{ background: 'var(--bg-surface-elevated)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  className={`btn ${isApplied ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => handleApply(job.id)}
                  disabled={isApplied}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={16} style={{ color: '#10b981' }} /> Application Submitted
                    </>
                  ) : (
                    <>
                      Quick Apply with AI Resume <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
