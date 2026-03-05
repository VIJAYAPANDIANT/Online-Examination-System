import React, { useState, useEffect } from 'react';
import ExamDashboard from './components/ExamDashboard';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('exam_auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('exam_auth_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('exam_auth_user');
  };

  if (loading) {
    return <div style={{ height: '100vh', background: '#0f172a' }} />;
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div>
      {/* Role-based Header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 24px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🐛</span>
          <span style={{ color: '#e2e8f0', fontWeight: '800', fontSize: '18px', letterSpacing: '1px' }}>BUG EXAM</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600' }}>{user.name}</div>
            <div style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>{user.role}</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px', border: '1px solid #475569', borderRadius: '8px', cursor: 'pointer',
              backgroundColor: 'transparent', color: '#94a3b8', fontSize: '13px', fontWeight: '600',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ paddingTop: '64px' }}>
        {user.role === 'ADMIN' ? (
          <AdminDashboard user={user} />
        ) : (
          <ExamDashboard user={user} />
        )}
      </div>
    </div>
  );
}

export default App;
