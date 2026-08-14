import React, { useState } from 'react';
import { AlertCircle, UploadCloud, CheckCircle2, ShieldAlert, FileText, X } from 'lucide-react';
import { IncidentsAPI } from '../../services/api';

export default function IncidentWizard({ onIncidentSubmitted }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Phishing',
    severity: 'High',
    department: 'Engineering',
    reporter: '',
    impactedSystems: 'Outlook, VPN Gateway',
    description: '',
  });

  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedIncident, setSubmittedIncident] = useState(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(f => ({
      name: f.name,
      size: `${(f.size / 1024).toFixed(1)} KB`,
      type: f.type || 'file'
    }));
    setEvidenceFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        impactedSystems: formData.impactedSystems.split(',').map(s => s.trim()),
        evidenceFiles,
      };

      const res = await IncidentsAPI.create(payload);
      setSubmittedIncident(res.incident);
      if (onIncidentSubmitted) onIncidentSubmitted(res.incident);
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedIncident) {
    return (
      <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle2 size={36} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>
          Incident Reported Successfully!
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Ticket ID: <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--accent-blue)' }}>{submittedIncident.id}</span>
        </p>
        <div style={{ maxWidth: '480px', margin: '0 auto 24px', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', fontSize: '0.88rem' }}>
          <div><strong>Severity:</strong> <span className={`badge badge-${submittedIncident.severity.toLowerCase()}`}>{submittedIncident.severity}</span></div>
          <div style={{ marginTop: '8px' }}><strong>Status:</strong> {submittedIncident.status}</div>
          <div style={{ marginTop: '8px' }}><strong>Impacted Systems:</strong> {submittedIncident.impactedSystems.join(', ')}</div>
        </div>
        <button className="btn btn-primary" onClick={() => setSubmittedIncident(null)}>
          Report Another Incident
        </button>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <ShieldAlert size={22} style={{ color: 'var(--status-critical)' }} />
          <span>Report Cyber Incident & Evidence Intake</span>
        </div>
        <span className="badge badge-critical">SecOps Triage Active</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Incident Title *</label>
            <input 
              type="text" 
              className="input-control" 
              placeholder="e.g. Suspicious Credential Prompt on Internal Gateway" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Incident Classification Category</label>
            <select 
              className="select-control"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Phishing">Phishing & Social Engineering</option>
              <option value="Ransomware">Ransomware & Malware Malware</option>
              <option value="Data Breach">Unauthorized Data Exfiltration</option>
              <option value="DDoS">Distributed Denial of Service (DDoS)</option>
              <option value="Unauthorized Access">Unauthorized Account Access</option>
            </select>
          </div>
        </div>

        <div className="grid-3">
          <div className="form-group">
            <label className="form-label">Severity Level</label>
            <select 
              className="select-control"
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
            >
              <option value="Critical">Critical (Immediate Outage/Exfiltration)</option>
              <option value="High">High (Active Threat / High Impact)</option>
              <option value="Medium">Medium (Suspicious Anomaly)</option>
              <option value="Low">Low (Policy Violation / Warning)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Reporter Name / Role</label>
            <input 
              type="text" 
              className="input-control" 
              placeholder="e.g. Alex Mercer (Security Lead)" 
              value={formData.reporter}
              onChange={(e) => setFormData({ ...formData, reporter: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Affected Department</label>
            <input 
              type="text" 
              className="input-control" 
              placeholder="e.g. Core Engineering" 
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Impacted Infrastructure & Systems (comma separated)</label>
          <input 
            type="text" 
            className="input-control" 
            placeholder="e.g. DB-PROD-04, Azure Active Directory, Mail Gateway" 
            value={formData.impactedSystems}
            onChange={(e) => setFormData({ ...formData, impactedSystems: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Detailed Incident Description & Observed Indicators of Compromise (IOCs) *</label>
          <textarea 
            className="textarea-control"
            placeholder="Provide timeline, anomalous IP addresses, malicious domain names, file hashes, or user accounts involved..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        {/* Evidence Upload Section */}
        <div className="form-group">
          <label className="form-label">Upload Evidence Files (PCAP logs, screenshots, header exports)</label>
          <div className="dropzone">
            <input 
              type="file" 
              multiple 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
              id="evidence-input"
            />
            <label htmlFor="evidence-input" style={{ cursor: 'pointer' }}>
              <UploadCloud size={36} style={{ color: 'var(--accent-blue)', marginBottom: '8px' }} />
              <div style={{ fontWeight: '600', fontSize: '0.92rem' }}>Drag & drop evidence files or click to browse</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Supports .pcap, .log, .png, .eml, .raw, .json</div>
            </label>
          </div>

          {evidenceFiles.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {evidenceFiles.map((file, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-surface)', padding: '8px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                    <FileText size={16} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>{file.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({file.size})</span>
                  </div>
                  <button type="button" onClick={() => removeFile(idx)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ marginTop: '12px', width: '100%' }}>
          {isSubmitting ? 'Submitting to Triage Pool...' : 'Submit Incident Report'}
        </button>
      </form>
    </div>
  );
}
