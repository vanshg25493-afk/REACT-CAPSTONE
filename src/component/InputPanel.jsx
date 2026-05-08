import React from 'react';

export default function InputPanel({ 
  message, 
  setMessage, 
  source, 
  setSource, 
  handleAnalyze, 
  shake, 
  messageInputRef 
}) {
  return (
    <div className="card card-input" id="input-panel">
      <div className="card-header">
        <div className="card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <h2>Analyze Message</h2>
      </div>
      <label htmlFor="message-input" className="input-label">Paste a news headline, forwarded message, or unverified claim</label>
      <textarea 
        id="message-input" 
        ref={messageInputRef}
        className={`message-textarea ${shake ? 'shake' : ''}`} 
        rows="5" 
        placeholder="e.g. BREAKING: Forward this immediately! Government confirms 100% real cure discovered..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="char-count" id="char-count">{message.length} characters</div>

      {/* Source Selection */}
      <div className="source-section">
        <p className="input-label">Select source type</p>
        <div className="source-options" id="source-options">
          <button 
            className={`source-btn ${source === 'verified' ? 'active' : ''}`} 
            onClick={() => setSource('verified')}
          >
            <span className="source-icon">✅</span>
            <span className="source-name">Verified</span>
            <span className="source-desc">Official / Trusted</span>
            <span className="source-pts">+40 pts</span>
          </button>
          <button 
            className={`source-btn ${source === 'unverified' ? 'active' : ''}`} 
            onClick={() => setSource('unverified')}
          >
            <span className="source-icon">❓</span>
            <span className="source-name">Unverified</span>
            <span className="source-desc">Unknown Website</span>
            <span className="source-pts">+10 pts</span>
          </button>
          <button 
            className={`source-btn ${source === 'social' ? 'active' : ''}`} 
            onClick={() => setSource('social')}
          >
            <span className="source-icon">📱</span>
            <span className="source-name">Social Media</span>
            <span className="source-desc">WhatsApp, Twitter…</span>
            <span className="source-pts">+5 pts</span>
          </button>
        </div>
      </div>

      <button className="analyze-btn" id="analyze-btn" onClick={handleAnalyze}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Analyze Credibility</span>
      </button>
    </div>
  );
}
