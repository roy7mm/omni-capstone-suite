import express from 'express';
import { mockIncidents } from '../data/mockDb.js';

const router = express.Router();

// GET all incidents with optional severity & status filtering
router.get('/', (req, res) => {
  const { severity, status, search } = req.query;
  let filtered = [...mockIncidents];

  if (severity && severity !== 'All') {
    filtered = filtered.filter(i => i.severity.toLowerCase() === severity.toLowerCase());
  }

  if (status && status !== 'All') {
    filtered = filtered.filter(i => i.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(i => 
      i.title.toLowerCase().includes(q) || 
      i.id.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, incidents: filtered });
});

// GET single incident details
router.get('/:id', (req, res) => {
  const incident = mockIncidents.find(i => i.id === req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }
  res.json({ success: true, incident });
});

// POST report new incident
router.post('/', (req, res) => {
  const { title, type, severity, description, reporter, department, impactedSystems, evidenceFiles } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Title and description are required' });
  }

  const newId = `INC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const newIncident = {
    id: newId,
    title,
    type: type || 'General Security Alert',
    severity: severity || 'Medium',
    status: 'New',
    reporter: reporter || 'Anonymous User',
    department: department || 'General',
    impactedSystems: impactedSystems || ['Web Gateway'],
    description,
    evidenceFiles: evidenceFiles || [],
    timeline: [
      { time: now, event: 'Incident submitted into SecOps triage portal', actor: reporter || 'Reporter' }
    ],
    analystNotes: 'Initial intake complete. Assigned to SOC triage pool.',
    createdAt: now
  };

  mockIncidents.unshift(newIncident);
  res.status(201).json({ success: true, message: 'Incident reported successfully', incident: newIncident });
});

// PATCH update incident status or analyst notes
router.patch('/:id', (req, res) => {
  const incident = mockIncidents.find(i => i.id === req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const { status, analystNote, actor } = req.body;
  const now = new Date().toISOString();

  if (status) {
    incident.status = status;
    incident.timeline.unshift({
      time: now,
      event: `Status updated to '${status}'`,
      actor: actor || 'Admin / Security Analyst'
    });
  }

  if (analystNote) {
    incident.analystNotes = analystNote;
    incident.timeline.unshift({
      time: now,
      event: `Analyst note updated`,
      actor: actor || 'Admin / Security Analyst'
    });
  }

  res.json({ success: true, message: 'Incident updated successfully', incident });
});

// GET incident analytics dashboard metrics
router.get('/meta/analytics', (req, res) => {
  const total = mockIncidents.length;
  const critical = mockIncidents.filter(i => i.severity === 'Critical').length;
  const high = mockIncidents.filter(i => i.severity === 'High').length;
  const medium = mockIncidents.filter(i => i.severity === 'Medium').length;
  const low = mockIncidents.filter(i => i.severity === 'Low').length;

  const openCount = mockIncidents.filter(i => i.status === 'New' || i.status === 'Under Investigation').length;
  const resolvedCount = mockIncidents.filter(i => i.status === 'Mitigated' || i.status === 'Resolved').length;

  res.json({
    success: true,
    analytics: {
      total,
      openCount,
      resolvedCount,
      severityCounts: { critical, high, medium, low },
      avgResolutionTimeHours: 4.2,
      threatTypes: [
        { name: 'Phishing', count: 12 },
        { name: 'Ransomware', count: 4 },
        { name: 'Data Breach', count: 7 },
        { name: 'Unauthorized Access', count: 9 }
      ]
    }
  });
});

export default router;
