import React, { useState, useEffect } from 'react';
import { ShieldCheck, Edit3, MessageSquare, Check, RefreshCw } from 'lucide-react';
import { IncidentsAPI } from '../../services/api';

export default function AdminTriage({ onIncidentUpdated }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [noteText, setNoteText] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    setLoading(true);
    try {
      const res = await IncidentsAPI.getAll();
      setIncidents(res.incidents || []);
      if (res.incidents?.length > 0 && !selectedIncident) {
        setSelectedIncident(res.incidents[0]);
        setNewStatus(res.incidents[0].status);
        setNoteText(res.incidents[0].analystNotes || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (inc) => {
    setSelectedIncident(inc);
    setNewStatus(inc.status);
    setNoteText(inc.analystNotes || '');
  };

  const handleUpdate = async () => {
    if (!selectedIncident) return;
    setUpdating(true);
    try {
      const res = await IncidentsAPI.update(selectedIncident.id, {
        status: newStatus,
        analystNote: noteText,
        actor: 'Lead SOC Analyst'
      });

      setSelectedIncident(res.incident);
      await loadIncidents();
      if (onIncidentUpdated) onIncidentUpdated();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <ShieldCheck size={22} style={{ color: 'var(--accent-teal)' }} />
          <span>SOC Analyst Admin Triage & Response Center</span>
        </div>
        <button className="btn btn-secondary" onClick={loadIncidents} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          <RefreshCw size={14} /> Refresh Triage Queue
        </button>
      </div>

      <div className="grid-3">
        {/* Triage Incident List Sidebar */}
        <div style={{ borderRight: '1px solid var(--border-subtle)', paddingRight: '16px' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Triage Queue</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
            {incidents.map((inc) => (
              <div
                key={inc.id}
                onClick={() => handleSelect(inc)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: selectedIncident?.id === inc.id ? 'var(--bg-surface-elevated)' : 'var(--bg-surface)',
                  border: selectedIncident?.id === inc.id ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>{inc.id}</span>
                  <span className={`badge badge-${inc.severity.toLowerCase()}`} style={{ fontSize: '0.68rem' }}>{inc.severity}</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {inc.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Status: {inc.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analyst Workspace Panel */}
        <div style={{ gridColumn: 'span 2' }}>
          {selectedIncident ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.88rem', fontWeight: '700' }}>
                    {selectedIncident.id}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{selectedIncident.title}</h3>
                </div>
                <span className={`badge badge-${selectedIncident.severity.toLowerCase()}`}>{selectedIncident.severity}</span>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '20px', fontSize: '0.88rem' }}>
                <p><strong>Reporter:</strong> {selectedIncident.reporter} ({selectedIncident.department})</p>
                <p style={{ marginTop: '6px' }}><strong>Description:</strong> {selectedIncident.description}</p>
              </div>

              <div className="grid-2" style={{ marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Assign Incident Resolution Status</label>
                  <select 
                    className="select-control"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="New">New Intake</option>
                    <option value="Under Investigation">Under Active Investigation</option>
                    <option value="Mitigated">Mitigated (Threat Contained)</option>
                    <option value="Resolved">Resolved & Closed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Triage Analyst Lead</label>
                  <input type="text" className="input-control" value="Lead SecOps Analyst (Alex Vance)" disabled />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">SOC Analyst Assessment Notes & Remediation Steps</label>
                <textarea 
                  className="textarea-control"
                  placeholder="Record mitigation steps, IP blocks, firewall adjustments, or victim account resets..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </div>

              <button 
                className="btn btn-primary" 
                onClick={handleUpdate} 
                disabled={updating}
                style={{ width: '100%' }}
              >
                {updating ? 'Saving Changes...' : 'Save Triage Update & Record Audit Log'}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Select an incident from the queue to manage triage details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
