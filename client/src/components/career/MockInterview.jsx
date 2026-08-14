import React, { useState } from 'react';
import { MessageSquare, Send, Award, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CareerAPI } from '../../services/api';

export default function MockInterview() {
  const [role, setRole] = useState('Full Stack AI Engineer');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    setEvaluation(null);
    setUserAnswer('');
    try {
      const res = await CareerAPI.getMockQuestions(role, difficulty);
      setQuestions(res.questions || []);
      setCurrentIdx(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer || !questions[currentIdx]) return;
    setEvaluating(true);
    try {
      const res = await CareerAPI.evaluateAnswer(questions[currentIdx].question, userAnswer);
      setEvaluation(res.evaluation);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <div className="card-title">
          <MessageSquare size={22} style={{ color: 'var(--accent-blue)' }} />
          <span>Interactive AI Mock Interview Simulator</span>
        </div>
        <span className="badge badge-info">AI Feedback Engine</span>
      </div>

      {/* Role & Difficulty Selector */}
      <div className="grid-3" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label className="form-label">Interview Role Track</label>
          <select className="select-control" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
            <option value="Cyber Security Analyst">Cyber Security Analyst</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Difficulty Level</label>
          <select className="select-control" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Junior">Junior / Entry Level</option>
            <option value="Intermediate">Intermediate / Mid-Level</option>
            <option value="Senior">Senior / Principal Architect</option>
          </select>
        </div>

        <div className="form-group" style={{ justifyContent: 'flex-end' }}>
          <label className="form-label" style={{ opacity: 0 }}>Action</label>
          <button className="btn btn-primary" onClick={fetchQuestions} disabled={loadingQuestions} style={{ width: '100%' }}>
            {loadingQuestions ? 'Generating Questions...' : 'Start Interview Session'}
          </button>
        </div>
      </div>

      {/* Question & Answer Workspace */}
      {questions.length > 0 ? (
        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }} className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', fontWeight: '700', textTransform: 'uppercase' }}>
              Question {currentIdx + 1} of {questions.length} • {questions[currentIdx].context}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-secondary" 
                disabled={currentIdx === 0} 
                onClick={() => { setCurrentIdx(prev => prev - 1); setEvaluation(null); setUserAnswer(''); }}
                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
              >
                Previous
              </button>
              <button 
                className="btn btn-secondary" 
                disabled={currentIdx === questions.length - 1} 
                onClick={() => { setCurrentIdx(prev => prev + 1); setEvaluation(null); setUserAnswer(''); }}
                style={{ padding: '4px 12px', fontSize: '0.8rem' }}
              >
                Next
              </button>
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '20px', lineHeight: 1.4 }}>
            "{questions[currentIdx].question}"
          </h3>

          <div className="form-group">
            <label className="form-label">Your Response / Answer</label>
            <textarea 
              className="textarea-control"
              style={{ minHeight: '130px' }}
              placeholder="Type your structured interview response using STAR method (Situation, Task, Action, Result)..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleEvaluate} 
            disabled={evaluating || !userAnswer}
            style={{ width: '100%', marginBottom: '20px' }}
          >
            {evaluating ? 'Analyzing Response with AI...' : 'Submit Response for AI Scoring'}
          </button>

          {/* AI Response Feedback */}
          {evaluation && (
            <div style={{ background: 'var(--bg-surface-elevated)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--accent-blue)' }} className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={18} /> AI Response Score: {evaluation.score} / 100
                </h4>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '14px' }}>{evaluation.feedback}</p>
              
              <h5 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Key Strengths & Points Covered:</h5>
              <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {evaluation.keyTakeaways?.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          Click "Start Interview Session" to generate customized AI technical questions.
        </div>
      )}
    </div>
  );
}
