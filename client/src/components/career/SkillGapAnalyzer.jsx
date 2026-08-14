import React, { useState, useEffect } from 'react';
import { BarChart2, BookOpen, ArrowUpRight, Award } from 'lucide-react';
import { CareerAPI } from '../../services/api';

export default function SkillGapAnalyzer() {
  const [skillData, setSkillData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkillGap();
  }, []);

  const loadSkillGap = async () => {
    try {
      const res = await CareerAPI.getSkillGap();
      setSkillData(res.skillGapData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !skillData) {
    return <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Analyzing Market Skill Benchmarks...</div>;
  }

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <BarChart2 size={22} style={{ color: 'var(--accent-blue)' }} />
          <span>Skill Gap Radar & Market Benchmark Analyzer</span>
        </div>
        <span className="badge badge-info">{skillData.targetRole}</span>
      </div>

      <div className="grid-2">
        {/* Skill Comparison Bars */}
        <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '16px' }}>Current vs Target Competency</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {skillData.currentSkills?.map((skill, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600' }}>{skill.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>You: {skill.level}% | Target: {skill.required}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${skill.level}%`, background: skill.level >= skill.required ? '#10b981' : '#f97316' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Learning Courses */}
        <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={18} style={{ color: 'var(--accent-cyan)' }} /> Recommended Actionable Courses
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {skillData.recommendedCourses?.map((course, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: '600' }}>
                  <Award size={16} style={{ color: 'var(--accent-blue)' }} /> {course}
                </div>
                <ArrowUpRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
