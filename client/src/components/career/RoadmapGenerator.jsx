import React, { useState, useEffect } from 'react';
import { GitCommit, CheckCircle2, Circle, Clock, Award, BookOpen } from 'lucide-react';
import { CareerAPI } from '../../services/api';

export default function RoadmapGenerator() {
  const [selectedTrack, setSelectedTrack] = useState('fullstack-ai');
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmap();
  }, [selectedTrack]);

  const loadRoadmap = async () => {
    setLoading(true);
    try {
      const res = await CareerAPI.getRoadmap(selectedTrack);
      setRoadmap(res.roadmap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (stepId) => {
    if (!roadmap) return;
    const updatedSteps = roadmap.steps.map(s => {
      if (s.id === stepId) {
        const nextStatus = s.status === 'Completed' ? 'In Progress' : 'Completed';
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setRoadmap({ ...roadmap, steps: updatedSteps });
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <GitCommit size={22} style={{ color: 'var(--accent-cyan)' }} />
          <span>Interactive Career Milestone Roadmap Generator</span>
        </div>
        <select 
          className="select-control" 
          style={{ width: '260px' }}
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value)}
        >
          <option value="fullstack-ai">Full Stack AI Application Engineer</option>
          <option value="cyber-analyst">Cyber Security Threat Hunter</option>
        </select>
      </div>

      {loading || !roadmap ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Career Roadmap DAG Nodes...</div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{roadmap.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{roadmap.description}</p>
          </div>

          {/* Roadmap Steps Chain */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {roadmap.steps?.map((step) => {
              const isDone = step.status === 'Completed';
              return (
                <div 
                  key={step.id} 
                  onClick={() => toggleStep(step.id)}
                  style={{ 
                    background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface)', 
                    border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)', 
                    borderRadius: 'var(--radius-lg)', 
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ color: isDone ? '#10b981' : 'var(--text-muted)' }}>
                      {isDone ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        Phase {step.id} • Est. {step.duration}
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {step.title}
                      </h4>
                      <div style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <Award size={14} /> Certificate: {step.cert}
                      </div>
                    </div>
                  </div>

                  <span className={`badge ${isDone ? 'badge-low' : 'badge-info'}`}>
                    {step.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
