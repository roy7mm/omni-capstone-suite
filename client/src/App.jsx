import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ExecutiveDashboard from './components/ExecutiveDashboard';

// Cyber Incident Components
import IncidentWizard from './components/incidents/IncidentWizard';
import IncidentTracker from './components/incidents/IncidentTracker';
import AdminTriage from './components/incidents/AdminTriage';
import IncidentAnalytics from './components/incidents/IncidentAnalytics';

// AI Career Coach Components
import ResumeReviewer from './components/career/ResumeReviewer';
import ATSAnalyzer from './components/career/ATSAnalyzer';
import MockInterview from './components/career/MockInterview';
import RoadmapGenerator from './components/career/RoadmapGenerator';
import SkillGapAnalyzer from './components/career/SkillGapAnalyzer';
import JobRecommendations from './components/career/JobRecommendations';

// AI Shop Components
import ProductCatalog from './components/shop/ProductCatalog';
import AIChatAssistant from './components/shop/AIChatAssistant';
import CartDrawer from './components/shop/CartDrawer';

import { Shield, BrainCircuit, ShoppingBag, PlusCircle, Clock, ShieldCheck, BarChart3, FileText, Target, MessageSquare, GitCommit, BarChart2, Briefcase } from 'lucide-react';

export default function App() {
  const [activeSuite, setActiveSuite] = useState('dashboard');
  const [incidentSubTab, setIncidentSubTab] = useState('wizard');
  const [careerSubTab, setCareerSubTab] = useState('resume');
  const [theme, setTheme] = useState('dark');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [incidentRefresh, setIncidentRefresh] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="app-container">
      {/* Primary Navigation Header */}
      <Header 
        activeSuite={activeSuite} 
        setActiveSuite={setActiveSuite} 
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Body */}
      <main className="main-content">
        {/* EXECUTIVE DASHBOARD */}
        {activeSuite === 'dashboard' && (
          <ExecutiveDashboard setActiveSuite={setActiveSuite} />
        )}

        {/* MODULE 1: CYBER INCIDENT REPORTING PORTAL */}
        {activeSuite === 'incidents' && (
          <div>
            <div className="sub-nav">
              <button 
                className={`sub-tab ${incidentSubTab === 'wizard' ? 'active' : ''}`}
                onClick={() => setIncidentSubTab('wizard')}
              >
                <PlusCircle size={15} /> Report New Incident
              </button>
              <button 
                className={`sub-tab ${incidentSubTab === 'tracker' ? 'active' : ''}`}
                onClick={() => setIncidentSubTab('tracker')}
              >
                <Clock size={15} /> Status & Audit Timeline
              </button>
              <button 
                className={`sub-tab ${incidentSubTab === 'admin' ? 'active' : ''}`}
                onClick={() => setIncidentSubTab('admin')}
              >
                <ShieldCheck size={15} /> Admin SOC Triage Queue
              </button>
              <button 
                className={`sub-tab ${incidentSubTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setIncidentSubTab('analytics')}
              >
                <BarChart3 size={15} /> Threat Metrics & Analytics
              </button>
            </div>

            {incidentSubTab === 'wizard' && (
              <IncidentWizard onIncidentSubmitted={() => setIncidentRefresh(prev => prev + 1)} />
            )}
            {incidentSubTab === 'tracker' && (
              <IncidentTracker refreshTrigger={incidentRefresh} />
            )}
            {incidentSubTab === 'admin' && (
              <AdminTriage onIncidentUpdated={() => setIncidentRefresh(prev => prev + 1)} />
            )}
            {incidentSubTab === 'analytics' && (
              <IncidentAnalytics />
            )}
          </div>
        )}

        {/* MODULE 2: AI CAREER COACH PLATFORM */}
        {activeSuite === 'career' && (
          <div>
            <div className="sub-nav">
              <button 
                className={`sub-tab ${careerSubTab === 'resume' ? 'active' : ''}`}
                onClick={() => setCareerSubTab('resume')}
              >
                <FileText size={15} /> AI Resume Review
              </button>
              <button 
                className={`sub-tab ${careerSubTab === 'ats' ? 'active' : ''}`}
                onClick={() => setCareerSubTab('ats')}
              >
                <Target size={15} /> ATS Matcher Score
              </button>
              <button 
                className={`sub-tab ${careerSubTab === 'interview' ? 'active' : ''}`}
                onClick={() => setCareerSubTab('interview')}
              >
                <MessageSquare size={15} /> AI Mock Interview
              </button>
              <button 
                className={`sub-tab ${careerSubTab === 'roadmap' ? 'active' : ''}`}
                onClick={() => setCareerSubTab('roadmap')}
              >
                <GitCommit size={15} /> Career Roadmap Generator
              </button>
              <button 
                className={`sub-tab ${careerSubTab === 'skillgap' ? 'active' : ''}`}
                onClick={() => setCareerSubTab('skillgap')}
              >
                <BarChart2 size={15} /> Skill Gap Radar
              </button>
              <button 
                className={`sub-tab ${careerSubTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setCareerSubTab('jobs')}
              >
                <Briefcase size={15} /> Job Match Dashboard
              </button>
            </div>

            {careerSubTab === 'resume' && <ResumeReviewer />}
            {careerSubTab === 'ats' && <ATSAnalyzer />}
            {careerSubTab === 'interview' && <MockInterview />}
            {careerSubTab === 'roadmap' && <RoadmapGenerator />}
            {careerSubTab === 'skillgap' && <SkillGapAnalyzer />}
            {careerSubTab === 'jobs' && <JobRecommendations />}
          </div>
        )}

        {/* MODULE 3: AI SHOPPING ASSISTANT PLATFORM */}
        {activeSuite === 'shop' && (
          <div>
            <ProductCatalog addToCart={addToCart} />
          </div>
        )}
      </main>

      {/* Floating Conversational AI Shopping Assistant */}
      <AIChatAssistant addToCart={addToCart} />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}
