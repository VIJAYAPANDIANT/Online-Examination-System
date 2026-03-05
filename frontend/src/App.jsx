import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/LoginPage.jsx';
import TopicSelection from './components/TopicSelection.jsx';
import ExamInterface from './components/ExamInterface.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Sync state with URL Hash for Browser Back Button ────────────────
  const syncPageFromHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    const savedUser = localStorage.getItem('exam_auth_user');
    
    if (!savedUser) {
      setPage('login');
      return;
    }

    const userData = JSON.parse(savedUser);
    setUser(userData);

    if (hash.startsWith('exam/')) {
      const topic = hash.split('/')[1];
      setSelectedTopic(topic);
      setPage('exam');
    } else if (hash === 'admin' && userData.role === 'ADMIN') {
      setPage('admin');
    } else if (hash === 'results') {
      setPage('results');
    } else if (hash === 'topics') {
      setPage('topics');
    } else {
      // Default based on role
      setPage(userData.role === 'ADMIN' ? 'admin' : 'topics');
    }
  }, []);

  useEffect(() => {
    syncPageFromHash();
    setLoading(false);
    window.addEventListener('popstate', syncPageFromHash);
    return () => window.removeEventListener('popstate', syncPageFromHash);
  }, [syncPageFromHash]);

  const navigate = (newPage, topic = null) => {
    let hash = newPage;
    if (topic) hash = `exam/${topic}`;
    window.location.hash = hash;
    setPage(newPage);
    if (topic) setSelectedTopic(topic);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('exam_auth_user', JSON.stringify(userData));
    navigate(userData.role === 'ADMIN' ? 'admin' : 'topics');
  };

  const handleTopicSelect = (topic) => {
    navigate('exam', topic);
  };

  const handleExamComplete = () => {
    navigate('results');
  };

  const handleExitExam = () => {
    if (window.confirm("Are you sure you want to exit? Your current exam progress will be lost.")) {
      navigate('topics');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('exam_auth_user');
    window.location.hash = 'login';
    setPage('login');
    setSelectedTopic(null);
  };

  if (loading) {
    return <div style={{ height: '100vh', background: '#0f172a' }} />;
  }

  return (
    <div>
      {page === 'login' && <LoginPage onLogin={handleLogin} />}
      {page === 'topics' && <TopicSelection user={user} onSelect={handleTopicSelect} onLogout={handleLogout} />}
      {page === 'exam' && <ExamInterface user={user} topic={selectedTopic} onComplete={handleExamComplete} onExit={() => navigate('topics')} />}
      {page === 'results' && <ResultScreen user={user} onBack={() => navigate('topics')} onLogout={handleLogout} />}
      {page === 'admin' && <AdminDashboard user={user} onLogout={handleLogout} />}
    </div>
  );
}

export default App;
