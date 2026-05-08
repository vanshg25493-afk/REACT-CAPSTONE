import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ResultPanel from './components/ResultPanel';
import HistoryPanel from './components/HistoryPanel';
import { analyze } from './logic/analyzer';

export default function App() {
  const [message, setMessage] = useState('');
  const [source, setSource] = useState('verified');
  const [history, setHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);
  const [shake, setShake] = useState(false);

  const resultPanelRef = useRef(null);
  const messageInputRef = useRef(null);

  // Load history from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('crisisVerifierHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history from localStorage', e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('crisisVerifierHistory', JSON.stringify(history));
  }, [history]);

  const handleAnalyze = () => {
    const text = message.trim();
    if (!text) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    const result = analyze(text, source);
    setCurrentResult(result);
    setHistory(prev => [result, ...prev]);

    setTimeout(() => {
      if (resultPanelRef.current) {
        resultPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleHistoryClick = (entry) => {
    setMessage(entry.text);
    setSource(entry.source);
    setCurrentResult(entry);
    if (messageInputRef.current) {
      messageInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main className="main-grid">
        <section className="primary-col">
          <InputPanel 
            message={message}
            setMessage={setMessage}
            source={source}
            setSource={setSource}
            handleAnalyze={handleAnalyze}
            shake={shake}
            messageInputRef={messageInputRef}
          />

          {currentResult && <ResultPanel result={currentResult} ref={resultPanelRef} />}
        </section>

        <aside className="secondary-col">
          <HistoryPanel history={history} onHistoryClick={handleHistoryClick} />
        </aside>
      </main>

      <footer className="footer">
        <p>Crisis Verifier MVP — Rule-based analysis only. Always cross-check with official sources.</p>
      </footer>
    </div>
  );
}
