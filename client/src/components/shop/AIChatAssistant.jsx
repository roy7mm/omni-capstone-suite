import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, ShoppingBag } from 'lucide-react';
import { ShopAPI } from '../../services/api';

export default function AIChatAssistant({ addToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your AI Shopping Assistant. Ask me anything about cybersecurity hardware, developer gear, or AI course recommendations!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await ShopAPI.chatWithAI(userMsg);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: res.reply,
        productId: res.suggestedProductId 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'I can recommend our top-rated YubiKey 5C NFC for hardware MFA security.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-floating-chat">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          className="btn btn-primary"
          onClick={() => setIsOpen(true)}
          style={{ 
            borderRadius: '999px', 
            padding: '12px 20px', 
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Bot size={20} />
          <span>Ask AI Assistant</span>
        </button>
      )}

      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div className="ai-chat-box animate-fade-in">
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.92rem' }}>
              <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span>AI Tech Shopping Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                <div>{msg.text}</div>
                {msg.productId && (
                  <button 
                    onClick={() => ShopAPI.getProductById(msg.productId).then(res => res.product && addToCart(res.product))}
                    style={{ 
                      marginTop: '8px', 
                      background: 'rgba(255,255,255,0.15)', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      borderRadius: 'var(--radius-sm)', 
                      color: 'white', 
                      fontSize: '0.75rem', 
                      padding: '4px 8px', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ShoppingBag size={12} /> Add Recommended Item to Cart
                  </button>
                )}
              </div>
            ))}
            {loading && <div className="chat-msg bot" style={{ opacity: 0.6 }}>AI is formulating recommendations...</div>}
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)', padding: '8px' }}>
            <input 
              type="text" 
              className="input-control" 
              style={{ border: 'none', fontSize: '0.85rem' }}
              placeholder="Ask gear questions..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '8px 12px' }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
