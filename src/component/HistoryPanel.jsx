import React from 'react';
import { RISK_MAP } from '../logic/analyzer';

export default function HistoryPanel({ history, onHistoryClick }) {
  return (
    <div className="card card-history" id="history-panel">
      <div className="card-header">
        <div className="card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h2>Verification History</h2>
      </div>
      <div className="history-list" id="history-list">
        {history.length === 0 ? (
          <div className="history-empty" id="history-empty">
            <div className="empty-icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <p>No analyses yet</p>
            <span>Results will appear here</span>
          </div>
        ) : (
          history.map((entry, index) => {
            const riskCls = RISK_MAP[entry.risk].cls;
            const timeStr = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <div 
                key={entry.id || index} 
                className="history-item" 
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => onHistoryClick(entry)}
              >
                <div className={`hi-score ${riskCls}`}>{entry.score}</div>
                <div className="hi-info">
                  <div className="hi-message">{entry.text.length > 50 ? entry.text.slice(0, 50) + '…' : entry.text}</div>
                  <div className="hi-meta">
                    <span>{entry.source.charAt(0).toUpperCase() + entry.source.slice(1)}</span>
                    <span>·</span>
                    <span>{timeStr}</span>
                  </div>
                </div>
                <span className={`hi-badge ${riskCls}`}>{riskCls}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
