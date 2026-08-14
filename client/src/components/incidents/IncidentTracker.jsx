import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Clock, ChevronDown, ChevronUp, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { IncidentsAPI } from '../../services/api';

export default function IncidentTracker({ refreshTrigger }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadIncidents();
  }, [severityFilter, search, refreshTrigger]);

  const loadIncidents = async () => {
    setLoading(true);
    try {
      const res = await IncidentsAPI.getAll({ severity: severityFilter, search });
      setIncidents(res.incidents || []);
    } catch (err) {
      console.error("Failed to load incidents", err);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'badge-critical';
      case 'high': return 'badge-high';
      case 'medium': return 'badge-medium';
      default: return 'badge-low';
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <Clock size={22} style={{ color: 'var(--accent-blue)' }} />
          <span>Incident Status & Audit Timeline Tracker</span>
        </div>
        <span className="badge badge-info">{incidents.length} Records</span>
      </div>

      {/* Filter Controls Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="input-control" 
            style={{ paddingLeft: '40px' }}
            placeholder="Search by Ticket ID, Title, or Indicator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="select-control" 
          style={{ width: '180px' }}
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Incidents List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Loading incident triage stream...
        </div>
      ) : incidents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          No incidents matched the selected search parameters.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {incidents.map((incident) => {
            const isExpanded = expandedId === incident.id;
            return (
              <div 
                key={incident.id} 
                style={{ 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--border-subtle)', 
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden',
                  transition: 'var(--transition-normal)'
                }}
              >
                {/* Accordion Row Header */}
                <div 
                  onClick={() => setExpandedId(isExpanded ? null : incident.id)}
                  style={{ 
                    padding: '16px 20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    cursor: 'pointer',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
                      {incident.id}
                    </span>
                    <span className={`badge ${getSeverityBadgeClass(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span style={{ fontWeight: '700', fontSize: '0.98rem' }}>
                      {incident.title}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '0.82rem', background: 'var(--bg-surface-elevated)', padding: '4px 10px', borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)' }}>
                      Status: <strong>{incident.status}</strong>
                    </span>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isExpanded && (
                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.15)' }}>
                    <div className="grid-2" style={{ marginTop: '16px' }}>
                      <div>
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Description</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '16px' }}>{incident.description}</p>
                        
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Impacted Infrastructure</h4>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          {incident.impactedSystems?.map((sys, idx) => (
                            <span key={idx} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'var(--bg-surface-elevated)', padding: '2px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                              {sys}
                            </span>
                          ))}
                        </div>

                        {incident.evidenceFiles?.length > 0 && (
                          <>
                            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Attached Evidence Files</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {incident.evidenceFiles.map((file, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--accent-blue)' }}>
                                  <FileText size={14} /> <span>{file.name} ({file.size})</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Event Audit Timeline */}
                      <div>
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Event Audit Timeline</h4>
                        <div className="timeline">
                          {incident.timeline?.map((evt, idx) => (
                            <div key={idx} className="timeline-item">
                              <div className="timeline-dot" />
                              <div className="timeline-content">
                                <div className="timeline-time">{new Date(evt.time).toLocaleString()}</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>{evt.event}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Actor: {evt.actor}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
