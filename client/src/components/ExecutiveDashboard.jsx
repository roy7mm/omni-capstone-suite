import React from 'react';
import { Shield, BrainCircuit, ShoppingBag, AlertTriangle, CheckCircle2, TrendingUp, ArrowRight, Zap, Award, ShoppingCart } from 'lucide-react';

export default function ExecutiveDashboard({ setActiveSuite }) {
  return (
    <div className="animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(31, 41, 61, 0.8), rgba(15, 23, 42, 0.95))', 
        border: '1px solid rgba(59, 130, 246, 0.25)', 
        marginBottom: '28px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(59, 130, 246, 0.15)', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-blue)', marginBottom: '12px' }}>
              <Zap size={14} /> CAPSTONE ENTERPRISE PLATFORM
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '8px' }}>
              OmniShield & NextGen AI Command Center
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', fontSize: '0.95rem' }}>
              Unified dashboard managing Cyber Security Incident Operations, AI Career Development, and NextGen Security & Developer Gear procurement.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={() => setActiveSuite('incidents')}>
              <Shield size={16} /> Incident Portal
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveSuite('career')}>
              <BrainCircuit size={16} /> AI Career Coach
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Module Telemetry Stats Bar */}
      <div className="grid-4" style={{ marginBottom: '28px' }}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="stat-val">3 Active</div>
            <div className="stat-lbl">Cyber Incidents (1 Critical)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <Award size={24} />
          </div>
          <div>
            <div className="stat-val">92%</div>
            <div className="stat-lbl">Resume ATS Optimization</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="stat-val">Step 3 of 5</div>
            <div className="stat-lbl">Cyber Threat Hunter Roadmap</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
            <ShoppingBag size={24} />
          </div>
          <div>
            <div className="stat-val">6 Products</div>
            <div className="stat-lbl">In AI Gear Catalog</div>
          </div>
        </div>
      </div>

      {/* Three Main Capstone Module Cards */}
      <div className="grid-3">
        {/* Module 1 Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '16px' }}>
              <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}>
                <Shield size={20} />
              </div>
              <span className="badge badge-critical">Live SOC Active</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>
              Cyber Incident Reporting Portal
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Report security threats, attach raw logs & evidence, track incident resolution timelines, and run SOC admin triage operations with threat analytics.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Multi-step Evidence Intake Wizard
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Audit Timeline & Status Tracker
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> SOC Admin Triage & Threat Analytics
              </li>
            </ul>
          </div>
          <button className="btn btn-primary" onClick={() => setActiveSuite('incidents')} style={{ width: '100%' }}>
            Launch Incident Portal <ArrowRight size={16} />
          </button>
        </div>

        {/* Module 2 Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '16px' }}>
              <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
                <BrainCircuit size={20} />
              </div>
              <span className="badge badge-info">AI Powered</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>
              AI Career Coach Platform
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Optimize your tech career with AI Resume Analysis, ATS Score matching, interactive AI Mock Interviews, Skill Gap radar, and Roadmap generation.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Instant ATS Match & Resume Parsing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Interactive AI Q&A Mock Simulator
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Dynamic Roadmap & Job Feed
              </li>
            </ul>
          </div>
          <button className="btn btn-primary" onClick={() => setActiveSuite('career')} style={{ width: '100%' }}>
            Launch AI Career Coach <ArrowRight size={16} />
          </button>
        </div>

        {/* Module 3 Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '16px' }}>
              <div className="brand-icon" style={{ background: 'linear-gradient(135deg, #10b981, #14b8a6)' }}>
                <ShoppingBag size={20} />
              </div>
              <span className="badge badge-low">Smart Assistant</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>
              AI Shopping Assistant Platform
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Explore curated cybersecurity hardware, masterclass bundles, and developer gear. Get natural language AI product recommendations and express checkout.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Smart Catalog & Multi-Attribute Search
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Conversational AI Shopping Chatbot
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--status-low)' }} /> Wishlist, Cart & Express Receipt Generator
              </li>
            </ul>
          </div>
          <button className="btn btn-primary" onClick={() => setActiveSuite('shop')} style={{ width: '100%' }}>
            Launch AI Tech Shop <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
