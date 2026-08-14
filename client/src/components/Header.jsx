import React from 'react';
import { Shield, BrainCircuit, ShoppingBag, LayoutDashboard, Moon, Sun, ShoppingCart } from 'lucide-react';

export default function Header({ activeSuite, setActiveSuite, theme, toggleTheme, cartCount, openCart }) {
  return (
    <header className="header-nav">
      <div className="header-wrapper">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => setActiveSuite('dashboard')}>
          <div className="brand-icon">
            <Shield size={22} />
          </div>
          <div>
            <span>OmniShield</span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 400, marginLeft: '4px' }}>& AI Suite</span>
          </div>
        </div>

        {/* Core Suite Switcher Tabs */}
        <nav className="suite-tabs">
          <button 
            className={`tab-btn ${activeSuite === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSuite('dashboard')}
          >
            <LayoutDashboard size={16} />
            <span>Overview</span>
          </button>
          <button 
            className={`tab-btn ${activeSuite === 'incidents' ? 'active' : ''}`}
            onClick={() => setActiveSuite('incidents')}
          >
            <Shield size={16} />
            <span>Cyber Incidents</span>
          </button>
          <button 
            className={`tab-btn ${activeSuite === 'career' ? 'active' : ''}`}
            onClick={() => setActiveSuite('career')}
          >
            <BrainCircuit size={16} />
            <span>AI Career Coach</span>
          </button>
          <button 
            className={`tab-btn ${activeSuite === 'shop' ? 'active' : ''}`}
            onClick={() => setActiveSuite('shop')}
          >
            <ShoppingBag size={16} />
            <span>AI Tech Shop</span>
          </button>
        </nav>

        {/* Actions (Theme Toggle + Shopping Cart) */}
        <div className="header-actions">
          <button className="action-btn" onClick={openCart} title="View Shopping Cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
          </button>

          <button className="action-btn" onClick={toggleTheme} title="Toggle Dark/Light Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
