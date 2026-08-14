import React, { useState, useEffect } from 'react';
import { BarChart3, ShieldAlert, Clock, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { IncidentsAPI } from '../../services/api';

export default function IncidentAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await IncidentsAPI.getAnalytics();
      setAnalytics(res.analytics);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Security Operations Analytics...</div>;
  }

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <BarChart3 size={22} style={{ color: 'var(--accent-blue)' }} />
          <span>Security Threat Metrics & MTTR Resolution Analytics</span>
        </div>
        <span className="badge badge-info">SOC Telemetry Live</span>
      </div>

      {/* Metrics Header */}
      <div className="grid-4" style={{ marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Tracked Incidents</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)' }}>{analytics.total}</div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Triage Investigations</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f97316' }}>{analytics.openCount}</div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Contained / Mitigated</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>{analytics.resolvedCount}</div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mean Time To Respond (MTTR)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{analytics.avgResolutionTimeHours}h</div>
        </div>
      </div>

      {/* Threat Distribution Bars */}
      <div className="grid-2">
        <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '16px' }}>Incident Severity Breakdown</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: '#fb7185', fontWeight: '600' }}>Critical Severity</span>
                <span>{analytics.severityCounts?.critical || 1} Incidents</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '25%', background: '#f43f5e' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: '#fb923c', fontWeight: '600' }}>High Severity</span>
                <span>{analytics.severityCounts?.high || 2} Incidents</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '50%', background: '#f97316' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: '#fde047', fontWeight: '600' }}>Medium Severity</span>
                <span>{analytics.severityCounts?.medium || 3} Incidents</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '75%', background: '#eab308' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Top Threat Vectors */}
        <div style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '16px' }}>Top Incident Attack Vectors</h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analytics.threatTypes?.map((t, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{t.name}</span>
                <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>{t.count} Events</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
