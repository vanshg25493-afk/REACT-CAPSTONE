import React from 'react';

export default function Header() {
  return (
    <header className="header" id="app-header">
      <div className="header-inner">
        <div className="logo-group">
          <div className="logo-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="url(#logo-grad)" strokeWidth="2.5" />
              <path d="M16 8v10M16 22v2" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="logo-text">Crisis Verifier</h1>
            <p className="logo-subtitle">Credibility Analysis Tool</p>
          </div>
        </div>
        <div className="header-badge">
          <span className="badge-dot"></span>
          <span>Rule-Based Engine</span>
        </div>
      </div>
    </header>
  );
}
