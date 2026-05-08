import React, { useState, useEffect } from 'react';
import { RISK_MAP } from '../logic/analyzer';

const ResultPanel = React.forwardRef(({ result }, ref) => {
  const riskInfo = RISK_MAP[result.risk];
  const [animatedScore, setAnimatedScore] = useState(0);
  const [strokeOffset, setStrokeOffset] = useState(326.73); // circumference = 2 * PI * 52
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Reset animations
    setAnimatedScore(0);
    setStrokeOffset(326.73);
    setBarWidth(0);

    const targetOffset = 326.73 - (result.score / 100) * 326.73;
    
    // Slight delay to allow CSS transitions to trigger
    const timeout = setTimeout(() => {
      setStrokeOffset(targetOffset);
      setBarWidth(result.score);
      
      // Animate score counter
      let start = performance.now();
      const duration = 800;
      
      const animate = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setAnimatedScore(Math.round(result.score * ease));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, 50);

    return () => clearTimeout(timeout);
  }, [result.id, result.score]); // Re-run when result changes

  // Determine colors based on score
  let scoreColor = 'var(--red)';
  if (result.score >= 70) scoreColor = 'var(--green)';
  else if (result.score >= 30) scoreColor = 'var(--yellow)';

  return (
    <div className="card card-result" id="result-panel" ref={ref}>
      <div className="card-header">
        <div className="card-icon result-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h2>Analysis Result</h2>
        <span className={`risk-badge ${riskInfo.cls}`}>{riskInfo.label}</span>
      </div>

      {/* Score Display */}
      <div className="score-display" id="score-display">
        <div className="score-ring" id="score-ring">
          <svg viewBox="0 0 120 120" className="score-svg">
            <circle cx="60" cy="60" r="52" className="score-track" />
            <circle 
              cx="60" cy="60" r="52" 
              className="score-fill" 
              style={{ strokeDashoffset: strokeOffset, stroke: scoreColor }} 
            />
          </svg>
          <div className="score-value" style={{ color: scoreColor }}>{animatedScore}</div>
        </div>
        <div className="score-meta">
          <p className="score-label">Credibility Score</p>
          <p className="action-text">{riskInfo.action}</p>
        </div>
      </div>

      {/* Score Bar */}
      <div className="score-bar-container">
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{ width: `${barWidth}%` }}></div>
        </div>
        <div className="score-bar-labels">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="breakdown-grid" id="breakdown-grid">
        <div className="breakdown-card" id="bd-source">
          <div className="bd-icon bd-source-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <p className="bd-label">Source Score</p>
          <p className="bd-value" style={{ color: 'var(--accent-light)' }}>+{result.sourceScore}</p>
        </div>
        <div className="breakdown-card" id="bd-structure">
          <div className="bd-icon bd-structure-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>
          </div>
          <p className="bd-label">Structure Score</p>
          <p className="bd-value" style={{ color: result.structureScore >= 0 ? 'var(--cyan)' : 'var(--orange)' }}>
            {result.structureScore >= 0 ? '+' : ''}{result.structureScore}
          </p>
        </div>
        <div className="breakdown-card" id="bd-keywords">
          <div className="bd-icon bd-keywords-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <p className="bd-label">Keyword Penalty</p>
          <p className="bd-value" style={{ color: result.keywordPenalty === 0 ? 'var(--green)' : 'var(--red)' }}>
            {result.keywordPenalty === 0 ? '0' : `-${result.keywordPenalty}`}
          </p>
        </div>
      </div>

      {/* Flagged Keywords */}
      {result.flaggedKeywords.length > 0 && (
        <div className="flagged-section">
          <p className="flagged-title">⚠️ Flagged Keywords Detected</p>
          <div className="flagged-tags">
            {result.flaggedKeywords.map((kw, i) => (
              <span key={i} className="flagged-tag" style={{ animationDelay: `${i * 0.06}s` }}>
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ResultPanel;
