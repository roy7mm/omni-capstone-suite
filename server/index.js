import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import incidentsRouter from './routes/incidents.js';
import careerRouter from './routes/career.js';
import shopRouter from './routes/shop.js';
import aiRouter from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/incidents', incidentsRouter);
app.use('/api/career', careerRouter);
app.use('/api/shop', shopRouter);
app.use('/api/ai', aiRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    app: "OmniShield & NextGen AI Suite API Backend",
    status: "Healthy",
    version: "1.0.0",
    modules: [
      "/api/incidents - Cyber Incident Intake & Admin Triage",
      "/api/career - AI Resume Review, ATS, Mock Interviews & Roadmaps",
      "/api/shop - Smart Catalog, AI Shopping Assistant & Orders",
      "/api/ai - AI Chat & Service Diagnostics"
    ]
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 OmniShield & NextGen AI Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
