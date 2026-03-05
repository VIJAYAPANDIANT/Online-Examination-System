import React, { useState } from 'react';
import LoginPage from './components/LoginPage.jsx';
import TopicSelection from './components/TopicSelection.jsx';
import ExamInterface from './components/ExamInterface.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage(userData.role === 'ADMIN' ? 'admin' : 'topics');
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setPage('exam');
  };

  const handleExamComplete = () => {
    setPage('results');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
    setSelectedTopic(null);
  };

  return (
    <div>
      {page === 'login' && <LoginPage onLogin={handleLogin} />}
      {page === 'topics' && <TopicSelection user={user} onSelect={handleTopicSelect} onLogout={handleLogout} />}
      {page === 'exam' && <ExamInterface user={user} topic={selectedTopic} onComplete={handleExamComplete} />}
      {page === 'results' && <ResultScreen user={user} onBack={() => setPage('topics')} onLogout={handleLogout} />}
      {page === 'admin' && <AdminDashboard user={user} onLogout={handleLogout} />}
    </div>
  );
}

export default App;
